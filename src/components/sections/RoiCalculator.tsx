'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import type { RoiInputs, RoiOutputs } from '@/types'
import { TrendingDown, Phone, Euro, BarChart3 } from 'lucide-react'

const DEFAULTS: RoiInputs = {
  avgConsultationValue: 150,
  callsPerDay: 20,
  missedCallsPercent: 30,
  conversionRate: 60,
  workingDaysPerMonth: 22,
}

function getMonthlyPackageCost(callsPerMonth: number): number {
  if (callsPerMonth <= 150) return 149
  if (callsPerMonth <= 350) return 249
  if (callsPerMonth <= 700) return 449
  return 449 // >700: Unlimited Care é sob consulta; usa Advanced como referência
}

function getPlanName(callsPerMonth: number): string {
  if (callsPerMonth <= 150) return 'Basic Care'
  if (callsPerMonth <= 350) return 'Pro Care'
  if (callsPerMonth <= 700) return 'Advanced Care'
  return 'Unlimited Care'
}

function calculateROI(inputs: RoiInputs): RoiOutputs & { callsPerMonth: number; monthlyCost: number } {
  const callsPerMonth = Math.round(inputs.callsPerDay * inputs.workingDaysPerMonth)
  const monthlyCost = getMonthlyPackageCost(callsPerMonth)

  const missedCallsPerDay = inputs.callsPerDay * (inputs.missedCallsPercent / 100)
  const missedCallsPerMonth = Math.round(missedCallsPerDay * inputs.workingDaysPerMonth)
  const lostConsultations = Math.round(missedCallsPerMonth * (inputs.conversionRate / 100))
  const lostRevenuePerMonth = lostConsultations * inputs.avgConsultationValue
  const annualROIEstimate = Math.round(lostRevenuePerMonth * 12 - monthlyCost * 12)

  // How many consultations needed to cover annual cost, expressed as % of annual missed consultations
  const annualCost = monthlyCost * 12
  const consultationsNeeded = inputs.avgConsultationValue > 0
    ? annualCost / inputs.avgConsultationValue
    : 0
  const totalMissedPerYear = lostConsultations * 12
  const breakEvenPercent = totalMissedPerYear > 0
    ? Math.round((consultationsNeeded / totalMissedPerYear) * 100)
    : 0

  return {
    missedCallsPerMonth,
    lostConsultations,
    lostRevenuePerMonth,
    annualROIEstimate,
    breakEvenPercent,
    callsPerMonth,
    monthlyCost,
  }
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(Math.round(latest))
    })
    return unsubscribe
  }, [spring])

  // Update target when value changes
  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [value, motionValue, isInView])

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString('pt-PT')}{suffix}
    </span>
  )
}

interface InputFieldProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
}

function InputField({ label, value, onChange, min, max, step = 1, prefix, suffix }: InputFieldProps) {
  const [raw, setRaw] = useState(String(value))

  // Sync when parent value changes externally (e.g. reset)
  useEffect(() => {
    setRaw(String(value))
  }, [value])

  const commit = useCallback((str: string) => {
    const v = Number(str)
    const clamped = isNaN(v) ? min : Math.min(max, Math.max(min, v))
    onChange(clamped)
    setRaw(String(clamped))
  }, [min, max, onChange])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-gray-400 text-sm font-medium">{prefix}</span>
        )}
        <input
          type="number"
          value={raw}
          min={min}
          max={max}
          step={step}
          onChange={e => {
            setRaw(e.target.value)
            const v = Number(e.target.value)
            if (!isNaN(v) && e.target.value !== '') onChange(v)
          }}
          onBlur={e => commit(e.target.value)}
          className={`w-full py-3 pr-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all bg-white ${prefix ? 'pl-8' : 'pl-4'}`}
        />
        {suffix && (
          <span className="absolute right-4 text-gray-400 text-sm font-medium">{suffix}</span>
        )}
      </div>
    </div>
  )
}

interface RoiCalculatorProps {
  onCTAClick: () => void
}

