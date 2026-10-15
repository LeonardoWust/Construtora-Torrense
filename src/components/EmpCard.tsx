import { Link } from "react-router-dom";
import type { Empreendimento } from "../data/empreendimentos";
import { STATUS_LABEL, STATUS_CLASS } from "../data/empreendimentos";

interface Props {
  emp: Empreendimento;
}

export default function EmpCard({ emp }: Props) {
  const thumb = emp.galeria[0];
  return (
    <Link to={`/empreendimentos/${emp.id}`} className="emp-card">
      <div className="emp-card__img-wrap">
        {thumb && (
          <img className="emp-card__img" src={thumb.src} alt={thumb.alt} loading="lazy" />
        )}
        <span className={"emp-card__status " + (STATUS_CLASS[emp.status] || "")}>
          {STATUS_LABEL[emp.status] || emp.status}
        </span>
      </div>
      <div className="emp-card__body">
        <p className="emp-card__city">{emp.cidade}</p>
        <h3 className="emp-card__name">{emp.nome}</h3>
        <div className="emp-card__specs">
          <span className="emp-card__spec">{emp.metragem}</span>
          <span className="emp-card__spec">{emp.dormitorios}</span>
          <span className="emp-card__spec">{emp.vagas}</span>
        </div>
        <span className="btn btn--outline-gold" style={{ fontSize: ".75rem", padding: ".45rem 1rem" }}>
          Ver Detalhes →
        </span>
      </div>
    </Link>
  );
}
