import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Footer } from '@/components/Footer'

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="bg-slate-900 border-b border-white/10 py-4 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>
      </header>

      <main className="bg-slate-950 min-h-screen py-16 px-6">
        <article className="max-w-3xl mx-auto prose prose-invert prose-slate prose-sm prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
          {children}
        </article>
      </main>

      <Footer />
    </>
  )
}
