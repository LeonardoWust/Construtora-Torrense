import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EmpCard from "../components/EmpCard";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";

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
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target).toLocaleString("pt-BR");
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

export default function Home() {
  const { empreendimentos } = useEmpreendimentos();
  const destaques = empreendimentos.filter(e => e.destaque).slice(0, 3);
  const lista = destaques.length ? destaques : empreendimentos.slice(0, 3);

  return (
    <div className="page-fade">
      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <span className="hero__eyebrow">Construtora &amp; Incorporadora</span>
          <h1 className="hero__title">
            Construindo<br /><em>Sonhos</em><br />com Excelência
          </h1>
          <p className="hero__subtitle">
            Cada empreendimento Torrense é criado para superar expectativas —
            arquitetura sofisticada, qualidade premium e localização privilegiada.
          </p>
          <div className="hero__actions">
            <Link to="/empreendimentos" className="btn btn--gold">Ver Empreendimentos</Link>
            <Link to="/quem-somos" className="btn btn--outline-white">Conheça a Torrense</Link>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <StatItem count={15} label="Anos de Mercado" />
        <StatItem count={20}  label="Empreendimentos" suffix="+" />
        <StatItem count={2500} label="Famílias Atendidas" />

      </div>

      {/* QUEM SOMOS SNIPPET */}
      <section className="section" id="sobre">
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
                <span className="about-snippet__badge-label">Anos de<br />Experiência</span>
              </div>
            </div>
            <div className="about-snippet__text">
              <span className="eyebrow">Quem Somos</span>
              <h2>Tradição e Inovação no Mercado Imobiliário</h2>
              <p>
                A Torrense nasceu com o propósito de transformar o mercado imobiliário regional,
                entregando empreendimentos que combinam design contemporâneo, solidez construtiva
                e localização estratégica.
              </p>
              <p>
                Com mais de 15 anos de atuação, nossa história é marcada por projetos que valorizam
                cada detalhe, desde a planta até as áreas de convivência — sempre com foco no bem-estar
                das famílias que escolhem a Torrense.
              </p>
              <Link to="/quem-somos" className="btn btn--dark">Nossa História →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EMPREENDIMENTOS DESTAQUE */}
      <section className="section section--offwhite" id="empreendimentos">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Portfólio</span>
            <h2>Empreendimentos em Destaque</h2>
            <p style={{ maxWidth: "520px", marginInline: "auto", color: "var(--clr-gray)", marginTop: ".75rem" }}>
              Conheça nossos projetos — do lançamento ao imóvel pronto para morar.
            </p>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {lista.map(emp => <EmpCard key={emp.id} emp={emp} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-lg)" }}>
            <Link to="/empreendimentos" className="btn btn--outline-gold">
              Ver Todos os Empreendimentos →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div className="container container--sm">
          <span className="eyebrow" style={{ marginBottom: ".5rem" }}>Realize seu Sonho</span>
          <h2 style={{ color: "var(--clr-white)", margin: "1rem 0" }}>
            O imóvel ideal está mais perto do que você imagina
          </h2>
          <p style={{ color: "#ccc", marginBottom: "var(--space-md)", maxWidth: "500px", marginInline: "auto" }}>
            Converse com um de nossos especialistas e descubra as melhores condições
            para adquirir seu imóvel Torrense.
          </p>
          <a
            href="https://wa.me/5515999999999?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+os+empreendimentos+Torrense."
            className="btn btn--gold"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: "currentColor" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
