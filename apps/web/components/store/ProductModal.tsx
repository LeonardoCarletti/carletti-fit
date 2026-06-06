"use client";

import Link from "next/link";
import { Product, formatPrice, getBundleProducts, getPurchaseUrl, typeLabels } from "../../lib/products";
import { ProductImage } from "./ProductImage";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const bundleProducts = getBundleProducts(product);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#131313] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <ProductImage
            src={product.image}
            alt={product.name}
            category={product.category}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-xl hover:bg-black/80 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-[#002468] rounded-full text-[10px] font-bold uppercase tracking-widest">
              {product.badge}
            </span>
          )}
        </div>

        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {product.category}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {typeLabels[product.type]}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold font-headline text-white mt-1">
              {product.name}
            </h2>
          </div>

          <p className="text-gray-400 font-body leading-relaxed">{product.description}</p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {product.type === "bundle" ? "O pacote inclui" : "O que está incluso"}
            </h4>
            <ul className="space-y-2">
              {product.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {bundleProducts.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              {bundleProducts.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="material-symbols-outlined text-primary text-lg">inventory_2</span>
                  {item.name}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
            <div>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through block">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
              <span className="text-4xl font-extrabold font-headline text-white">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {product.previewPath && (
                <Link
                  href={product.previewPath}
                  className="px-6 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">visibility</span>
                  Ver demo
                </Link>
              )}
              <a
                href={getPurchaseUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(95,139,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">chat</span>
                Comprar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
