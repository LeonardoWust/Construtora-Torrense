import DecoDivider from "@/components/DecoDivider";
import { WHATSAPP_URL } from "@/data/empreendimentos";

export default function QuemSomos() {
  const values = [
    {
      icon: "◈",
      title: "Excelência",
      desc: "Cada detalhe é revisado com rigor técnico e artístico. Não entregamos apenas imóveis; entregamos obras que resistem ao tempo.",
    },
    {
      icon: "◉",
      title: "Integridade",
      desc: "Transparência em cada etapa. Nossos clientes acompanham o progresso das obras com relatórios mensais e canais diretos de comunicação.",
    },
    {
      icon: "◇",
      title: "Inovação",
      desc: "Incorporamos tecnologias construtivas de ponta, incluindo certificações ambientais e sistemas de automação residencial.",
    },
    {
      icon: "◎",
      title: "Legado",
      desc: "Construímos pensando nas próximas gerações. Cada empreendimento deve valorizar o bairro onde está inserido e perdurar por décadas.",
    },
  ];

  const timeline = [
    {
      year: "2005",
      title: "Fundação",
      desc: "A Torrense nasce em São Paulo com o propósito de criar empreendimentos de alto padrão que honrem a arquitetura da cidade.",
    },
    {
      year: "2008",
      title: "Primeiro Grande Projeto",
      desc: "Entrega do Edifício Torrense I em Higienópolis — 48 unidades com 100% de vendas antes do habite-se.",
    },
    {
      year: "2012",
      title: "Expansão",
      desc: "Abertura de novos canteiros em três bairros simultâneos. Equipe cresce para 200 colaboradores diretos.",
    },
    {
      year: "2017",
      title: "Reconhecimento",
      desc: "Prêmio AELO de Melhor Incorporadora do Ano pela excelência em gestão e qualidade construtiva.",
    },
    {
      year: "2021",
      title: "Sustentabilidade",
      desc: "Primeiro empreendimento da empresa com certificação AQUA-HQE e painéis fotovoltaicos nas áreas comuns.",
    },
    {
      year: "2024",
      title: "Presente",
      desc: "42 empreendimentos entregues, 3.800 famílias atendidas e quatro novos projetos em andamento.",
    },
  ];

  return (
    <main className="pt-16 md:pt-20">
      {/* Header */}
      <section className="py-24 text-center relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6">
          <span className="font-body text-gold text-xs tracking-[0.25em] uppercase block mb-4">Nossa Identidade</span>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">Quem Somos</h1>
          <DecoDivider className="max-w-xs mx-auto mt-6" />
          <p className="font-body text-white/50 mt-6 leading-relaxed">
            Somos uma empresa paulistana que acredita que construir vai além de erguer estruturas — é criar ambientes
            onde histórias se desenvolvem.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&h=520&fit=crop&auto=format"
                alt="Equipe Torrense no canteiro de obras"
                className="w-full object-cover shadow-xl"
                style={{ aspectRatio: "4/3" }}
              />
              {/* Deco frame */}
              <div className="absolute -bottom-5 -right-5 w-32 h-32 border border-gold/30 pointer-events-none" />
            </div>
            <div>
              <span className="font-body text-gold text-xs tracking-[0.25em] uppercase block mb-4">Nossa Missão</span>
              <h2 className="font-display text-3xl md:text-4xl text-obsidian mb-6 leading-tight">
                Construir com propósito, entregar com excelência
              </h2>
              <DecoDivider className="mb-8" />
              <div className="font-body text-charcoal/70 leading-relaxed flex flex-col gap-4">
                <p>
                  A Torrense foi fundada em 2005 pelo engenheiro civil Dr. Carlos Torrens, com a convicção de que o
                  mercado imobiliário paulistano merecia uma incorporadora que tratasse cada projeto como uma obra de
                  arte permanente.
                </p>
                <p>
                  Desde nosso primeiro empreendimento em Higienópolis, estabelecemos um padrão que nunca foi
                  comprometido: materiais de primeira linha, mão-de-obra especializada, arquitetura assinada e prazos
                  rigorosamente cumpridos.
                </p>
                <p>
                  Hoje, quase duas décadas depois, nossa reputação é nosso maior ativo. Mais de 60% de nossas vendas
                  vêm de indicações de clientes satisfeitos — o testemunho mais verdadeiro do que somos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-body text-gold text-xs tracking-[0.25em] uppercase block mb-4">O Que nos Move</span>
            <h2 className="font-display text-4xl text-white">Nossos Valores</h2>
            <DecoDivider className="max-w-xs mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="border border-white/10 p-8 hover:border-gold/40 transition-colors group"
              >
                <div className="text-gold text-3xl mb-6 group-hover:scale-110 transition-transform inline-block">
                  {icon}
                </div>
                <h3 className="font-display text-lg text-gold mb-4 tracking-wide">{title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-ivory-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-body text-gold text-xs tracking-[0.25em] uppercase block mb-4">Nossa Trajetória</span>
            <h2 className="font-display text-4xl text-obsidian">Linha do Tempo</h2>
            <DecoDivider className="max-w-xs mx-auto mt-6" />
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ backgroundColor: "#C9A84C30" }}
            />
            <div className="flex flex-col gap-0">
              {timeline.map(({ year, title, desc }, i) => (
                <div
                  key={year}
                  className={`relative flex flex-col md:flex-row items-start gap-6 py-8 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="md:w-5/12 bg-white border border-charcoal/10 p-6 hover:border-gold/30 transition-colors">
                    <h3 className="font-display text-lg text-obsidian mb-2">{title}</h3>
                    <p className="font-body text-sm text-charcoal/60 leading-relaxed">{desc}</p>
                  </div>

                  {/* Center node */}
                  <div className="md:w-2/12 flex justify-center items-center shrink-0">
                    <div
                      className="w-14 h-14 rotate-45 border-2 border-gold flex items-center justify-center"
                      style={{ backgroundColor: "#0A0A0A" }}
                    >
                      <span
                        className="font-display text-xs text-gold -rotate-45"
                        style={{ fontSize: "10px" }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="md:w-5/12 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-body text-gold text-xs tracking-[0.25em] uppercase block mb-4">Nossa Equipe</span>
          <h2 className="font-display text-3xl text-obsidian mb-4">
            Mais de 200 profissionais dedicados à sua satisfação
          </h2>
          <DecoDivider className="max-w-xs mx-auto my-6" />
          <p className="font-body text-charcoal/60 max-w-xl mx-auto leading-relaxed mb-10">
            Arquitetos, engenheiros, designers de interiores e consultores comerciais trabalham em sinergia para que
            cada projeto Torrense seja único.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-display text-sm tracking-widest uppercase px-10 py-4 bg-obsidian text-gold hover:bg-charcoal transition-colors"
          >
            Fale com Nossa Equipe
          </a>
        </div>
      </section>
    </main>
  );
}
