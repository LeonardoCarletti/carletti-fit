import { useState } from "react";
import { Link } from "react-router-dom";
import { myths } from "../../data/myths";
import { getProductBySlug, getPurchaseUrl, formatPrice } from "../../data/products";

export function Top10Enganos() {
  const [open, setOpen] = useState<number | null>(1);
  const product = getProductBySlug("top-10-enganos");

  return (
    <main className="pt-24 px-6 pb-16 max-w-3xl mx-auto">
      <Link to="/loja" className="text-sm text-muted hover:text-white mb-6 inline-block">← Voltar à loja</Link>

      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-bold">E-book Interativo</span>
          <h1 className="font-display text-3xl font-bold mt-2">Top 10 Enganos Alimentares</h1>
          <p className="text-muted mt-2">Mitos desmistificados com ciência. Clique para revelar a verdade.</p>
        </div>

        <div className="space-y-3">
          {myths.map((m) => (
            <div key={m.number} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === m.number ? null : m.number)}
                className="w-full p-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-primary text-sm w-8">#{String(m.number).padStart(2, "0")}</span>
                  <span className="font-display font-bold text-sm md:text-base">{m.myth}</span>
                </div>
                <span className="text-muted text-xl">{open === m.number ? "−" : "+"}</span>
              </button>
              {open === m.number && (
                <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-accent text-lg">✓</span>
                    <p className="text-sm text-white leading-relaxed">{m.truth}</p>
                  </div>
                  <p className="text-xs text-muted font-mono pl-7">Ref: {m.source}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {product && (
          <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Versão completa com referências expandidas</p>
              <p className="text-xl font-display font-bold">{formatPrice(product.price)}</p>
            </div>
            <a href={getPurchaseUrl(product)} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              Comprar via WhatsApp
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
