'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, ArrowRight, Calendar } from 'lucide-react'

interface HeroProps {
  onCTAClick: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-cream-50 to-cream-50 pointer-events-none" />

      {/* Decorative orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      {/* Logo at top */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[280px] md:w-[420px]">
        <Image src="/logo.png" alt="NeverMissACall" width={420} height={120} priority className="w-full h-auto" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 pt-24 md:pt-28">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full shadow-soft"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Assistente de voz com IA para clínicas
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.08]"
        >
          Nunca mais perca uma{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            chamada
          </span>{' '}
          de um paciente.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          O assistente de voz para clínicas que atende quando a receção está ocupada
          e ajuda a marcar consultas automaticamente — sem perder o toque humano.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <button
            onClick={onCTAClick}
            className="group flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-4 rounded-full text-base transition-all shadow-lg hover:shadow-xl hover:shadow-blue-200"
          >
            <Phone className="w-4 h-4" />
            Testar o agente
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#book"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-6 py-4 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-white transition-all text-base"
          >
            <Calendar className="w-4 h-4" />
            Marcar uma conversa
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm text-gray-400"
        >
          Demonstração gratuita · Sem cartão de crédito · Configuração em minutos
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-gray-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
