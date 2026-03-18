'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneOff, Mic, Volume2 } from 'lucide-react'
import { VoiceClient, type AgentState } from '@/lib/voice-client'

interface VoiceDemoProps {
  firstName: string
  email?: string
}

const STATE_LABELS: Record<AgentState, string> = {
  idle: 'Clica para falar com o assistente',
  connecting: 'A ligar ao assistente…',
  listening: 'A ouvir-te…',
  speaking: 'O assistente está a falar',
  ended: 'Sessão terminada',
}

const ORB_COLORS: Record<AgentState, string> = {
  idle: 'from-slate-300 to-slate-400',
  connecting: 'from-blue-300 to-blue-500',
  listening: 'from-emerald-400 to-teal-500',
  speaking: 'from-blue-500 to-violet-600',
  ended: 'from-slate-300 to-slate-400',
}

const ORB_GLOW: Record<AgentState, string> = {
  idle: 'shadow-[0_0_0px_rgba(0,0,0,0)]',
  connecting: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
  listening: 'shadow-[0_0_50px_rgba(52,211,153,0.4)]',
  speaking: 'shadow-[0_0_60px_rgba(99,102,241,0.45)]',
  ended: 'shadow-[0_0_0px_rgba(0,0,0,0)]',
}

function WaveformBars({ active }: { active: boolean }) {
  const bars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45, 0.75, 0.55]

  return (
    <div className="flex items-center justify-center gap-0.5 h-8">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-current"
          animate={active ? {
            scaleY: [height * 0.3, height, height * 0.5, height * 0.8, height * 0.3],
          } : {
            scaleY: 0.15,
          }}
          transition={active ? {
            duration: 0.8 + i * 0.07,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.05,
          } : {
            duration: 0.3,
          }}
          style={{ originY: 'center', height: '32px' }}
        />
      ))}
    </div>
  )
}

export function VoiceDemo({ firstName, email }: VoiceDemoProps) {
  const [agentState, setAgentState] = useState<AgentState>('idle')
  const [error, setError] = useState<string | null>(null)
  const clientRef = useRef<VoiceClient | null>(null)

  useEffect(() => {
    const client = new VoiceClient({
      callbacks: {
        onStateChange: setAgentState,
        onError: (msg) => {
          setError(msg)
          setAgentState('idle')
        },
      },
      leadEmail: email,
    })
    clientRef.current = client

    return () => {
      client.destroy()
    }
  }, [email])

  const isActive = agentState === 'connecting' || agentState === 'listening' || agentState === 'speaking'

  const handleStart = useCallback(async () => {
    if (isActive) return
    setError(null)
    await clientRef.current?.start()
  }, [isActive])

  const handleEnd = useCallback(() => {
    clientRef.current?.stop()
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">
          {firstName ? `Olá, ${firstName}!` : 'Olá!'} Fala com o assistente
        </h3>
        <p className="text-sm text-gray-500">
          Simula uma marcação ou faz uma pergunta sobre a clínica
        </p>
      </div>

      {/* Orb */}
      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute w-52 h-52 rounded-full bg-blue-100/60"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {agentState === 'listening' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-44 h-44 rounded-full bg-emerald-100"
            />
          )}
        </AnimatePresence>

        <motion.div
          className={`relative w-36 h-36 rounded-full bg-gradient-to-br ${ORB_COLORS[agentState]} ${ORB_GLOW[agentState]} transition-shadow duration-500 cursor-pointer flex items-center justify-center`}
          animate={
            agentState === 'connecting'
              ? { scale: [1, 1.04, 1], transition: { duration: 1.2, repeat: Infinity } }
              : agentState === 'listening'
              ? { scale: [1, 1.05, 1.02, 1.05, 1], transition: { duration: 0.9, repeat: Infinity } }
              : agentState === 'speaking'
              ? { scale: [1, 1.08, 1.03, 1.09, 1], transition: { duration: 0.7, repeat: Infinity } }
              : { scale: 1 }
          }
          onClick={agentState === 'idle' || agentState === 'ended' ? handleStart : undefined}
        >
          <div className="text-white opacity-70">
            {agentState === 'listening' ? (
              <Mic className="w-10 h-10" />
            ) : agentState === 'speaking' ? (
              <Volume2 className="w-10 h-10" />
            ) : (
              <Phone className="w-10 h-10" />
            )}
          </div>
        </motion.div>
      </div>

      {/* Waveform */}
      <div
        className={`transition-colors duration-300 ${
          agentState === 'listening' ? 'text-emerald-500' : 'text-blue-500'
        }`}
      >
        <WaveformBars active={agentState === 'listening' || agentState === 'speaking'} />
      </div>

      {/* Status label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={agentState}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-gray-500 text-center min-h-[1.25rem]"
        >
          {STATE_LABELS[agentState]}
        </motion.p>
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 text-center max-w-xs">{error}</p>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {(agentState === 'idle' || agentState === 'ended') && (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md hover:shadow-lg"
          >
            <Phone className="w-4 h-4" />
            Iniciar chamada
          </button>
        )}

        {isActive && (
          <button
            onClick={handleEnd}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all shadow-md hover:shadow-lg"
          >
            <PhoneOff className="w-4 h-4" />
            Terminar chamada
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center max-w-xs">
        Esta é uma demonstração do assistente. A integração com a clínica é configurada posteriormente.
      </p>
    </div>
  )
}
