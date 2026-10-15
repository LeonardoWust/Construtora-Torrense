import { Link } from "react-router-dom";

export default function Contato() {
  return (
    <div className="page-fade">
      <section className="contato-hero">
        <div className="contato-hero__content">
          <span className="eyebrow" style={{ marginBottom: "1rem" }}>Fale Conosco</span>

          <h1 style={{ color: "var(--clr-white)", marginBottom: "1rem" }}>
            Estamos prontos<br />para te <em style={{ fontStyle: "normal", color: "var(--clr-gold)" }}>atender</em>
          </h1>

          <p style={{ color: "rgba(255,255,255,.7)", fontSize: "1.05rem", maxWidth: "480px", marginInline: "auto", marginBottom: "var(--space-md)" }}>
            A forma mais rápida e eficiente de falar com nossa equipe é pelo WhatsApp.
            Clique abaixo e tire suas dúvidas em tempo real.
          </p>

          <a
            href="https://wa.me/5515999999999?text=Ol%C3%A1%21+Acessei+o+site+da+Torrense+e+gostaria+de+mais+informa%C3%A7%C3%B5es."
            className="wa-btn-main"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Torrense pelo WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Iniciar Conversa no WhatsApp
          </a>

          <div className="horario-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            Seg–Sex: 8h–18h &nbsp;|&nbsp; Sáb: 8h–12h
          </div>

          <div className="divider-or">ou acesse por outro canal</div>

          <div className="contato-channels">
            <a href="tel:+5515999999999" className="contato-channel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l.82-.82a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              (15) 9 9999-9999
            </a>
            <a href="mailto:contato@torrense.com.br" className="contato-channel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              contato@torrense.com.br
            </a>
            <div className="contato-channel" style={{ cursor: "default" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Sorocaba, SP — Brasil
            </div>
          </div>
        </div>
      </section>

      <section className="section section--offwhite" style={{ textAlign: "center" }}>
        <div className="container container--sm">
          <span className="eyebrow" style={{ marginBottom: ".5rem" }}>Nosso Portfólio</span>
          <h2 style={{ marginBottom: "1rem" }}>Conheça nossos empreendimentos</h2>
          <p style={{ color: "var(--clr-gray)", marginBottom: "var(--space-md)" }}>
            Antes de entrar em contato, explore nossos projetos e encontre o que mais se encaixa no seu perfil.
          </p>
          <Link to="/empreendimentos" className="btn btn--gold">Ver Todos os Empreendimentos →</Link>
        </div>
      </section>
    </div>
  );
}
