import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Product,
  ProductCategory,
  categoryLabels,
  formatPrice,
  products,
} from "../data/products";
import { ProductCard } from "../components/store/ProductCard";
import { ProductModal } from "../components/store/ProductModal";

const categories: ProductCategory[] = ["todos", "guias", "ferramentas", "ebooks"];

export function Store() {
  const [cat, setCat] = useState<ProductCategory>("todos");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (cat === "todos" ? products : products.filter((p) => p.category === cat)),
    [cat]
  );
  const featured = useMemo(() => products.filter((p) => p.featured), []);
  const minPrice = Math.min(...products.map((p) => p.price));

  return (
    <main className="pt-24 px-6 pb-16 max-w-7xl mx-auto">
      <div className="card p-8 md:p-12 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Carletti Fit Store</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Nutrição e ferramentas que{" "}
            <span className="text-gradient">funcionam</span>
          </h1>
          <p className="text-muted max-w-xl">
            Guias, calculadoras e e-books criados com a mesma precisão do protocolo Diabético Imortal.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-display font-bold">{products.length}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted">Produtos</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-accent">{formatPrice(minPrice)}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted">A partir de</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              cat === c ? "bg-primary text-[#002468]" : "text-muted hover:text-white bg-white/5"
            }`}
          >
            {c === "todos" ? "Todos" : categoryLabels[c]}
          </button>
        ))}
      </div>

      {cat === "todos" && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold mb-4">⭐ Destaques</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <div key={p.id} className="p-1 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/10">
                <ProductCard product={p} onSelect={setSelected} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-display text-xl font-bold mb-4">
          {cat === "todos" ? "Todos os produtos" : categoryLabels[cat]}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={setSelected} />
          ))}
        </div>
      </section>

      <div className="mt-12 card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-lg">Garantia Carletti Fit</p>
          <p className="text-sm text-muted">Metodologia validada. Suporte em todos os produtos.</p>
        </div>
        <Link to="/" className="btn-ghost text-sm">Voltar ao site</Link>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
