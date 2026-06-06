import Link from "next/link";
import { ToolPlaceholder } from "../../../../components/store/ToolPlaceholder";

export default function CalculadoraCargaGlicemicaPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#131313]/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-b border-white/5 font-headline text-sm font-medium">
        <Link href="/loja" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#002468] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span className="text-xl font-black tracking-tight text-white uppercase">Carletti Fit</span>
        </Link>
      </nav>

      <main className="pt-20 px-6 md:px-8 pb-12 max-w-4xl mx-auto">
        <ToolPlaceholder
          slug="calculadora-carga-glicemica"
          title="Calculadora de Carga Glicêmica"
          description="Calcule a carga glicêmica dos seus alimentos e tome decisões inteligentes sobre carboidratos."
          icon="calculate"
          sourceFile="calculadora-carga-glicemica.jsx"
        />
      </main>
    </div>
  );
}
