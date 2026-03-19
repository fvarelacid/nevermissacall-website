'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const CALENDLY_LINK = 'https://calendly.com/vsoares-primestrategy/30min'

interface PricingProps {
  onCTAClick: () => void
}

const sharedFeatures = [
  'Disponível 24h, 7 dias por semana, 365 dias por ano',
  'Marcação e cancelamento de consultas',
  'Responde a dúvidas dos clientes',
  'Configuração incluída',
  'Personalizado para a sua clínica',
  'Sem contratos de longa duração',
  'Suporte bilingue: Português e Inglês nativos',
]

const plans = [
  {
    name: 'Basic Care',
    price: '149',
    callLimit: 'Até 150 chamadas/mês',
    callsPerDay: '~7 chamadas/dia',
    highlighted: false,
    isCustom: false,
  },
  {
    name: 'Pro Care',
    price: '249',
    callLimit: 'Até 350 chamadas/mês',
    callsPerDay: '~16 chamadas/dia',
    highlighted: true,
    isCustom: false,
  },
  {
    name: 'Advanced Care',
    price: '449',
    callLimit: 'Até 700 chamadas/mês',
    callsPerDay: '~32 chamadas/dia',
    highlighted: false,
    isCustom: false,
  },
  {
    name: 'Unlimited Care',
    price: null,
    callLimit: 'Chamadas ilimitadas',
    callsPerDay: null,
    highlighted: false,
    isCustom: true,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function Pricing({ onCTAClick }: PricingProps) {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-6xl mx-auto text-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Preço simples, sem surpresas
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Sem contratos. Cancela quando quiser.
          </p>
        </motion.div>

        {/* Shared features — shown once */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-sm font-semibold text-slate-700 mb-5">
            Incluído em todos os planos:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-left max-w-2xl mx-auto">
            {sharedFeatures.map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                </div>
                <span className="text-sm text-slate-600">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className={`rounded-2xl p-[2px] shadow-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-500 via-violet-500 to-blue-600'
                  : 'bg-gradient-to-br from-slate-300 to-slate-400'
              }`}
            >
              <div className="relative bg-white rounded-[14px] p-6 sm:p-8 flex flex-col h-full">

                {plan.highlighted && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-b-lg">
                      Popular
                    </span>
                  </div>
                )}

                <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
                  {plan.name}
                </p>

                {plan.isCustom ? (
                  <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-3xl font-extrabold text-slate-900 leading-none tracking-tight">
                      Sob consulta
                    </span>
                  </div>
                ) : (
                  <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-2xl font-bold text-slate-700 mb-1.5">€</span>
                    <span className="text-5xl font-extrabold text-slate-900 leading-none tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xl font-medium text-slate-500 mb-1.5">/mês</span>
                  </div>
                )}
                <p className="text-sm text-slate-400 mb-6">por número</p>

                {/* Call limit — the key differentiator */}
                <div className="border-t border-slate-100 pt-5 mb-6 flex-1 space-y-2">
                  <div className="flex items-center gap-2.5 justify-center">
                    <span className="text-sm font-semibold text-slate-800">{plan.callLimit}</span>
                  </div>
                  {plan.callsPerDay && (
                    <p className="text-xs text-slate-400">{plan.callsPerDay}</p>
                  )}
                  {plan.isCustom && (
                    <p className="text-xs text-slate-400">Proposta personalizada</p>
                  )}
                </div>

                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3.5 rounded-xl font-semibold text-sm text-center hover:opacity-90 active:scale-[0.98] transition-all duration-150 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  }`}
                >
                  {plan.isCustom ? 'Marcar reunião' : 'Começar agora'}
                </a>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
