import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function useCountUp(ref: React.RefObject<HTMLSpanElement | null>, target: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const duration = 1800;
      const start = performance.now();
      const update = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target).toLocaleString("pt-BR");
        if (p < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString("pt-BR");
      };
      requestAnimationFrame(update);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, target]);
}

function StatItem({ count, label, suffix }: { count: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, count);
  return (
    <div className="stat-item">
      <div style={{ display: "inline-flex", alignItems: "baseline", gap: "2px" }}>
        <span className="stat-item__num" ref={ref}>0</span>
        {suffix && <span className="stat-item__num">{suffix}</span>}
      </div>
      <span className="stat-item__label">{label}</span>
    </div>
  );
}

export default function QuemSomos() {
  return (
    <div className="page-fade">
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Nossa Empresa</span>
          <h1>Quem Somos</h1>
          <p style={{ color: "rgba(255,255,255,.7)", marginTop: ".75rem", maxWidth: "520px", marginInline: "auto" }}>
            Uma construtora nascida do propósito de transformar vidas por meio de empreendimentos que unem qualidade, beleza e solidez.
          </p>
        </div>
      </header>

      {/* HISTÓRIA */}
      <section className="section">
        <div className="container">
          <div className="about-snippet">
            <div className="about-snippet__img-wrap">
              <div
                className="about-snippet__img"
                style={{
                  background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "6rem", opacity: .3 }}>🏛️</span>
              </div>
              <div className="about-snippet__badge">
                <span className="about-snippet__badge-num">+36</span>
                <span className="about-snippet__badge-label">Anos<br />Construindo</span>
              </div>
            </div>
            <div className="about-snippet__text">
              <span className="eyebrow">Nossa História</span>
              <h2>De um Sonho à Referência Regional</h2>
              <p>
                A Torrense foi fundada com uma visão clara: entregar não apenas imóveis, mas
                espaços que inspiram e transformam a vida de cada família. Nascemos de uma
                paixão genuína pela construção civil e pelo impacto positivo que um lar bem
                construído gera nas pessoas.
              </p>
              <p>
                Ao longo dos anos, consolidamos nossa presença na região de Sorocaba e entorno,
                acumulando um portfólio de empreendimentos residenciais que carregam a assinatura
                de quem coloca qualidade acima de tudo — do projeto à entrega das chaves.
              </p>
              <p>
                Hoje, a Torrense é reconhecida não apenas pela excelência construtiva, mas pela
                relação de confiança e transparência que cultiva com cada cliente, parceiro e
                fornecedor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS VALORES */}
      <section className="nv-section">
        <style>{`
          .nv-section {
            --nv-bg:     #0a0a0a;
            --nv-gold:   #c9a84c;
            --nv-white:  #ffffff;
            --nv-body:   #c0c0c0;
            --nv-border: rgba(201,168,76,.18);
            padding-block: var(--space-lg);
            background: var(--nv-bg);
          }

          /* ── Header ── */
          .nv-header {
            text-align: center;
            margin-bottom: 3.5rem;
          }
          .nv-eyebrow {
            display: block;
            font-family: var(--font-body);
            font-size: .7rem;
            font-weight: 700;
            letter-spacing: .24em;
            text-transform: uppercase;
            color: var(--nv-gold);
            margin-bottom: .75rem;
          }
          .nv-title {
            font-family: var(--font-display);
            font-size: clamp(1.75rem, 3.5vw, 2.5rem);
            font-weight: 700;
            color: var(--nv-white);
            margin-bottom: 1.25rem;
          }
          .nv-deco {
            display: flex;
            align-items: center;
            max-width: 200px;
            margin-inline: auto;
          }
          .nv-deco__line {
            flex: 1;
            height: 1px;
            background: var(--nv-gold);
            opacity: .35;
          }
          .nv-deco__diamond {
            width: 8px;
            height: 8px;
            background: var(--nv-gold);
            transform: rotate(45deg);
            flex-shrink: 0;
          }

          /* ── Grid ── */
          .nv-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.25rem;
          }
          @media (max-width: 900px) {
            .nv-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 520px) {
            .nv-grid { grid-template-columns: 1fr; }
          }

          /* ── Card ── */
          .nv-card {
            border: 1px solid var(--nv-border);
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            transition: border-color .25s ease, background .25s ease;
          }
          .nv-card:hover {
            border-color: rgba(201,168,76,.5);
            background: rgba(201,168,76,.04);
          }
          .nv-card__icon {
            display: flex;
            align-items: center;
            width: 36px;
            height: 36px;
            flex-shrink: 0;
          }
          .nv-card__icon svg {
            width: 36px;
            height: 36px;
            overflow: visible;
          }
          .nv-card__name {
            font-family: var(--font-display);
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--nv-gold);
            letter-spacing: .04em;
          }
          .nv-card__desc {
            font-family: var(--font-body);
            font-size: .875rem;
            color: var(--nv-body);
            line-height: 1.7;
            margin: 0;
          }
        `}</style>

        <div className="container">
          <header className="nv-header">
            <span className="nv-eyebrow">O que nos move</span>
            <h2 className="nv-title">Nossos Valores</h2>
            <div className="nv-deco">
              <div className="nv-deco__line" />
              <div className="nv-deco__diamond" />
              <div className="nv-deco__line" />
            </div>
          </header>

          <div className="nv-grid">
            {/* Excelência — losango sólido */}
            <article className="nv-card">
              <div className="nv-card__icon">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="18,3 33,18 18,33 3,18" fill="#c9a84c" />
                </svg>
              </div>
              <p className="nv-card__name">Excelência</p>
              <p className="nv-card__desc">Cada detalhe é revisado com rigor técnico e artístico. Não entregamos apenas imóveis — entregamos obras que resistem ao tempo.</p>
            </article>

            {/* Integridade — círculo sólido */}
            <article className="nv-card">
              <div className="nv-card__icon">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="15" fill="#c9a84c" />
                </svg>
              </div>
              <p className="nv-card__name">Integridade</p>
              <p className="nv-card__desc">Transparência em cada etapa. Nossos clientes acompanham o progresso das obras com canais diretos de comunicação.</p>
            </article>

            {/* Inovação — losango vazado */}
            <article className="nv-card">
              <div className="nv-card__icon">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="18,2 34,18 18,34 2,18" stroke="#c9a84c" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <p className="nv-card__name">Inovação</p>
              <p className="nv-card__desc">Incorporamos tecnologias construtivas de ponta, incluindo certificações ambientais e sistemas de automação residencial.</p>
            </article>

            {/* Legado — círculo duplo */}
            <article className="nv-card">
              <div className="nv-card__icon">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="15" stroke="#c9a84c" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="18" r="7"  stroke="#c9a84c" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <p className="nv-card__name">Legado</p>
              <p className="nv-card__desc">Construímos pensando nas próximas gerações. Cada empreendimento valoriza o bairro onde está inserido e perdura por décadas.</p>
            </article>
          </div>
        </div>
      </section>

      {/* LINHA DO TEMPO */}
      <section className="tl-section">
        <style>{`
          .tl-section {
            --tl-gold:   #c9a84c;
            --tl-dark:   #111111;
            --tl-gray:   #666666;
            --tl-white:  #ffffff;
            --tl-line-w: 2px;
            --tl-diamond: 64px;
            padding-block: var(--space-lg);
            background: var(--clr-white);
          }

          /* ── Header ── */
          .tl-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          .tl-eyebrow {
            display: block;
            font-family: var(--font-body);
            font-size: .7rem;
            font-weight: 700;
            letter-spacing: .22em;
            text-transform: uppercase;
            color: var(--tl-gold);
            margin-bottom: .75rem;
          }
          .tl-title {
            font-family: var(--font-display);
            font-size: clamp(1.75rem, 3.5vw, 2.5rem);
            font-weight: 700;
            color: var(--tl-dark);
            margin-bottom: 1.25rem;
          }
          .tl-deco {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0;
            max-width: 200px;
            margin-inline: auto;
          }
          .tl-deco__line {
            flex: 1;
            height: var(--tl-line-w);
            background: var(--tl-gold);
            opacity: .4;
          }
          .tl-deco__diamond {
            width: 9px;
            height: 9px;
            background: var(--tl-gold);
            transform: rotate(45deg);
            flex-shrink: 0;
            margin-inline: 0;
          }

          /* ── Track ── */
          .tl-track {
            position: relative;
            max-width: 860px;
            margin-inline: auto;
            padding-inline: 1.5rem;
          }
          .tl-track::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: var(--tl-line-w);
            background: linear-gradient(to bottom, var(--tl-gold) 0%, rgba(201,168,76,.15) 100%);
            transform: translateX(-50%);
          }

          /* ── Row ── */
          .tl-row {
            display: grid;
            grid-template-columns: 1fr var(--tl-diamond) 1fr;
            align-items: center;
            gap: 0 1.5rem;
            margin-bottom: 2.5rem;
          }
          .tl-row:last-child { margin-bottom: 0; }

          /* Card on the left */
          .tl-row__card--left  { grid-column: 1; text-align: right; }
          /* Card on the right */
          .tl-row__card--right { grid-column: 3; text-align: left; }
          /* Empty spacer */
          .tl-row__spacer { visibility: hidden; }

          .tl-card {
            background: var(--tl-white);
            border: 1px solid rgba(0,0,0,.07);
            border-radius: 6px;
            box-shadow: 0 2px 16px rgba(0,0,0,.06);
            padding: 1.25rem 1.5rem;
            transition: box-shadow .25s ease, border-color .25s ease;
          }
          .tl-card:hover {
            box-shadow: 0 6px 28px rgba(201,168,76,.15);
            border-color: rgba(201,168,76,.35);
          }
          .tl-card__title {
            font-family: var(--font-display);
            font-size: 1rem;
            font-weight: 700;
            color: var(--tl-dark);
            margin-bottom: .4rem;
          }
          .tl-card__text {
            font-family: var(--font-body);
            font-size: .85rem;
            color: var(--tl-gray);
            line-height: 1.65;
            margin: 0;
          }

          /* ── Diamond node ── */
          .tl-node {
            grid-column: 2;
            width: var(--tl-diamond);
            height: var(--tl-diamond);
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--tl-dark);
            border: 2px solid var(--tl-gold);
            transform: rotate(45deg);
            flex-shrink: 0;
            position: relative;
            z-index: 1;
            transition: background .25s ease;
          }
          .tl-node:hover { background: var(--tl-gold); }
          .tl-node__year {
            transform: rotate(-45deg);
            font-family: var(--font-display);
            font-size: .9rem;
            font-weight: 700;
            color: var(--tl-gold);
            letter-spacing: .05em;
            line-height: 1.1;
            text-align: center;
            white-space: nowrap;
            transition: color .25s ease;
          }
          .tl-node:hover .tl-node__year { color: var(--tl-dark); }

          /* ── Responsive ── */
          @media (max-width: 640px) {
            .tl-track::before {
              left: calc(var(--tl-diamond) / 2);
              transform: none;
            }
            .tl-row {
              grid-template-columns: var(--tl-diamond) 1fr;
              grid-template-rows: auto;
              gap: 0 1rem;
              align-items: start;
            }
            .tl-node         { grid-column: 1; grid-row: 1; }
            .tl-row__card--left,
            .tl-row__card--right { grid-column: 2; grid-row: 1; text-align: left; }
            .tl-row__spacer  { display: none; }
          }
        `}</style>

        <div className="container">
          <header className="tl-header">
            <span className="tl-eyebrow">Nossa Trajetória</span>
            <h2 className="tl-title">Linha do Tempo</h2>
            <div className="tl-deco">
              <div className="tl-deco__line" />
              <div className="tl-deco__diamond" />
              <div className="tl-deco__line" />
            </div>
          </header>

          <div className="tl-track">
            {[
              { year: "1990", title: "Nasce a Torrense", text: "Começou como uma casa de materiais de construção e começando a construir residências de pequeno porte", side: "left" },
              { year: "2013", title: "O Primeiro Grande Empreendimento", text: "Construção do primeiro grande empreendimento Edifício Residencial Imperador", side: "right" },
              { year: "2020", title: "Grande Finalizações", text: "Finalização dos empreendimentos Dom Pedro I & Dom Pedro II Passo de torres SC e o supermercado Bistek Torres RS ", side: "left" },
              { year: "2023", title: "Expansão do Portifólio", text: "Início das obras do Virgínia Business e planejamento do supermercado Bistek em Tramandaí", side: "right" },
              { year: "Hoje", title: "Alto Padrão e Inovação", text: "Atuamos no segmento de alto padrão, com projetos que combinam design contemporâneo, tecnologia de construção e sustentabilidade.", side: "left" },
            ].map(({ year, title, text, side }) => (
              <div key={year} className="tl-row">
                {side === "left" ? (
                  <>
                    <div className="tl-row__card--left tl-card">
                      <p className="tl-card__title">{title}</p>
                      <p className="tl-card__text">{text}</p>
                    </div>
                    <div className="tl-node"><span className="tl-node__year">{year}</span></div>
                    <div className="tl-row__spacer tl-card" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <div className="tl-row__spacer tl-card" aria-hidden="true" />
                    <div className="tl-node"><span className="tl-node__year">{year}</span></div>
                    <div className="tl-row__card--right tl-card">
                      <p className="tl-card__title">{title}</p>
                      <p className="tl-card__text">{text}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <StatItem count={36} label="Anos de Mercado" />
        <StatItem count={20}  label="Empreendimentos" suffix="+" />
        <StatItem count={2500} label="Famílias Atendidas" />
      </div>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center", background: "var(--clr-off-white)" }}>
        <div className="container container--sm">
          <h2 style={{ marginBottom: "1rem" }}>Pronto para conhecer nossos projetos?</h2>
          <p style={{ color: "var(--clr-gray)", marginBottom: "var(--space-md)" }}>
            Explore nosso portfólio e encontre o empreendimento ideal para você e sua família.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/empreendimentos" className="btn btn--gold">Ver Empreendimentos</Link>
            <Link to="/contato" className="btn btn--dark">Fale Conosco</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
