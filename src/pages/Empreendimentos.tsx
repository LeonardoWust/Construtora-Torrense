import { useState } from "react";
import { Link } from "react-router-dom";
import EmpCard from "../components/EmpCard";
import { useEmpreendimentos } from "../context/EmpreendimentosContext";

type Filter = "todos" | "na-planta" | "em-construcao" | "pronto";

export default function Empreendimentos() {
  const [filter, setFilter] = useState<Filter>("todos");
  const { empreendimentos } = useEmpreendimentos();

  const lista = filter === "todos"
    ? empreendimentos
    : empreendimentos.filter(e => e.status === filter);

  return (
    <div className="page-fade">
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Portfólio Completo</span>
          <h1>Nossos Empreendimentos</h1>
          <p style={{ color: "rgba(255,255,255,.7)", marginTop: ".75rem", maxWidth: "480px", marginInline: "auto" }}>
            Do lançamento ao pronto para morar — encontre o imóvel certo para você.
          </p>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filtrar empreendimentos">
            {(["todos", "na-planta", "em-construcao", "pronto"] as Filter[]).map(f => (
              <button
                key={f}
                className={"filter-btn" + (filter === f ? " is-active" : "")}
                onClick={() => setFilter(f)}
              >
                {{ todos: "Todos", "na-planta": "Na Planta", "em-construcao": "Em Construção", pronto: "Prontos" }[f]}
              </button>
            ))}
          </div>

          {lista.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
              <h3>Nenhum empreendimento encontrado</h3>
              <p>Tente outro filtro ou <Link to="/contato" style={{ color: "var(--clr-gold)" }}>entre em contato</Link>.</p>
            </div>
          ) : (
            <div className="grid-3">
              {lista.map(emp => <EmpCard key={emp.id} emp={emp} />)}
            </div>
          )}
        </div>
      </main>

      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div className="container container--sm">
          <h2 style={{ color: "var(--clr-white)", marginBottom: "1rem" }}>
            Não encontrou o que procura?
          </h2>
          <p style={{ color: "#ccc", marginBottom: "var(--space-md)" }}>
            Entre em contato e nossos especialistas vão te ajudar a encontrar o empreendimento ideal.
          </p>
          <a
            href="https://wa.me/5515999999999?text=Ol%C3%A1%21+Busco+um+im%C3%B3vel+Torrense+e+gostaria+de+mais+informa%C3%A7%C3%B5es."
            className="btn btn--gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com Especialista
          </a>
        </div>
      </section>
    </div>
  );
}
