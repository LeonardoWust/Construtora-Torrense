export interface Empreendimento {
  id: string;
  nome: string;
  status: "na-planta" | "em-construcao" | "pronto";
  cidade: string;
  metragem: string;
  dormitorios: string;
  vagas: string;
  andares: string;
  unidades: string;
  descricao: string;
  diferenciais: string[];
  galeria: { src: string; alt: string }[];
  whatsapp: string;
  whatsappMsg: string;
  destaque: boolean;
}

export const EMPREENDIMENTOS: Empreendimento[] = [
  {
    id: "residencial-vila-nova",
    nome: "Residencial Vila Nova",
    status: "na-planta",
    cidade: "Sorocaba, SP",
    metragem: "70 a 100 m²",
    dormitorios: "2 e 3 dorm.",
    vagas: "1 a 2 vagas",
    andares: "14 andares",
    unidades: "96 unidades",
    descricao: "O Residencial Vila Nova une design contemporâneo e funcionalidade em uma localização privilegiada de Sorocaba. Apartamentos projetados para oferecer o máximo de conforto e bem-estar, com acabamentos de alto padrão e áreas de convivência completas.",
    diferenciais: ["Piscina adulto e infantil", "Academia equipada", "Salão de festas gourmet", "Espaço kids", "Playground", "Portaria 24h"],
    galeria: [
      { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", alt: "Fachada" },
      { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", alt: "Área de lazer" },
      { src: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&q=80", alt: "Sala de estar" },
    ],
    whatsapp: "5515999999999",
    whatsappMsg: "Olá! Tenho interesse no Residencial Vila Nova. Pode me enviar mais informações?",
    destaque: true,
  },
  {
    id: "jardim-sorocaba",
    nome: "Jardim Sorocaba",
    status: "em-construcao",
    cidade: "Sorocaba, SP",
    metragem: "80 a 120 m²",
    dormitorios: "3 dorm. (1 suíte)",
    vagas: "2 vagas",
    andares: "10 andares",
    unidades: "60 unidades",
    descricao: "O Jardim Sorocaba é um empreendimento de médio padrão com projeto arquitetônico diferenciado e áreas comuns completas. Localizado em bairro nobre, oferece fácil acesso a comércio, escolas e serviços de saúde.",
    diferenciais: ["Piscina coberta e descoberta", "Espaço gourmet", "Brinquedoteca", "Salão de festas", "Quadra poliesportiva", "Pet place"],
    galeria: [
      { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80", alt: "Fachada" },
      { src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80", alt: "Piscina" },
    ],
    whatsapp: "5515999999999",
    whatsappMsg: "Olá! Tenho interesse no Jardim Sorocaba. Pode me enviar mais informações?",
    destaque: true,
  },
  {
    id: "alto-das-torres",
    nome: "Alto das Torres",
    status: "pronto",
    cidade: "Itu, SP",
    metragem: "90 a 140 m²",
    dormitorios: "3 e 4 dorm.",
    vagas: "2 a 3 vagas",
    andares: "16 andares",
    unidades: "80 unidades",
    descricao: "O Alto das Torres é um empreendimento completo, pronto para morar, com toda infraestrutura de lazer e segurança que sua família merece. Apartamentos espaçosos com vista privilegiada e acabamentos sofisticados.",
    diferenciais: ["Vista panorâmica", "Spa completo", "Sala de cinema", "Coworking", "Academia 24h", "Concierge"],
    galeria: [
      { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", alt: "Fachada" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Vista" },
      { src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", alt: "Apartamento" },
    ],
    whatsapp: "5515999999999",
    whatsappMsg: "Olá! Tenho interesse no Alto das Torres. Pode me enviar mais informações?",
    destaque: true,
  },
];

export const STATUS_LABEL: Record<string, string> = {
  "na-planta": "Na Planta",
  "em-construcao": "Em Construção",
  "pronto": "Pronto",
};

export const STATUS_CLASS: Record<string, string> = {
  "na-planta": "status--na-planta",
  "em-construcao": "status--em-construcao",
  "pronto": "status--pronto",
};
