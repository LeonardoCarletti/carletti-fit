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
  featured: boolean;
  badge?: string;
  previewPath?: string;
  bundleItems?: string[];
}

export const WHATSAPP_NUMBER = "5511999999999";

export const products: Product[] = [
  {
    id: "guia-nutricional",
    name: "Guia Nutricional Carletti Fit",
    slug: "guia-nutricional",
    category: "guias",
    type: "pdf",
    price: 97,
    originalPrice: 147,
    description:
      "Guia nutricional completo com estratégias práticas para hipertrofia, emagrecimento e controle glicêmico. Metodologia validada para diabéticos e atletas.",
    highlights: [
      "PDF completo para download",
      "Macros, timing e protocolos",
      "Estratégias para DM tipo 1 e 2",
      "Acesso vitalício",
    ],
    featured: true,
    badge: "Mais vendido",
  },
  {
    id: "calculadora-carga-glicemica",
    name: "Calculadora de Carga Glicêmica",
    slug: "calculadora-carga-glicemica",
    category: "ferramentas",
    type: "interactive",
    price: 47,
    description:
      "Ferramenta interativa para calcular a carga glicêmica dos alimentos. Decisões inteligentes sobre carboidratos com dados reais.",
    highlights: [
      "Calculadora interativa",
      "Base de alimentos com IG",
      "Resultado instantâneo",
      "Ideal para diabéticos",
    ],
    previewPath: "/loja/ferramentas/calculadora-carga-glicemica",
    featured: true,
    badge: "Ferramenta",
  },
  {
    id: "guia-marcas-expandido",
    name: "Guia de Marcas no Supermercado",
    slug: "guia-marcas-expandido",
    category: "ebooks",
    type: "interactive",
    price: 67,
    description:
      "Guia interativo para escolher as melhores marcas no supermercado. Compare produtos e entenda rótulos sem cair em marketing enganoso.",
    highlights: [
      "Comparativo de marcas brasileiras",
      "Leitura de rótulos",
      "Categorias por corredor",
      "Atualizado 2025",
    ],
    previewPath: "/loja/ferramentas/guia-marcas-expandido",
    featured: true,
    badge: "Novo",
  },
  {
    id: "top-10-enganos",
    name: "Top 10 Enganos Alimentares",
    slug: "top-10-enganos",
    category: "ebooks",
    type: "interactive",
    price: 37,
    description:
      "Os 10 maiores mitos sobre alimentação desmistificados com ciência. Sem papo de influencer.",
    highlights: [
      "10 mitos com referências",
      "Conteúdo visual interativo",
      "Aplicável no dia a dia",
      "Leitura rápida",
    ],
    previewPath: "/loja/ferramentas/top-10-enganos",
    featured: false,
  },
  {
    id: "pack-nutricao-completo",
    name: "Pack Nutrição Completo",
    slug: "pack-nutricao-completo",
    category: "guias",
    type: "bundle",
    price: 197,
    originalPrice: 248,
    description:
      "Pacote com Guia Nutricional + Calculadora CG + Guia de Marcas + Top 10 Enganos. Tudo para dominar sua nutrição.",
    highlights: [
      "Guia Nutricional PDF",
      "Calculadora de Carga Glicêmica",
      "Guia de Marcas Expandido",
      "Top 10 Enganos Alimentares",
      "20% de economia",
    ],
    bundleItems: [
      "guia-nutricional",
      "calculadora-carga-glicemica",
      "guia-marcas-expandido",
      "top-10-enganos",
    ],
    featured: true,
    badge: "Melhor custo",
  },
];

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

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getPurchaseUrl(product: Product) {
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${product.name} (${formatPrice(product.price)}). Gostaria de mais informações.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function getConsultoriaUrl() {
  const msg = encodeURIComponent(
    "Olá! Vim pelo site diabeticoimortal.fit e gostaria de saber mais sobre a consultoria Carletti Fit."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}
