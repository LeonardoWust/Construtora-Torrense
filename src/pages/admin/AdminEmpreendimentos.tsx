import { Link } from "react-router-dom";
import { useEmpreendimentos } from "../../context/EmpreendimentosContext";
import { STATUS_LABEL } from "../../data/empreendimentos";

export default function AdminEmpreendimentos() {
  const { empreendimentos, isLoading, removeEmpreendimento, importLocalEmpreendimentos, isLocalMode } = useEmpreendimentos();

  const handleDelete = async (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${nome}"?`)) {
      try {
        await removeEmpreendimento(id);
      } catch (error) {
        console.error("Não foi possível excluir o empreendimento:", error);
        window.alert("Não foi possível excluir o empreendimento. Verifique sua conexão e tente novamente.");
      }
    }
  };

  const handleImport = async () => {
    if (!window.confirm("Importar para o Supabase os empreendimentos que ainda estão salvos somente neste navegador?")) return;
    try {
      const imported = await importLocalEmpreendimentos();
      window.alert(imported > 0
        ? `${imported} empreendimento(s) importado(s) com sucesso.`
        : "Não há novos empreendimentos locais para importar.");
    } catch (error) {
      console.error("Não foi possível importar empreendimentos locais:", error);
      window.alert(error instanceof Error ? error.message : "Falha ao importar empreendimentos locais.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Empreendimentos</h1>
        <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
          {!isLocalMode ? (
            <button type="button" onClick={handleImport} disabled={isLoading} className="btn" style={{ backgroundColor: "#e5e7eb", padding: ".5rem 1rem" }}>
              Importar dados deste navegador
            </button>
          ) : (
            <span style={{ padding: ".4rem .8rem", backgroundColor: "#fef3c7", color: "#92400e", borderRadius: "4px", fontSize: ".85rem" }}>
              💾 Modo Local (Navegador)
            </span>
          )}
          <Link to="/admin/novo" className="btn btn--gold">
            + Novo Empreendimento
          </Link>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            <tr>
              <th style={{ padding: "1rem", textAlign: "left", color: "#4b5563" }}>Nome</th>
              <th style={{ padding: "1rem", textAlign: "left", color: "#4b5563" }}>Localização</th>
              <th style={{ padding: "1rem", textAlign: "left", color: "#4b5563" }}>Status</th>
              <th style={{ padding: "1rem", textAlign: "left", color: "#4b5563" }}>Destaque</th>
              <th style={{ padding: "1rem", textAlign: "right", color: "#4b5563" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                  Carregando empreendimentos...
                </td>
              </tr>
            )}
            {empreendimentos.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "1rem" }}>{emp.nome}</td>
                <td style={{ padding: "1rem" }}>{emp.bairro ? `${emp.bairro}, ${emp.cidade}` : emp.cidade}</td>
                <td style={{ padding: "1rem" }}>{STATUS_LABEL[emp.status] || emp.status}</td>
                <td style={{ padding: "1rem" }}>{emp.destaque ? "Sim" : "Não"}</td>
                <td style={{ padding: "1rem", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: ".5rem" }}>
                  <Link to={`/admin/editar/${emp.id}`} style={{ padding: ".25rem .5rem", backgroundColor: "#3b82f6", color: "#fff", borderRadius: "4px", textDecoration: "none", fontSize: ".875rem" }}>
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(emp.id, emp.nome)} style={{ padding: ".25rem .5rem", backgroundColor: "#ef4444", color: "#fff", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: ".875rem" }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {!isLoading && empreendimentos.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                  Nenhum empreendimento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
