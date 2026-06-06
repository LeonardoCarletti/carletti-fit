import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { calcCargaGlicemica, classifyCG, foods } from "../../data/foods";
import { getProductBySlug, getPurchaseUrl, formatPrice } from "../../data/products";

export function CalculadoraCargaGlicemica() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(foods[0]);
  const [grams, setGrams] = useState(100);
  const product = getProductBySlug("calculadora-carga-glicemica");

  const filtered = useMemo(
    () => foods.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const cg = calcCargaGlicemica(selected.ig, grams);
  const classification = classifyCG(cg);

  return (
    <main className="pt-24 px-6 pb-16 max-w-3xl mx-auto">
      <Link to="/loja" className="text-sm text-muted hover:text-white mb-6 inline-block">← Voltar à loja</Link>

      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Ferramenta</span>
          <h1 className="font-display text-3xl font-bold mt-2">Calculadora de Carga Glicêmica</h1>
          <p className="text-muted mt-2">CG = (IG × gramas de carboidrato) ÷ 100</p>
        </div>

        <div className="card p-6 space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-bold">Buscar alimento</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: arroz, banana, pão..."
              className="w-full mt-2 px-4 py-3 bg-background border border-white/10 rounded-xl text-white outline-none focus:border-primary"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1">
            {filtered.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelected(f)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  selected.name === f.name ? "bg-primary/20 text-primary" : "hover:bg-white/5 text-muted"
                }`}
              >
                {f.name} <span className="text-xs opacity-60">IG {f.ig}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-bold">
              Porção (gramas de carboidrato disponível)
            </label>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="range"
                min={10}
                max={300}
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <input
                type="number"
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-background border border-white/10 rounded-lg text-center"
              />
              <span className="text-sm text-muted">g</span>
            </div>
          </div>
        </div>

        <div className="card p-8 text-center space-y-4 bg-gradient-to-br from-primary/10 to-accent/5">
          <p className="text-sm text-muted">{selected.name}</p>
          <p className="font-display text-6xl font-bold">{cg.toFixed(1)}</p>
          <p className="text-sm text-muted">Carga Glicêmica</p>
          <div className={`inline-block px-4 py-2 rounded-full font-bold ${classification.color} bg-white/5`}>
            {classification.label} — {classification.desc}
          </div>
          <p className="text-xs text-muted font-mono">IG {selected.ig} × {grams}g ÷ 100 = {cg.toFixed(1)}</p>
        </div>

        {product && (
          <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Acesso completo com base expandida</p>
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
