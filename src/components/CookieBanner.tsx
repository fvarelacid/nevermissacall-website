'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  function handleReject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto rounded-xl bg-slate-800 border border-white/10 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-slate-300 flex-1">
          Este website utiliza tecnologias de armazenamento local e serviços
          de terceiros que podem definir cookies. Consulte a nossa{' '}
          <Link
            href="/cookies"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Política de Cookies
          </Link>{' '}
          para mais informações.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Rejeitar
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
