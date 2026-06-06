import { useState } from "react";
import { Link } from "react-router-dom";
import { brandCategories, verdictStyles } from "../../data/brands";
import { getProductBySlug, getPurchaseUrl, formatPrice } from "../../data/products";

export function GuiaMarcas() {
  const [active, setActive] = useState(brandCategories[0].id);
  const product = getProductBySlug("guia-marcas-expandido");
  const category = brandCategories.find((c) => c.id === active)!;

  return (
    <main className="pt-24 px-6 pb-16 max-w-4xl mx-auto">
      <Link to="/loja" className="text-sm text-muted hover:text-white mb-6 inline-block">← Voltar à loja</Link>

      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Guia Interativo</span>
          <h1 className="font-display text-3xl font-bold mt-2">Marcas no Supermercado</h1>
          <p className="text-muted mt-2">Compare produtos e escolha com inteligência, não com marketing.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {brandCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                active === cat.id ? "bg-primary text-[#002468]" : "bg-white/5 text-muted hover:text-white"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {category.items.map((item) => {
            const style = verdictStyles[item.verdict];
            return (
              <div key={item.name} className={`card p-5 border ${style.border}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold">{item.name}</h3>
                    <p className="text-sm text-muted">{item.reason}</p>
                    {item.tip && (
                      <p className="text-xs text-primary">💡 {item.tip}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {product && (
          <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Guia completo com todas as categorias</p>
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
