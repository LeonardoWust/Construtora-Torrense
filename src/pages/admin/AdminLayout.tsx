import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Não foi possível encerrar a sessão administrativa:", error);
      window.alert("Não foi possível encerrar a sessão. Tente novamente.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside style={{ width: "250px", backgroundColor: "var(--clr-dark)", color: "#fff", padding: "2rem 1rem", display: "flex", flexDirection: "column" }}>
        <h2 style={{ color: "var(--clr-gold)", marginBottom: "2rem", fontSize: "1.2rem", textAlign: "center" }}>
          Painel Admin
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
          <Link to="/admin" style={{ color: "#fff", textDecoration: "none", padding: ".5rem 1rem", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.1)" }}>
            Empreendimentos
          </Link>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", padding: ".5rem 1rem", borderRadius: "4px" }}>
            Ver Site
          </Link>
        </nav>
        <button onClick={handleLogout} style={{ background: "transparent", color: "#ef4444", border: "1px solid #ef4444", padding: ".5rem", borderRadius: "4px", cursor: "pointer", marginTop: "auto" }}>
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
