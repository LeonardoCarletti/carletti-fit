export interface Myth {
  number: number;
  myth: string;
  truth: string;
  source: string;
}

export const myths: Myth[] = [
  {
    number: 1,
    myth: "Carboidrato à noite engorda mais",
    truth: "O total calórico do dia importa mais que o horário. O que muda é a resposta glicêmica individual — diabéticos devem testar, não seguir regra genérica.",
    source: "ADA Standards of Care 2024",
  },
  {
    number: 2,
    myth: "Frutose é saudável porque vem da fruta",
    truth: "Frutose em excesso (sucos, mel, agave) sobrecarrega o fígado e pode piorar resistência insulínica, mesmo em diabéticos.",
    source: "Journal of Hepatology, 2023",
  },
  {
    number: 3,
    myth: "Adoçante zero sempre é melhor",
    truth: "Adoçantes não elevam glicemia, mas podem alterar microbiota intestinal e aumentar desejo por doces. Moderação é chave.",
    source: "Nature Medicine, 2022",
  },
  {
    number: 4,
    myth: "Integrais são sempre de baixo IG",
    truth: "Pão integral industrializado muitas vezes tem IG similar ao branco. Verifique fibras (>3g/porção) e açúcar no rótulo.",
    source: "Tabela IG Sydney University",
  },
  {
    number: 5,
    myth: "Diabético não pode comer banana",
    truth: "Banana verde tem IG ~30; madura ~51. A porção e o contexto (com proteína/gordura) mudam a resposta glicêmica real.",
    source: "International Tables of GI",
  },
  {
    number: 6,
    myth: "Cinamomo cura diabetes",
    truth: "Canela pode ter leve efeito na sensibilidade à insulina, mas não substitui medicação nem muda o tratamento.",
    source: "Cochrane Review, 2023",
  },
  {
    number: 7,
    myth: "Jejum intermitente é obrigatório para emagrecer",
    truth: "Funciona para alguns, mas diabéticos em insulina precisam de protocolo médico. Hipoglicemia é risco real.",
    source: "ADA Position Statement",
  },
  {
    number: 8,
    myth: "Gordura não afeta glicemia",
    truth: "Gordura retarda absorção de carboidrato, causando pico tardio (efeito pizza). CGM mostra isso claramente.",
    source: "Diabetes Care, 2021",
  },
  {
    number: 9,
    myth: "Produto 'zero açúcar' é livre",
    truth: "Maltitol e outros polióis em 'zero' podem elevar glicemia e causar desconforto gastrointestinal.",
    source: "FDA Sugar Alcohol Guide",
  },
  {
    number: 10,
    myth: "Suplemento substitui alimentação",
    truth: "Whey, creatina e vitaminas complementam — nunca substituem proteína real, fibras e micronutrientes da comida.",
    source: "ISSN Position Stand",
  },
];
