import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import EmpCard from "../components/EmpCard";
import EmpGallery from "../components/EmpGallery";
import { STATUS_LABEL, STATUS_CLASS } from "../data/empreendimentos";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";

export default function EmpreendimentoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { empreendimentos } = useEmpreendimentos();

  const emp = empreendimentos.find(e => e.id === id);
  if (!emp) return <Navigate to="/empreendimentos" replace />;

  const outros = empreendimentos.filter(e => e.id !== emp.id).slice(0, 3);
  const waHref = `https://wa.me/${emp.whatsapp}?text=${encodeURIComponent(emp.whatsappMsg)}`;
  const statusLabel = STATUS_LABEL[emp.status] || emp.status;
  const statusClass = STATUS_CLASS[emp.status] || "";

  const prev = () => setLightboxIdx(i => i !== null ? (i - 1 + emp.galeria.length) % emp.galeria.length : null);
  const next = () => setLightboxIdx(i => i !== null ? (i + 1) % emp.galeria.length : null);

  return (
    <div className="page-fade">
      <div className="emp-detail">
        <div className="container">
          <nav className="emp-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/empreendimentos">Empreendimentos</Link>
            <span aria-hidden="true">›</span>
            <span>{emp.nome}</span>
          </nav>

          <div className="emp-detail__header">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: ".75rem" }}>
              <span className={"emp-card__status " + statusClass} style={{ position: "static" }}>{statusLabel}</span>
              <span style={{ fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--clr-gold)", fontWeight: 700 }}>
                {emp.bairro ? `${emp.bairro} — ${emp.cidade}` : emp.cidade}
              </span>
            </div>
            <h1>{emp.nome}</h1>
          </div>

          <div className="emp-detail__grid">
            <div>
              {/* Galeria */}
              <EmpGallery
                images={emp.galeria.map((img, idx) => ({
                  src: img.src,
                  alt: img.alt,
                  badge: idx === 0 ? statusLabel : undefined,
                }))}
              />

              {/* Descrição */}
              <div style={{ marginTop: "var(--space-lg)" }}>
                <h2 style={{ marginBottom: "1rem" }}>Sobre o Empreendimento</h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>{emp.descricao}</p>
              </div>

              {/* Diferenciais */}
              <div style={{ marginTop: "var(--space-md)" }}>
                <h3 style={{ marginBottom: "1rem", fontFamily: "var(--font-display)" }}>Diferenciais</h3>
                <ul className="diferenciais">
                  {emp.diferenciais.map((d, i) => (
                    <li key={i} className="diferencial-item">{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="emp-detail__sidebar">
              <div className="emp-detail__cta-box">
                <h3>Tenho Interesse</h3>
                <p>Fale agora com um especialista e tire todas as suas dúvidas sobre este empreendimento.</p>
                <a href={waHref} className="btn btn--gold" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{ fill: "currentColor", flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>

              <div className="ficha">
                <h4 className="ficha__title">Ficha Técnica</h4>
                {[
                  ["Cidade", emp.cidade],
                  ["Bairro", emp.bairro || "—"],
                  ["Metragem", emp.metragem],
                  ["Dormitórios", emp.dormitorios],
                  ["Vagas", emp.vagas],
                  ["Andares", emp.andares],
                  ["Unidades", emp.unidades],
                  ["Status", statusLabel],
                ].map(([k, v]) => (
                  <div key={k} className="ficha__row">
                    <span className="ficha__key">{k}</span>
                    <span className="ficha__val">{v}</span>
                  </div>
                ))}
              </div>

              <Link to="/empreendimentos" className="btn btn--outline-gold" style={{ justifyContent: "center" }}>
                ← Todos os Empreendimentos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Outros empreendimentos */}
      {outros.length > 0 && (
        <section className="section section--offwhite">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">Portfólio</span>
              <h2>Outros Empreendimentos</h2>
              <div className="divider" />
            </div>
            <div className="grid-3">
              {outros.map(e => <EmpCard key={e.id} emp={e} />)}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="lightbox is-open" role="dialog" aria-modal="true" aria-label="Galeria de imagens">
          <button className="lightbox__close" aria-label="Fechar" onClick={() => setLightboxIdx(null)}>&times;</button>
          <button className="lightbox__nav lightbox__prev" aria-label="Anterior" onClick={prev}>&#8249;</button>
          <img className="lightbox__img" src={emp.galeria[lightboxIdx].src} alt={emp.galeria[lightboxIdx].alt} />
          <button className="lightbox__nav lightbox__next" aria-label="Próxima" onClick={next}>&#8250;</button>
        </div>
      )}
    </div>
  );
}
