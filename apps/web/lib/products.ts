import productsData from "../data/products.json";

export type ProductCategory = "guias" | "ferramentas" | "ebooks" | "todos";
export type ProductType = "pdf" | "interactive" | "bundle";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Exclude<ProductCategory, "todos">;
  type: ProductType;
  price: number;
  originalPrice?: number;
  description: string;
  highlights: string[];
  image: string;
  featured: boolean;
  badge?: string;
  assetPath?: string;
  previewPath?: string;
  bundleItems?: string[];
}

export const products: Product[] = productsData as Product[];

export const categoryLabels: Record<Exclude<ProductCategory, "todos">, string> = {
  guias: "Guias",
  ferramentas: "Ferramentas",
  ebooks: "E-books",
};

export const typeLabels: Record<ProductType, string> = {
  pdf: "PDF",
  interactive: "Interativo",
  bundle: "Pacote",
};

export const allCategories: ProductCategory[] = ["todos", "guias", "ferramentas", "ebooks"];

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  if (category === "todos") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBundleProducts(product: Product): Product[] {
  if (!product.bundleItems) return [];
  return product.bundleItems
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

export const WHATSAPP_NUMBER = "5511999999999";

export function getPurchaseUrl(product: Product): string {
  const message = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${product.name} (${formatPrice(product.price)}). Gostaria de mais informações.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
