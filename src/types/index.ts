export interface LeadFormData {
  firstName: string
  email: string
  phone?: string
}

export type ModalStep = 'closed' | 'form' | 'demo'

export interface RoiInputs {
  avgConsultationValue: number
  callsPerDay: number
  missedCallsPercent: number
  conversionRate: number
  workingDaysPerMonth: number
}

export interface RoiOutputs {
  missedCallsPerMonth: number
  lostConsultations: number
  lostRevenuePerMonth: number
  annualROIEstimate: number
  breakEvenPercent: number
}
