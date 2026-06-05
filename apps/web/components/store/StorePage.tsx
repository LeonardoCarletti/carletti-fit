"use client";

import { useMemo, useState } from "react";
import {
  Product,
  ProductCategory,
  allCategories,
  categoryLabels,
  formatPrice,
  getFeaturedProducts,
  getProductsByCategory,
} from "../../lib/products";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";

export function StorePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );
  const featuredProducts = useMemo(() => getFeaturedProducts(), []);
  const lowestPrice = useMemo(
    () => Math.min(...filteredProducts.map((p) => p.price)),
    [filteredProducts]
  );

  return (
    <>
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden mb-10 border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a4a] via-[#131313] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative px-8 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-primary text-sm">store</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Carletti Fit Store
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-white">
              Performance que você{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                leva pra casa
              </span>
            </h1>
            <p className="text-gray-400 font-body text-lg">
              Programas de treino, consultoria e materiais digitais criados com a mesma precisão
              da plataforma Carletti Fit.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-extrabold font-headline text-white">{filteredProducts.length}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                Produtos
              </p>
            </div>
            <div className="w-[1px] bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-extrabold font-headline text-emerald-400">
                {formatPrice(lowestPrice)}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                A partir de
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <div className="bg-[#131313] p-4 rounded-2xl flex flex-wrap items-center gap-3 mb-8 border border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-2">
          Categoria:
        </span>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold font-headline transition-all ${
              activeCategory === cat
                ? "bg-primary text-[#002468]"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {cat === "todos" ? "Todos" : categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Featured */}
      {activeCategory === "todos" && featuredProducts.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-amber-400">star</span>
            <h2 className="text-xl font-bold font-headline text-white">Destaques</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-tr from-[#5f8bff]/10 to-emerald-500/5 p-1 rounded-2xl"
              >
                <ProductCard product={product} onSelect={setSelectedProduct} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Product grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-headline text-white">
            {activeCategory === "todos" ? "Todos os produtos" : categoryLabels[activeCategory]}
          </h2>
          <span className="text-sm text-gray-500 font-body">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "itens"}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="mt-12 bg-[#131313] rounded-2xl p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-emerald-500">verified</span>
          </div>
          <div>
            <p className="font-bold font-headline text-white">Garantia Carletti Fit</p>
            <p className="text-sm text-gray-400 font-body">
              Metodologia validada por coaches de elite. Suporte dedicado em todos os produtos.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-2xl font-extrabold font-headline text-white">500+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Alunos</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold font-headline text-white">4.9</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Avaliação</p>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
