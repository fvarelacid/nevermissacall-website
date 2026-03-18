/**
 * VoiceClient — connects browser mic to the Railway Pipecat voice server
 * via WebSocket using Pipecat's protobuf frame format.
 */

export type AgentState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended'

export interface VoiceClientCallbacks {
  onStateChange: (state: AgentState) => void
  onError: (message: string) => void
}

export interface VoiceClientOptions {
  callbacks: VoiceClientCallbacks
  leadEmail?: string
}

const WS_URL =
  process.env.NEXT_PUBLIC_VOICE_WS_URL ??
  'wss://nevermissacall-production-23c7.up.railway.app/ws/web'

const TARGET_SAMPLE_RATE = 16_000

// ── Minimal Protobuf Encoder/Decoder ───────────────────────
//
// Pipecat Frame schema:
//   message Frame { oneof frame { AudioRawFrame audio = 2; MessageFrame message = 4; } }
//   message AudioRawFrame { uint64 id=1; string name=2; bytes audio=3; uint32 sample_rate=4; uint32 num_channels=5; }

function encodeVarint(value: number): number[] {
  const bytes: number[] = []
  let v = value >>> 0 // treat as unsigned 32-bit
  while (v > 0x7f) {
    bytes.push((v & 0x7f) | 0x80)
    v >>>= 7
  }
  bytes.push(v & 0x7f)
  return bytes
}

function encodeTag(fieldNumber: number, wireType: number): number[] {
  return encodeVarint((fieldNumber << 3) | wireType)
}

function encodeLengthDelimited(fieldNumber: number, data: Uint8Array): number[] {
  return [...encodeTag(fieldNumber, 2), ...encodeVarint(data.length), ...Array.from(data)]
}

function encodeVarintField(fieldNumber: number, value: number): number[] {
  return [...encodeTag(fieldNumber, 0), ...encodeVarint(value)]
}

function encodeStringField(fieldNumber: number, str: string): number[] {
  const encoded = new TextEncoder().encode(str)
  return encodeLengthDelimited(fieldNumber, encoded)
}

/** Encode an AudioRawFrame wrapped in a Frame (field 2) */
function encodeAudioFrame(pcmBytes: Uint8Array, sampleRate: number, numChannels: number): Uint8Array {
  // Build AudioRawFrame
  const audioRawFrame = [
    ...encodeVarintField(1, 0),                      // id = 0
    ...encodeStringField(2, 'audio'),                // name = "audio"
    ...encodeLengthDelimited(3, pcmBytes),           // audio = pcm bytes
    ...encodeVarintField(4, sampleRate),             // sample_rate
    ...encodeVarintField(5, numChannels),            // num_channels
  ]

  // Wrap in Frame.audio (field 2, length-delimited)
  const frame = encodeLengthDelimited(2, new Uint8Array(audioRawFrame))
  return new Uint8Array(frame)
}

// ── Protobuf Decoder ───────────────────────────────────────

interface ProtoField {
  fieldNumber: number
  wireType: number
  data: Uint8Array | number
}

function decodeVarint(buf: Uint8Array, offset: number): [number, number] {
  let result = 0
  let shift = 0
  let pos = offset
  while (pos < buf.length) {
    const byte = buf[pos++]
    result |= (byte & 0x7f) << shift
    if ((byte & 0x80) === 0) return [result >>> 0, pos]
    shift += 7
    if (shift > 35) break // safety
  }
  return [result >>> 0, pos]
}

function decodeFields(buf: Uint8Array): ProtoField[] {
  const fields: ProtoField[] = []
  let pos = 0
  while (pos < buf.length) {
    const [tag, tagEnd] = decodeVarint(buf, pos)
    pos = tagEnd
    const fieldNumber = tag >>> 3
    const wireType = tag & 0x07

    if (wireType === 0) {
      // Varint
      const [value, valEnd] = decodeVarint(buf, pos)
      pos = valEnd
      fields.push({ fieldNumber, wireType, data: value })
    } else if (wireType === 2) {
      // Length-delimited
      const [length, lenEnd] = decodeVarint(buf, pos)
      pos = lenEnd
      fields.push({ fieldNumber, wireType, data: buf.slice(pos, pos + length) })
      pos += length
    } else {
      // Unknown wire type — skip (best effort)
      break
    }
  }
  return fields
}

