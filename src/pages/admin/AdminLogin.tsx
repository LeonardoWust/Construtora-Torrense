import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isConfigured } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (error) {
      console.error("Falha no login administrativo:", error);
      setError(error instanceof Error ? error.message : "Não foi possível entrar. Confira os dados informados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--clr-offwhite)" }}>
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "420px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login Administrativo</h1>
        
        {!isConfigured && (
          <div style={{ backgroundColor: "#fef3c7", color: "#92400e", padding: ".75rem 1rem", borderRadius: "6px", marginBottom: "1rem", fontSize: ".85rem", lineHeight: "1.4" }}>
            <strong>Modo Local (Offline):</strong> Supabase ainda não configurado. Você pode entrar usando qualquer e-mail e a senha local <code>16981698</code>.
          </div>
        )}

        {error && <p role="alert" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: ".5rem" }}>E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isConfigured ? "seu@email.com" : "admin@local.com"}
              style={{ width: "100%", padding: ".75rem", border: "1px solid #ccc", borderRadius: "4px" }}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: ".5rem" }}>Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: ".75rem", border: "1px solid #ccc", borderRadius: "4px" }}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn btn--gold" disabled={isSubmitting} style={{ width: "100%", justifyContent: "center" }}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

