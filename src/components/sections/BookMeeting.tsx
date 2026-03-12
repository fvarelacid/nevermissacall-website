'use client'

import { motion } from 'framer-motion'
import { Calendar, Phone, ArrowRight } from 'lucide-react'

// Replace with your actual Calendly or booking link
const CALENDLY_LINK = 'https://calendly.com/vsoares-primestrategy/30min'

interface BookMeetingProps {
  onCTAClick: () => void
}

export function BookMeeting({ onCTAClick }: BookMeetingProps) {
  return (
    <section id="book" className="section-pad bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 mb-14"
        >
          <div className="inline-block text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Vamos falar
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Quer perceber como isto funcionaria
            <br className="hidden md:block" />{' '}
            na sua clínica?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Posso mostrar-lhe o conceito, perceber o seu caso e explicar como isto poderia
            funcionar com a sua equipa e com o seu atendimento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto"
        >
          {/* Option 1: Test agent */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-4 hover:bg-white/8 transition-all">
            <div className="inline-flex p-3 rounded-xl bg-blue-600/20">
              <Phone className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg mb-1.5">Experimenta agora</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Testa o agente em 2 minutos e percebe logo como funciona na prática.
              </p>
            </div>
            <button
              onClick={onCTAClick}
              className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
            >
              Testar o agente
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Option 2: Book meeting */}
          <div className="bg-blue-600 rounded-2xl p-7 space-y-4 hover:bg-blue-700 transition-all">
            <div className="inline-flex p-3 rounded-xl bg-white/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg mb-1.5">Marca uma reunião</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Conversa direta comigo para perceber como isto encaixa na sua clínica.
              </p>
            </div>
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white hover:text-blue-100 font-semibold text-sm transition-colors"
            >
              Marcar uma reunião
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          Sem compromisso. Sem pressão. Só uma conversa sobre o que pode funcionar para si.
        </motion.p>
      </div>
    </section>
  )
}
