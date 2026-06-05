import Link from "next/link";
import { StorePage } from "../../components/store/StorePage";

export default function LojaPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#131313]/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-white/5 font-headline text-sm font-medium">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[#002468] text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase">Carletti Fit</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              className="text-gray-400 hover:bg-[#252525] hover:text-white transition-colors px-3 py-1 rounded-lg"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-white font-bold transition-colors px-3 py-1 rounded-lg bg-white/5"
              href="/loja"
            >
              Loja
            </Link>
            <Link
              className="text-gray-400 hover:bg-[#252525] hover:text-white transition-colors px-3 py-1 rounded-lg"
              href="/login"
            >
              Plataforma
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-400 hover:text-white px-4 py-2 transition-all">
            Log In
          </Link>
          <Link
            href="/login"
            className="bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] px-5 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all text-xs"
          >
            Área do Coach
          </Link>
        </div>
      </nav>

      <main className="pt-20 px-6 md:px-8 pb-12 max-w-7xl mx-auto">
        <StorePage />
      </main>
    </div>
  );
}
