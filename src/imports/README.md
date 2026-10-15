# Torrense — Site Institucional

Site estático da **Torrense Construtora e Incorporadora**.  
HTML + CSS + JavaScript puro. Sem dependências, sem backend, sem build step.

---

## 📁 Estrutura de Arquivos

```
site-construtora-real/
│
├── index.html                  ← Home
├── empreendimentos.html        ← Lista de empreendimentos (com filtros)
├── empreendimento.html         ← Página individual (template reutilizável, carrega via ?id=)
├── quem-somos.html             ← Sobre a empresa
├── contato.html                ← Contato via WhatsApp
│
├── data/
│   └── empreendimentos.js      ← ⭐ EDITE AQUI para adicionar/remover empreendimentos
│
├── assets/
│   ├── css/
│   │   └── style.css           ← Stylesheet global (design system completo)
│   ├── js/
│   │   └── app.js              ← JS compartilhado (nav, lightbox, helpers, WA float)
│   └── img/
│       ├── placeholder-hero.svg
│       ├── placeholder-800x500.svg
│       └── placeholder-institucional.svg
│
└── README.md
```

---

## ✏️ Como Atualizar o Conteúdo

### Adicionar um Novo Empreendimento

Abra `data/empreendimentos.js` e adicione um novo objeto ao array `EMPREENDIMENTOS`:

```js
{
  id: "nome-unico-sem-espacos",      // usado na URL: empreendimento.html?id=nome-unico-sem-espacos
  nome: "Nome do Empreendimento",
  status: "na-planta",               // "na-planta" | "em-construcao" | "pronto"
  cidade: "Sorocaba, SP",
  metragem: "70 a 100 m²",
  dormitorios: "2 e 3 dorm.",
  vagas: "1 a 2 vagas",
  andares: "12 andares",
  unidades: "80 unidades",
  descricao: "Descrição longa do empreendimento...",
  diferenciais: [
    "Piscina",
    "Academia",
    "Salão de festas",
  ],
  galeria: [
    { src: "assets/img/nome-do-empreendimento-1.jpg", alt: "Fachada" },
    { src: "assets/img/nome-do-empreendimento-2.jpg", alt: "Área de lazer" },
  ],
  whatsapp: "5515999999999",         // DDI + DDD + número (sem espaços/símbolos)
  whatsappMsg: "Olá! Tenho interesse no [Nome]. Pode me enviar mais informações?",
  destaque: true,                    // true = aparece na Home; false = só na lista
},
```

### Adicionar Imagens

1. Coloque os arquivos em `assets/img/`
2. Use os mesmos nomes no campo `galeria` do empreendimento
3. Formatos recomendados: `.jpg` ou `.webp`; resolução: **800×500px** (cards) e **1600×900px** (galeria interna)

### Alterar Número de WhatsApp

Busque e substitua `5515999999999` nos arquivos:
- `data/empreendimentos.js` (campo `whatsapp` de cada empreendimento)
- `index.html`, `empreendimentos.html`, `empreendimento.html`, `quem-somos.html`, `contato.html`
- `assets/js/app.js` (linha `renderWaFloat('5515999999999')`)

### Alterar Textos Institucionais

| Conteúdo | Arquivo |
|---|---|
| Tagline do hero | `index.html` — seção `.hero__content` |
| Texto "Quem Somos" (home) | `index.html` — seção `.about-snippet` |
| Texto completo da empresa | `quem-somos.html` |
| Linha do tempo | `quem-somos.html` — `.timeline` |
| Estatísticas (15 anos, 40 empr…) | `index.html` e `quem-somos.html` — atributo `data-count` |

### Alterar Telefone / E-mail no Footer

Busque `9 9999-9999` e `contato@torrense.com.br` em todos os arquivos `.html`.

---

## 🌐 Como Abrir Localmente

Abra diretamente no navegador — funciona sem servidor:

```
Clique duplo em index.html
```

> **Nota:** se as fontes do Google não carregarem offline, os textos exibem fontes fallback (Georgia/Arial). Para desenvolvimento offline, copie as fontes localmente.

### Opção com servidor local (recomendado para evitar quirks de `file://`)

Se tiver Python instalado:
```bash
python -m http.server 8080
# Acesse: http://localhost:8080
```

Se tiver Node.js:
```bash
npx serve .
```

---

## 🚀 Como Publicar

O site é 100% estático — basta copiar os arquivos para qualquer hospedagem:

| Plataforma | Como fazer |
|---|---|
| **Netlify** (recomendado) | Arraste a pasta para [netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Push para um repo público → Settings → Pages → root |
| **Vercel** | `npx vercel` na pasta do projeto |
| **cPanel / FTP** | Upload de todos os arquivos para `public_html/` |

---

## 🎨 Paleta de Cores

| Variável CSS | Valor | Uso |
|---|---|---|
| `--clr-gold` | `#C9A84C` | Destaques, CTAs, hover states |
| `--clr-gold-light` | `#E2C46A` | Hover dos botões dourados |
| `--clr-black` | `#111111` | Textos principais |
| `--clr-dark` | `#1A1A1A` | Fundos escuros (nav, hero, footer) |
| `--clr-white` | `#FFFFFF` | Fundo dominante |
| `--clr-off-white` | `#F7F5F0` | Seções alternadas |

Para ajustar a paleta, edite as custom properties no topo de `assets/css/style.css`.

---

## 📦 Próximos Passos Sugeridos

- [ ] Substituir imagens placeholder por fotos reais
- [ ] Inserir o logo real no `<nav>` (adicionar `<img src="assets/img/logo.png">` dentro de `.nav__logo`)
- [ ] Configurar número de WhatsApp real
- [ ] Atualizar textos institucionais
- [ ] Adicionar dados reais de empreendimentos em `data/empreendimentos.js`
- [ ] Adicionar favicon (`<link rel="icon" href="assets/img/favicon.ico">`)
- [ ] Configurar domínio e hospedagem
- [ ] (Futuro) Adicionar Google Analytics ou Meta Pixel

