"use client";

import { useState } from "react";

const categoryIcons: Record<string, string> = {
  guias: "menu_book",
  ferramentas: "calculate",
  ebooks: "auto_stories",
};

interface ProductImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
}

export function ProductImage({ src, alt, category, className = "" }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-[#1c1c1c] via-[#252525] to-[#1a2a4a] flex items-center justify-center ${className}`}
      >
        <span className="material-symbols-outlined text-5xl text-primary/40">
          {categoryIcons[category] || "shopping_bag"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
