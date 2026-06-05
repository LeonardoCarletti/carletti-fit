"use client";

import { Product, formatPrice, getPurchaseUrl } from "../../lib/products";
import { ProductImage } from "./ProductImage";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

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
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {product.category}
            </span>
            <h2 className="text-3xl font-extrabold font-headline text-white mt-1">
              {product.name}
            </h2>
          </div>

          <p className="text-gray-400 font-body leading-relaxed">{product.description}</p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              O que está incluso
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
            <a
              href={getPurchaseUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(95,139,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Comprar via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
