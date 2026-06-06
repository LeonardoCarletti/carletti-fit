export interface BrandItem {
  name: string;
  verdict: "recomendado" | "moderado" | "evitar";
  reason: string;
  tip?: string;
}

export interface BrandCategory {
  id: string;
  name: string;
  icon: string;
  items: BrandItem[];
}

export const brandCategories: BrandCategory[] = [
  {
    id: "iogurtes",
    name: "Iogurtes",
    icon: "🥛",
    items: [
      { name: "Nestlé Naturalis (natural)", verdict: "recomendado", reason: "Sem adição de açúcar, proteína adequada.", tip: "Prefira versão natural sem sabores." },
      { name: "Danone Grego tradicional", verdict: "recomendado", reason: "Alta proteína, baixo carboidrato.", tip: "Verifique se não tem mel adicionado." },
      { name: "Iogurte com pedaços de fruta", verdict: "evitar", reason: "Alto teor de açúcar adicionado e IG elevado." },
      { name: "Activia com cereais", verdict: "moderado", reason: "Probiótico ok, mas açúcar e cereais aumentam CG." },
    ],
  },
  {
    id: "paes",
    name: "Pães",
    icon: "🍞",
    items: [
      { name: "Pão integral com grãos", verdict: "recomendado", reason: "Fibras reduzem IG efetivo.", tip: "Leia o rótulo: primeiro ingrediente deve ser farinha integral." },
      { name: "Pão francês tradicional", verdict: "moderado", reason: "IG alto (81), mas porção pequena pode ser controlada." },
      { name: "Pão de forma branco", verdict: "evitar", reason: "Farinha refinada + açúcar. IG muito alto." },
      { name: "Pão 100% integral (sem açúcar)", verdict: "recomendado", reason: "Melhor opção para controle glicêmico." },
    ],
  },
  {
    id: "cereais",
    name: "Cereais matinais",
    icon: "🥣",
    items: [
      { name: "Aveia em flocos (Quaker ou similar)", verdict: "recomendado", reason: "Beta-glucana ajuda no controle glicêmico." },
      { name: "Granola tradicional", verdict: "evitar", reason: "Mel, açúcar e gordura saturada em excesso." },
      { name: "Corn Flakes", verdict: "evitar", reason: "IG 81, praticamente açúcar puro refinado." },
      { name: "Granola sem açúcar (marcas artesanais)", verdict: "moderado", reason: "Melhor que industrial, mas verifique porções." },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    icon: "🥤",
    items: [
      { name: "Água com gás", verdict: "recomendado", reason: "Zero impacto glicêmico." },
      { name: "Suco de caixinha 100%", verdict: "moderado", reason: "Sem açúcar adicionado, mas frutose concentrada." },
      { name: "Refrigerante zero", verdict: "moderado", reason: "Zero glicemia, mas adoçantes — consumo moderado." },
      { name: "Suco de laranja industrial", verdict: "evitar", reason: "Açúcar adicionado + IG alto." },
    ],
  },
  {
    id: "barras",
    name: "Barras de proteína",
    icon: "💪",
    items: [
      { name: "Barra com <5g açúcar e >15g proteína", verdict: "recomendado", reason: "Boa relação proteína/carboidrato.", tip: "Leia sempre os 5 primeiros ingredientes." },
      { name: "Barra coberta com chocolate", verdict: "moderado", reason: "Proteína ok, mas açúcar e gordura elevados." },
      { name: "Barra de cereal tradicional", verdict: "evitar", reason: "Marketing de saúde, mas é basicamente doce." },
    ],
  },
];

export const verdictStyles = {
  recomendado: { label: "Recomendado", bg: "bg-accent/10", text: "text-accent", border: "border-accent/30" },
  moderado: { label: "Moderado", bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  evitar: { label: "Evitar", bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
};
