'use client'

import Image from 'next/image'
import { useModal } from '@/hooks/ui/useModal'
import { Hero } from '@/components/sections/Hero'
import { AvailabilityBar } from '@/components/sections/AvailabilityBar'
import { Features } from '@/components/sections/Features'
import { RoiCalculator } from '@/components/sections/RoiCalculator'
import { Pricing } from '@/components/sections/Pricing'
import { BookMeeting } from '@/components/sections/BookMeeting'
import { Modal } from '@/components/ui/Modal'

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

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
          <Image src="/logo.png" alt="NeverMissACall" width={300} height={84} className="opacity-70" />
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} NeverMissACall. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <Modal
        step={step}
        leadData={leadData}
        onClose={closeModal}
        onSubmit={submitLead}
      />
    </main>
  )
}
