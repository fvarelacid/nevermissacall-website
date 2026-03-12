'use client'

import { useModal } from '@/hooks/ui/useModal'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { RoiCalculator } from '@/components/sections/RoiCalculator'
import { BookMeeting } from '@/components/sections/BookMeeting'
import { Modal } from '@/components/ui/Modal'

export default function Home() {
  const { step, leadData, openModal, closeModal, submitLead } = useModal()

  return (
    <main>
      <Hero onCTAClick={openModal} />
      <Features />
      <RoiCalculator onCTAClick={openModal} />
      <BookMeeting onCTAClick={openModal} />

      <Modal
        step={step}
        leadData={leadData}
        onClose={closeModal}
        onSubmit={submitLead}
      />
    </main>
  )
}
