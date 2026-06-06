import { Link } from "react-router-dom";
import { Product, formatPrice, getPurchaseUrl, typeLabels } from "../../data/products";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="card w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-primary">{typeLabels[product.type]}</span>
              <h2 className="font-display text-2xl font-bold mt-1">{product.name}</h2>
            </div>
            <button onClick={onClose} className="text-muted hover:text-white text-xl">✕</button>
          </div>
          <p className="text-muted text-sm leading-relaxed">{product.description}</p>
          <ul className="space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm">
                <span className="text-accent">✓</span> {h}
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <span className="text-3xl font-display font-bold">{formatPrice(product.price)}</span>
            <div className="flex gap-2 w-full sm:w-auto">
              {product.previewPath && (
                <Link to={product.previewPath} className="btn-ghost text-sm flex-1 text-center">Demo</Link>
              )}
              <a href={getPurchaseUrl(product)} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm flex-1 text-center">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
