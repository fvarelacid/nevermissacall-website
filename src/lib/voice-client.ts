/**
 * VoiceClient — raw PCM WebSocket connection to the Railway voice server.
 *
 * Protocol: no handshake — just send/receive raw PCM 16-bit, 16kHz, mono
 * binary frames after the WebSocket opens.
 */

export type AgentState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended'

export interface VoiceClientCallbacks {
  onStateChange: (state: AgentState) => void
  onError: (message: string) => void
}

const WS_URL =
  process.env.NEXT_PUBLIC_VOICE_WS_URL ??
  'wss://nevermissacall-production-23c7.up.railway.app/ws/web'

const TARGET_SAMPLE_RATE = 16_000

// ── Helpers ────────────────────────────────────────────────

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

function float32ToInt16(input: Float32Array): ArrayBuffer {
  const output = new Int16Array(input.length)
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]))
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return output.buffer
}

function int16ToFloat32(buffer: ArrayBuffer): Float32Array {
  const int16 = new Int16Array(buffer)
  const float32 = new Float32Array(int16.length)
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff)
  }
  return float32
}

// ── VoiceClient ────────────────────────────────────────────

export class VoiceClient {
  private callbacks: VoiceClientCallbacks
  private state: AgentState = 'idle'

  private ws: WebSocket | null = null
  private audioContext: AudioContext | null = null
  private mediaStream: MediaStream | null = null
  private sourceNode: MediaStreamAudioSourceNode | null = null
  private workletNode: AudioWorkletNode | null = null

  private playbackTime = 0
  private speakingTimer: ReturnType<typeof setTimeout> | null = null

  constructor(callbacks: VoiceClientCallbacks) {
    this.callbacks = callbacks
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
      const bufferSize = Math.floor(nativeRate * 0.02) // 20ms chunks for low latency

      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream)
      this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-capture-processor', {
        processorOptions: { bufferSize },
      })

      this.sourceNode.connect(this.workletNode)
      // Worklet is a capture tap — don't connect to destination
    } catch (err) {
      console.error('Audio setup error:', err)
      this.callbacks.onError('Erro ao configurar áudio. Tenta novamente.')
      this.cleanup()
      this.setState('idle')
      return
    }

    // 3. WebSocket — no handshake, just raw PCM binary frames
    try {
      this.ws = new WebSocket(WS_URL)
      this.ws.binaryType = 'arraybuffer'

      this.ws.onopen = () => {
        console.log('[VoiceClient] WebSocket opened — streaming audio')
        this.playbackTime = 0
        this.setState('listening')

        // Start sending mic audio immediately after connection
        const nativeRate = this.audioContext!.sampleRate
        this.workletNode!.port.onmessage = (e: MessageEvent<Float32Array>) => {
          if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return
          const resampled = resample(e.data, nativeRate, TARGET_SAMPLE_RATE)
          const pcm = float32ToInt16(resampled)
          this.ws.send(pcm)
        }
      }

      this.ws.onmessage = (event: MessageEvent) => {
        // Server sends raw PCM binary frames back
        if (event.data instanceof ArrayBuffer && event.data.byteLength > 0) {
          this.playPcm(event.data)
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

  private playPcm(buffer: ArrayBuffer): void {
    if (!this.audioContext) return

    this.setState('speaking')
    if (this.speakingTimer) clearTimeout(this.speakingTimer)
    this.speakingTimer = setTimeout(() => {
      if (this.state === 'speaking') {
        this.setState('listening')
      }
    }, 600)

    const float32 = int16ToFloat32(buffer)
    const audioBuffer = this.audioContext.createBuffer(1, float32.length, TARGET_SAMPLE_RATE)
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
