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
  'Personalizado para a sua clínica',
  'Sem contratos de longa duração',
]

const plans = [
  {
    name: 'Care',
    price: '149',
    subtitle: 'por clínica · configuração incluída',
    features: [...sharedFeatures, 'Até 100 chamadas por mês'],
    highlighted: false,
    isCustom: false,
  },
  {
    name: 'Care Pro',
    price: '249',
    subtitle: 'por clínica · configuração incluída',
    features: [...sharedFeatures, 'Até 300 chamadas por mês'],
    highlighted: true,
    isCustom: false,
  },
  {
    name: 'Care Unlimited',
    price: null,
    subtitle: 'por clínica · configuração incluída',
    features: [...sharedFeatures, 'Chamadas ilimitadas', 'Proposta personalizada'],
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
      <div className="max-w-5xl mx-auto text-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <div className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Planos
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Preço simples, sem surpresas
          </h2>
          <p className="text-slate-500 text-lg mb-10">
            Sem contratos. Cancela quando quiser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* gradient border */}
              <div className={`absolute inset-0 rounded-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-500 via-violet-500 to-blue-600'
                  : 'bg-gradient-to-br from-slate-300 to-slate-400'
              }`} />
              <div className="relative m-[2px] bg-white rounded-2xl p-8 sm:p-10 flex flex-col h-full">

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
                    <span className="text-4xl font-extrabold text-slate-900 leading-none tracking-tight">
                      Sob consulta
                    </span>
                  </div>
                ) : (
                  <div className="flex items-end justify-center gap-1 mb-1">
                    <span className="text-3xl font-bold text-slate-700 mb-2">€</span>
                    <span className="text-6xl font-extrabold text-slate-900 leading-none tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-2xl font-medium text-slate-500 mb-2">/mês</span>
                  </div>
                )}
                <p className="text-sm text-slate-400 mb-8">{plan.subtitle}</p>

                <div className="border-t border-slate-100 pt-8 mb-8 space-y-3 text-left flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                        <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 rounded-xl font-semibold text-base text-center hover:opacity-90 active:scale-[0.98] transition-all duration-150 ${
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
