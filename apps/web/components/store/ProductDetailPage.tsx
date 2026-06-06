"use client";

import Link from "next/link";
import {
  Product,
  formatPrice,
  getBundleProducts,
  getPurchaseUrl,
  typeLabels,
} from "../../lib/products";
import { ProductImage } from "./ProductImage";

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const bundleProducts = getBundleProducts(product);

  return (
    <div className="space-y-8">
      <Link
        href="/loja"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Voltar à loja
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-[#002468] rounded-full text-[10px] font-bold uppercase tracking-widest">
              {product.badge}
            </span>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {product.category}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {typeLabels[product.type]}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold font-headline text-white tracking-tight">
              {product.name}
            </h1>
          </div>

          <p className="text-gray-400 font-body text-lg leading-relaxed">{product.description}</p>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {product.type === "bundle" ? "O pacote inclui" : "O que está incluso"}
            </h3>
            <ul className="space-y-2">
              {product.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {bundleProducts.length > 0 && (
            <div className="bg-[#131313] rounded-2xl p-5 border border-white/5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Produtos do pacote
              </h4>
              {bundleProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/loja/${item.slug}`}
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">inventory_2</span>
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <div className="pt-6 border-t border-white/5 space-y-4">
            <div>
              {hasDiscount && (
                <span className="text-lg text-gray-500 line-through block">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
              <span className="text-5xl font-extrabold font-headline text-white">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getPurchaseUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(95,139,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">chat</span>
                Comprar via WhatsApp
              </a>
              {product.previewPath && (
                <Link
                  href={product.previewPath}
                  className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">visibility</span>
                  Ver demonstração
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
