'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface PricingProps {
  onCTAClick: () => void
}

const features = [
  'Disponível 24h, 7 dias por semana, 365 dias por ano',
  'Marcação e cancelamento de consultas',
  'Responde a dúvidas dos pacientes',
  'Personalizado para a sua clínica',
  'Sem custo por chamada',
  'Sem contratos de longa duração',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function Pricing({ onCTAClick }: PricingProps) {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-2xl mx-auto text-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Plano único
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Preço simples, sem surpresas
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            Sem contratos. Cancela quando quiser.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-blue-600 rounded-2xl" />
          <div className="relative m-[2px] bg-white rounded-2xl p-8 sm:p-10">

            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
              Recepcionista IA
            </p>

            <div className="flex items-end justify-center gap-1 mb-1">
              <span className="text-3xl font-bold text-slate-700 mb-2">€</span>
              <span className="text-7xl font-extrabold text-slate-900 leading-none tracking-tight">
                249
              </span>
              <span className="text-2xl font-medium text-slate-500 mb-2">/mês</span>
            </div>
            <p className="text-sm text-slate-400 mb-8">por clínica · configuração incluída</p>

            <div className="border-t border-slate-100 pt-8 mb-8 space-y-3 text-left">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                    <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onCTAClick}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-base hover:opacity-90 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-blue-200"
            >
              Começar agora
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
