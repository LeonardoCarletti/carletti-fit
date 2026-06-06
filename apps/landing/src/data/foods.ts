export interface Food {
  name: string;
  ig: number;
  category: string;
}

export const foods: Food[] = [
  { name: "Arroz branco cozido", ig: 73, category: "Carboidratos" },
  { name: "Arroz integral cozido", ig: 55, category: "Carboidratos" },
  { name: "Batata inglesa cozida", ig: 78, category: "Carboidratos" },
  { name: "Batata-doce cozida", ig: 46, category: "Carboidratos" },
  { name: "Pão francês", ig: 81, category: "Carboidratos" },
  { name: "Pão integral", ig: 50, category: "Carboidratos" },
  { name: "Aveia em flocos", ig: 55, category: "Carboidratos" },
  { name: "Macarrão cozido", ig: 49, category: "Carboidratos" },
  { name: "Tapioca", ig: 94, category: "Carboidratos" },
  { name: "Feijão carioca cozido", ig: 33, category: "Leguminosas" },
  { name: "Lentilha cozida", ig: 32, category: "Leguminosas" },
  { name: "Banana prata madura", ig: 51, category: "Frutas" },
  { name: "Maçã com casca", ig: 38, category: "Frutas" },
  { name: "Uva", ig: 59, category: "Frutas" },
  { name: "Manga madura", ig: 51, category: "Frutas" },
  { name: "Melancia", ig: 72, category: "Frutas" },
  { name: "Morango", ig: 40, category: "Frutas" },
  { name: "Suco de laranja natural", ig: 50, category: "Bebidas" },
  { name: "Refrigerante cola", ig: 63, category: "Bebidas" },
  { name: "Leite desnatado", ig: 32, category: "Laticínios" },
  { name: "Iogurte natural", ig: 35, category: "Laticínios" },
  { name: "Chocolate ao leite", ig: 49, category: "Doces" },
  { name: "Mel", ig: 58, category: "Doces" },
  { name: "Pipoca (sem manteiga)", ig: 55, category: "Snacks" },
  { name: "Biscoito água e sal", ig: 72, category: "Snacks" },
];

export function calcCargaGlicemica(ig: number, grams: number) {
  return (ig * grams) / 100;
}

export function classifyCG(cg: number) {
  if (cg <= 10) return { label: "Baixa", color: "text-accent", desc: "Impacto glicêmico mínimo" };
  if (cg <= 20) return { label: "Média", color: "text-yellow-400", desc: "Impacto moderado — atenção à dose" };
  return { label: "Alta", color: "text-red-400", desc: "Impacto significativo — cuidado com diabéticos" };
}