export function RoiCalculator({ onCTAClick }: RoiCalculatorProps) {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULTS)
  const outputs = calculateROI(inputs)

  function update(key: keyof RoiInputs) {
    return (v: number) => setInputs(prev => ({ ...prev, [key]: v }))
  }

  const resultCards = [
    {
      icon: Phone,
      label: 'Chamadas perdidas / mês',
      value: outputs.missedCallsPerMonth,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      icon: TrendingDown,
      label: 'Consultas perdidas / mês',
      value: outputs.lostConsultations,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      icon: Euro,
      label: 'Receita perdida / mês',
      value: outputs.lostRevenuePerMonth,
      prefix: '€',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      icon: BarChart3,
      label: 'ROI estimado / ano',
      value: outputs.annualROIEstimate,
      prefix: '€',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ]

  return (
    <section className="section-pad bg-cream-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Calculadora de ROI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Quanto pode estar a perder por mês?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Ajuste os valores para a sua clínica e veja o impacto real das chamadas não atendidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="bg-white rounded-3xl shadow-card p-8 space-y-5">
            <h3 className="font-semibold text-gray-900 text-lg mb-6">Dados da sua clínica</h3>

            <InputField
              label="Valor médio de uma consulta"
              value={inputs.avgConsultationValue}
              onChange={update('avgConsultationValue')}
              min={30}
              max={2000}
              step={10}
              prefix="€"
            />
            <InputField
              label="Chamadas recebidas por dia"
              value={inputs.callsPerDay}
              onChange={update('callsPerDay')}
              min={1}
              max={200}
            />
            <InputField
              label="Percentagem de chamadas perdidas"
              value={inputs.missedCallsPercent}
              onChange={update('missedCallsPercent')}
              min={5}
              max={80}
              suffix="%"
            />
            <InputField
              label="Taxa de conversão de chamada em consulta"
              value={inputs.conversionRate}
              onChange={update('conversionRate')}
              min={10}
              max={100}
              suffix="%"
            />
            <InputField
              label="Dias de trabalho por mês"
              value={inputs.workingDaysPerMonth}
              onChange={update('workingDaysPerMonth')}
              min={10}
              max={31}
            />

            {/* Dynamic package info */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Chamadas estimadas / mês</span>
                <span className="font-semibold text-gray-900">{outputs.callsPerMonth.toLocaleString('pt-PT')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pacote aplicável</span>
                <span className="font-semibold text-blue-600">
                  {getPlanName(outputs.callsPerMonth)}{outputs.callsPerMonth <= 700 ? ` — €${outputs.monthlyCost} / mês` : ' — Sob consulta'}
                </span>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {resultCards.map((card) => (
                <motion.div
                  key={card.label}
                  layout
                  className="bg-white rounded-2xl shadow-soft p-5 space-y-3"
                >
                  <div className={`inline-flex p-2.5 rounded-xl ${card.bg}`}>
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${card.color}`}>
                      <AnimatedNumber
                        value={card.value}
                        prefix={card.prefix}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight">{card.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary box */}
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-6 text-white space-y-3">
              <p className="text-sm font-medium text-blue-100">Estimativa de impacto</p>
              <p className="text-lg font-semibold leading-snug">
                A sua clínica pode estar a perder{' '}
                <span className="text-white font-bold">
                  €{outputs.lostRevenuePerMonth.toLocaleString('pt-PT')} por mês
                </span>{' '}
                em consultas não marcadas.
              </p>
              <p className="text-sm text-blue-200">
                Para pagar o sistema (€{outputs.monthlyCost.toLocaleString('pt-PT')}/mês), basta recuperar{' '}
                <span className="text-white font-semibold">
                  {outputs.breakEvenPercent > 0 ? `${outputs.breakEvenPercent}% das consultas perdidas` : 'algumas consultas perdidas'}
                </span>{' '}
                — o resto é lucro.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onCTAClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all text-sm shadow-lg hover:shadow-xl hover:shadow-blue-200"
            >
              Recuperar esta receita — Testar o agente
            </button>

            <p className="text-center text-xs text-gray-400">
              * Estimativa com base nos valores introduzidos. O custo do sistema não está incluído nos valores de perda.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
