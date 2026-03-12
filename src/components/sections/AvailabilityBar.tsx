'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Sempre online', live: true },
  { label: '24h / dia' },
  { label: '7 dias / semana' },
  { label: '365 dias / ano' },
]

export function AvailabilityBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900 border-b border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2">
            {stat.live && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
            <span className="text-xs font-medium text-slate-300 tracking-wide whitespace-nowrap">
              {stat.label}
            </span>
            {i < stats.length - 1 && (
              <span className="hidden sm:block text-slate-600 text-xs ml-4">|</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
