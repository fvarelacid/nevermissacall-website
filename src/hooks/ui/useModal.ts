'use client'

import { useState, useCallback } from 'react'
import type { LeadFormData, ModalStep } from '@/types'

interface UseModalReturn {
  step: ModalStep
  leadData: LeadFormData | null
  openModal: () => void
  closeModal: () => void
  submitLead: (data: LeadFormData) => void
}

export function useModal(): UseModalReturn {
  const [step, setStep] = useState<ModalStep>('closed')
  const [leadData, setLeadData] = useState<LeadFormData | null>(null)

  const openModal = useCallback(() => {
    setStep('form')
  }, [])

  const closeModal = useCallback(() => {
    setStep('closed')
    setLeadData(null)
  }, [])

  const submitLead = useCallback((data: LeadFormData) => {
    setLeadData(data)
    setStep('demo')

    // Fire-and-forget: send lead data to a webhook or analytics
    // Replace with your endpoint when ready
    // fetch('/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // }).catch(console.error)
  }, [])

  return { step, leadData, openModal, closeModal, submitLead }
}
