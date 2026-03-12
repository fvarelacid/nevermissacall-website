'use client'

import { useState, FormEvent } from 'react'
import type { LeadFormData } from '@/types'
import { ArrowRight, Loader2 } from 'lucide-react'

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void
}

export function LeadForm({ onSubmit }: LeadFormProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Partial<Record<'firstName' | 'email', string>>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const newErrors: typeof errors = {}
    if (!firstName.trim()) newErrors.firstName = 'Por favor introduza o seu nome.'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Por favor introduza um email válido.'
    }
    return newErrors
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setLoading(true)

    // Simulate brief loading before transitioning
    await new Promise(r => setTimeout(r, 600))

    onSubmit({
      firstName: firstName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nome <span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="O seu primeiro nome"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
            ${errors.firstName
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            } bg-white`}
        />
        {errors.firstName && (
          <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="clinica@exemplo.com"
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
            ${errors.email
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            } bg-white`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          Telefone <span className="text-gray-400 text-xs font-normal">(opcional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+351 910 000 000"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all text-sm mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            A preparar a demo…
          </>
        ) : (
          <>
            Continuar para a demo
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400 mt-2">
        Os seus dados não são partilhados com terceiros.
      </p>
    </form>
  )
}
