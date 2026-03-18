'use client'

import { useModal } from '@/hooks/ui/useModal'
import { Hero } from '@/components/sections/Hero'
import { AvailabilityBar } from '@/components/sections/AvailabilityBar'
import { Features } from '@/components/sections/Features'
import { RoiCalculator } from '@/components/sections/RoiCalculator'
import { Pricing } from '@/components/sections/Pricing'
import { BookMeeting } from '@/components/sections/BookMeeting'
import { Modal } from '@/components/ui/Modal'
import { Footer } from '@/components/Footer'

export default function Home() {
  const { step, leadData, openModal, closeModal, submitLead } = useModal()

  return (
    <main>
      <Hero onCTAClick={openModal} />
      <AvailabilityBar />
      <Features />
      <RoiCalculator onCTAClick={openModal} />
      <Pricing onCTAClick={openModal} />
      <BookMeeting onCTAClick={openModal} />

      <Footer />

      <Modal
        step={step}
        leadData={leadData}
        onClose={closeModal}
        onSubmit={submitLead}
      />
    </main>
  )
}