interface DecodedAudio {
  type: 'audio'
  pcm: Int16Array
  sampleRate: number
}

interface DecodedMessage {
  type: 'message'
  data: unknown
}

function decodeFrame(buf: Uint8Array): DecodedAudio | DecodedMessage | null {
  const frameFields = decodeFields(buf)

  for (const field of frameFields) {
    if (field.fieldNumber === 2 && field.data instanceof Uint8Array) {
      // AudioRawFrame
      const audioFields = decodeFields(field.data)
      let pcmBytes: Uint8Array | null = null
      let sampleRate = TARGET_SAMPLE_RATE

      for (const af of audioFields) {
        if (af.fieldNumber === 3 && af.data instanceof Uint8Array) {
          pcmBytes = af.data
        } else if (af.fieldNumber === 4 && typeof af.data === 'number') {
          sampleRate = af.data
        }
      }

      if (pcmBytes && pcmBytes.length > 0) {
        // Reinterpret bytes as Int16Array (must be aligned)
        const aligned = new Uint8Array(pcmBytes).buffer
        return { type: 'audio', pcm: new Int16Array(aligned), sampleRate }
      }
    } else if (field.fieldNumber === 4 && field.data instanceof Uint8Array) {
      // MessageFrame — field 1 is JSON string
      const msgFields = decodeFields(field.data)
      for (const mf of msgFields) {
        if (mf.fieldNumber === 1 && mf.data instanceof Uint8Array) {
          try {
            const json = new TextDecoder().decode(mf.data)
            return { type: 'message', data: JSON.parse(json) }
          } catch { /* ignore */ }
        }
      }
    }
  }
  return null
}

// ── Audio Helpers ──────────────────────────────────────────

function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (fromRate === toRate) return input
  const ratio = fromRate / toRate
  const outputLength = Math.floor(input.length / ratio)
  const output = new Float32Array(outputLength)
  for (let i = 0; i < outputLength; i++) {
    const srcIndex = i * ratio
    const low = Math.floor(srcIndex)
    const high = Math.min(low + 1, input.length - 1)
    const frac = srcIndex - low
    output[i] = input[low] * (1 - frac) + input[high] * frac
  }
  return output
}

function float32ToInt16(input: Float32Array): Int16Array {
  const output = new Int16Array(input.length)
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]))
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return output
}

function int16ToFloat32(int16: Int16Array): Float32Array {
  const float32 = new Float32Array(int16.length)
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff)
  }
  return float32
}

// ── VoiceClient ────────────────────────────────────────────

export class VoiceClient {
  private callbacks: VoiceClientCallbacks
  private leadEmail: string | undefined
  private state: AgentState = 'idle'

  private ws: WebSocket | null = null
  private audioContext: AudioContext | null = null
  private mediaStream: MediaStream | null = null
  private sourceNode: MediaStreamAudioSourceNode | null = null
  private workletNode: AudioWorkletNode | null = null

  private playbackTime = 0
  private speakingTimer: ReturnType<typeof setTimeout> | null = null

  constructor(options: VoiceClientOptions | VoiceClientCallbacks) {
    // Support both new-style options object and legacy callbacks-only shape
    if ('callbacks' in options) {
      this.callbacks = options.callbacks
      this.leadEmail = options.leadEmail
    } else {
      this.callbacks = options
    }
  }

