import { Link } from "react-router-dom";
import { Product, formatPrice, typeLabels } from "../../data/products";

interface Props {
  product: Product;
  onSelect: (p: Product) => void;
}

export function ProductCard({ product, onSelect }: Props) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <article
      className="card overflow-hidden group hover:bg-white/[0.03] transition-all cursor-pointer flex flex-col"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-surface-high via-[#1a2a4a] to-background flex items-center justify-center">
        <span className="text-5xl opacity-30">
          {product.type === "pdf" ? "📘" : product.type === "bundle" ? "📦" : "⚡"}
        </span>
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-[#002468] rounded-full text-[10px] font-bold uppercase">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-accent text-black rounded-full text-[10px] font-bold">
            -{discount}%
          </span>
        )}
        <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-xs text-muted rounded-lg uppercase">
          {typeLabels[product.type]}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-widest text-muted mb-1">{product.category}</span>
        <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted mt-2 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/5">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-muted line-through block">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="text-2xl font-display font-bold">{formatPrice(product.price)}</span>
          </div>
          <div className="flex gap-2">
            {product.previewPath && (
              <Link
                to={product.previewPath}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/5 rounded-xl hover:bg-white/10 text-muted hover:text-white"
              >
                👁
              </Link>
            )}
            <button className="p-2 bg-primary/20 text-primary rounded-xl group-hover:bg-primary group-hover:text-[#002468]">
              🛒
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
