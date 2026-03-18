'use client'

import { motion } from 'framer-motion'
import { PhoneOff, Clock, CalendarCheck, Zap, Users, ArrowUpRight, MessageCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
      {children}
    </div>
  )
}

export function Features() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── Block 1: Why ── */}
        <div>
          <div className="text-center mb-14">
            <SectionLabel>Porque é que isto importa</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Cada chamada perdida é uma consulta que nunca acontece.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Muitas clínicas perdem chamadas todos os dias quando a receção está ocupada, em pausa ou fora de horas.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: PhoneOff,
                title: 'Menos chamadas perdidas',
                desc: 'Atenda chamadas quando a equipa não consegue responder a tempo.',
                color: 'text-red-500',
                bg: 'bg-red-50',
              },
              {
                icon: CalendarCheck,
                title: 'Mais consultas marcadas',
                desc: 'Permita ao cliente marcar logo, sem esperar por retorno.',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: Clock,
                title: 'Receção com menos carga',
                desc: 'Liberta a equipa para se focar nos clientes que já estão na clínica.',
                color: 'text-violet-600',
                bg: 'bg-violet-50',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-cream-50 rounded-2xl p-7 space-y-4"
              >
                <div className={`inline-flex p-3 rounded-xl ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Block 2: Modes ── */}
        <div>
          <div className="text-center mb-14">
            <SectionLabel>Flexibilidade total</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Adaptado à forma como a sua clínica trabalha.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              O assistente encaixa no seu processo atual — não o substitui.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {[
              {
                icon: Zap,
                label: 'AI primeiro',
                title: 'Atende de imediato',
                desc: 'O assistente atende imediatamente e passa para humano quando necessário.',
                color: 'text-amber-500',
                bg: 'bg-amber-50',
              },
              {
                icon: Users,
                label: 'Humano primeiro',
                title: 'Entra como suporte',
                desc: 'A receção continua a atender primeiro. O assistente entra só como fallback.',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
              },
              {
                icon: ArrowUpRight,
                label: 'Escalada inteligente',
                title: 'Passa para a equipa',
                desc: 'Quando o assunto exige uma pessoa, transfere a chamada ou pede callback.',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: MessageCircle,
                label: 'Informação e marcações',
                title: 'Responde e agenda',
                desc: 'Responde a perguntas frequentes e ajuda na marcação de consultas.',
                color: 'text-violet-600',
                bg: 'bg-violet-50',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-soft space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`inline-flex p-2.5 rounded-xl ${item.bg}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Block 3: How it works ── */}
        <div>
          <div className="text-center mb-14">
            <SectionLabel>Como funciona</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Simples. Rápido. Eficaz.
            </h2>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

            {[
              { step: '01', title: 'O cliente liga', desc: 'O número da clínica toca como sempre.' },
              { step: '02', title: 'O assistente entra', desc: 'Atende quando a receção não consegue responder.' },
              { step: '03', title: 'A clínica recupera', desc: 'Oportunidades que antes se perdiam tornam-se consultas.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 text-white text-2xl font-bold shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
