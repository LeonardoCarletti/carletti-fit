import Link from "next/link";
import { getProductBySlug, getPurchaseUrl, formatPrice } from "../../lib/products";

interface ToolPlaceholderProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  sourceFile: string;
}

export function ToolPlaceholder({ slug, title, description, icon, sourceFile }: ToolPlaceholderProps) {
  const product = getProductBySlug(slug);

  return (
    <div className="space-y-8">
      <Link
        href="/loja"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Voltar à loja
      </Link>

      <div className="bg-[#131313] rounded-3xl border border-white/5 overflow-hidden">
        <div className="px-8 py-12 text-center space-y-6 border-b border-white/5">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-3xl font-extrabold font-headline text-white">{title}</h1>
            <p className="text-gray-400 font-body">{description}</p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="bg-[#0a0a0a] rounded-2xl border border-dashed border-white/10 p-12 text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-gray-600">construction</span>
            <div className="space-y-2">
              <p className="text-white font-bold font-headline">Ferramenta em integração</p>
              <p className="text-sm text-gray-500 font-body max-w-md mx-auto">
                O componente interativo será carregado a partir do arquivo{" "}
                <code className="text-primary text-xs bg-white/5 px-2 py-1 rounded">{sourceFile}</code>
              </p>
            </div>
          </div>
        </div>

        {product && (
          <div className="px-8 py-6 bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400">Adquira o acesso completo por</p>
              <p className="text-2xl font-extrabold font-headline text-white">
                {formatPrice(product.price)}
              </p>
            </div>
            <a
              href={getPurchaseUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(95,139,255,0.4)] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Comprar via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
