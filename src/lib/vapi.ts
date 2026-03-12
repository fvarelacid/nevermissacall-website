/**
 * VAPI shared types and config.
 * Session lifecycle is managed directly in VoiceDemo.tsx via the @vapi-ai/web SDK.
 *
 * NEXT_PUBLIC_ prefix é intencional: estas variáveis são seguras no browser.
 * A public key identifica a conta VAPI mas não permite acesso à API privada.
 * Configura os domínios permitidos no dashboard VAPI para limitar o uso.
 */

export type AgentState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'ended'

export const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? ''
export const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? ''
