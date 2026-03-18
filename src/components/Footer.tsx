import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
          <Link
            href="/privacidade"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/cookies"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Política de Cookies
          </Link>
          <Link
            href="/termos"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Termos e Condições
          </Link>
        </div>
        <p className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} NeverMissACall. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
