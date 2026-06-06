"use client";

import Link from "next/link";
import { Product, formatPrice, typeLabels } from "../../lib/products";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <article
      className="bg-[#131313] rounded-2xl overflow-hidden border border-white/5 group hover:bg-white/[0.03] transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-[#002468] rounded-full text-[10px] font-bold uppercase tracking-widest">
            {product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-emerald-500/90 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
            -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
          </span>
        )}
        <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-gray-300 rounded-lg text-[10px] font-bold uppercase tracking-widest">
          {typeLabels[product.type]}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
          {product.category}
        </span>
        <h3 className="text-lg font-bold font-headline text-white mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 font-body line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
          <div>
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through block">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
            <span className="text-2xl font-extrabold font-headline text-white">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex gap-2">
            {product.previewPath && (
              <Link
                href={product.previewPath}
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition-all"
                title="Ver demonstração"
              >
                <span className="material-symbols-outlined text-lg">visibility</span>
              </Link>
            )}
            <button
              className="p-2.5 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
            >
              <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
