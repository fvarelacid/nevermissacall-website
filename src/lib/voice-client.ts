/**
 * VoiceClient — wraps @pipecat-ai/client-js + websocket-transport
 * to connect browser mic/speaker to the Railway Pipecat voice server.
 */

import { PipecatClient, RTVIEvent } from '@pipecat-ai/client-js'
import { WebSocketTransport } from '@pipecat-ai/websocket-transport'

export type AgentState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended'

export interface VoiceClientCallbacks {
  onStateChange: (state: AgentState) => void
  onError: (message: string) => void
}

const WS_URL =
  process.env.NEXT_PUBLIC_VOICE_WS_URL ??
  'wss://nevermissacall-production-23c7.up.railway.app/ws/web'

export class VoiceClient {
  private callbacks: VoiceClientCallbacks
  private state: AgentState = 'idle'
  private client: PipecatClient | null = null

  constructor(callbacks: VoiceClientCallbacks) {
    this.callbacks = callbacks
  }

  async start(): Promise<void> {
    if (this.state === 'connecting' || this.state === 'listening' || this.state === 'speaking') {
      return
    }

    this.setState('connecting')

    try {
      const transport = new WebSocketTransport()

      this.client = new PipecatClient({
        transport,
        enableMic: true,
        enableCam: false,
        callbacks: {
          onConnected: () => {
            console.log('[VoiceClient] Connected')
          },
          onBotReady: () => {
            console.log('[VoiceClient] Bot ready')
            this.setState('listening')
          },
          onBotStartedSpeaking: () => {
            this.setState('speaking')
          },
          onBotStoppedSpeaking: () => {
            if (this.state === 'speaking') {
              this.setState('listening')
            }
          },
          onUserStartedSpeaking: () => {
            if (this.state !== 'speaking') {
              this.setState('listening')
            }
          },
          onDisconnected: () => {
            console.log('[VoiceClient] Disconnected')
            this.setState('ended')
          },
          onError: (msg) => {
            console.error('[VoiceClient] Error:', msg)
            this.callbacks.onError('Não foi possível ligar ao assistente. Tenta novamente.')
          },
          onTransportStateChanged: (state) => {
            console.log('[VoiceClient] Transport state:', state)
          },
        },
      })

      this.client.on(RTVIEvent.Error, (msg) => {
        console.error('[VoiceClient] RTVI Error event:', msg)
      })

      await this.client.connect({ wsUrl: WS_URL })
    } catch (err) {
      console.error('[VoiceClient] Connection error:', err)
      this.callbacks.onError('Não foi possível ligar ao assistente. Tenta novamente.')
      this.client = null
      this.setState('idle')
    }
  }

  stop(): void {
    if (this.client) {
      this.client.disconnect().catch(console.error)
      this.client = null
    }
    this.setState('ended')
  }

  destroy(): void {
    if (this.client) {
      this.client.disconnect().catch(() => {})
      this.client = null
    }
    this.callbacks = { onStateChange: () => {}, onError: () => {} }
  }

  private setState(state: AgentState): void {
    this.state = state
    this.callbacks.onStateChange(state)
  }
}
