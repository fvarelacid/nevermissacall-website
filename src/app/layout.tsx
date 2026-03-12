import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NeverMissACall — Assistente de Voz para Clínicas de Estética',
  description:
    'O assistente de voz com IA que atende quando a receção está ocupada e ajuda a marcar consultas automaticamente. Nunca mais perca uma chamada de um paciente.',
  openGraph: {
    title: 'NeverMissACall — Assistente de Voz para Clínicas de Estética',
    description:
      'Transforme chamadas perdidas em consultas. O agente de IA que atende, informa e marca automaticamente.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