  async start(): Promise<void> {
    if (this.state === 'connecting' || this.state === 'listening' || this.state === 'speaking') {
      return
    }

    this.setState('connecting')

    // 1. Mic access
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
      })
    } catch {
      this.callbacks.onError('Precisamos de acesso ao microfone para a demo de voz.')
      this.setState('idle')
      return
    }

    // 2. Audio context + worklet
    try {
      this.audioContext = new AudioContext()
      await this.audioContext.resume()
      await this.audioContext.audioWorklet.addModule('/audio-capture-processor.js')

      const nativeRate = this.audioContext.sampleRate
      const bufferSize = Math.floor(nativeRate * 0.02) // 20ms chunks

      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream)
      this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-capture-processor', {
        processorOptions: { bufferSize },
      })

      this.sourceNode.connect(this.workletNode)
    } catch (err) {
      console.error('Audio setup error:', err)
      this.callbacks.onError('Erro ao configurar áudio. Tenta novamente.')
      this.cleanup()
      this.setState('idle')
      return
    }

    // 3. WebSocket with protobuf framing
    try {
      const wsUrl = this.leadEmail
        ? `${WS_URL}?lead_email=${encodeURIComponent(this.leadEmail)}`
        : WS_URL
      this.ws = new WebSocket(wsUrl)
      this.ws.binaryType = 'arraybuffer'

      this.ws.onopen = () => {
        console.log('[VoiceClient] WebSocket opened — streaming protobuf audio frames')
        this.playbackTime = 0
        this.setState('listening')

        // Start sending mic audio as protobuf-wrapped frames
        const nativeRate = this.audioContext!.sampleRate
        this.workletNode!.port.onmessage = (e: MessageEvent<Float32Array>) => {
          if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return
          const resampled = resample(e.data, nativeRate, TARGET_SAMPLE_RATE)
          const int16 = float32ToInt16(resampled)
          const pcmBytes = new Uint8Array(int16.buffer)
          const frame = encodeAudioFrame(pcmBytes, TARGET_SAMPLE_RATE, 1)
          this.ws.send(frame)
        }
      }

      let msgCount = 0
      this.ws.onmessage = (event: MessageEvent) => {
        let buf: ArrayBuffer
        if (event.data instanceof ArrayBuffer) {
          buf = event.data
        } else {
          return
        }

        if (buf.byteLength === 0) return

        const decoded = decodeFrame(new Uint8Array(buf))
        if (msgCount++ < 10) {
          console.log('[VoiceClient] Received frame:', decoded?.type, decoded?.type === 'audio' ? `${decoded.pcm.length} samples @ ${decoded.sampleRate}Hz` : decoded?.type === 'message' ? JSON.stringify(decoded.data) : 'unknown')
        }

        if (decoded?.type === 'audio') {
          this.playAudio(decoded.pcm, decoded.sampleRate)
        }
      }

      this.ws.onerror = () => {
        console.error('[VoiceClient] WebSocket error')
        this.callbacks.onError('Não foi possível ligar ao assistente. Tenta novamente.')
        this.cleanup()
        this.setState('idle')
      }

      this.ws.onclose = (e) => {
        console.log('[VoiceClient] WebSocket closed — code:', e.code, 'reason:', e.reason)
        if (this.state !== 'idle' && this.state !== 'ended') {
          this.cleanup()
          this.setState('ended')
        }
      }
    } catch {
      this.callbacks.onError('Não foi possível ligar ao assistente. Tenta novamente.')
      this.cleanup()
      this.setState('idle')
    }
  }

  stop(): void {
    this.cleanup()
    this.setState('ended')
  }

  destroy(): void {
    this.cleanup()
    this.callbacks = { onStateChange: () => {}, onError: () => {} }
  }

  private setState(state: AgentState): void {
    this.state = state
    this.callbacks.onStateChange(state)
  }

  private playAudio(pcm: Int16Array, sampleRate: number): void {
    if (!this.audioContext) return

    this.setState('speaking')
    if (this.speakingTimer) clearTimeout(this.speakingTimer)
    this.speakingTimer = setTimeout(() => {
      if (this.state === 'speaking') {
        this.setState('listening')
      }
    }, 600)

    const float32 = int16ToFloat32(pcm)
    const audioBuffer = this.audioContext.createBuffer(1, float32.length, sampleRate)
    audioBuffer.getChannelData(0).set(float32)

    const source = this.audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(this.audioContext.destination)

    const now = this.audioContext.currentTime
    const startAt = Math.max(now, this.playbackTime)
    source.start(startAt)
    this.playbackTime = startAt + audioBuffer.duration
  }

  private cleanup(): void {
    if (this.speakingTimer) {
      clearTimeout(this.speakingTimer)
      this.speakingTimer = null
    }

    if (this.workletNode) {
      this.workletNode.port.onmessage = null
      this.workletNode.disconnect()
      this.workletNode = null
    }

    if (this.sourceNode) {
      this.sourceNode.disconnect()
      this.sourceNode = null
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop())
      this.mediaStream = null
    }

    if (this.audioContext) {
      this.audioContext.close().catch(() => {})
      this.audioContext = null
    }

    if (this.ws) {
      this.ws.onopen = null
      this.ws.onmessage = null
      this.ws.onerror = null
      this.ws.onclose = null
      if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
        this.ws.close(1000)
      }
      this.ws = null
    }

    this.playbackTime = 0
  }
}
