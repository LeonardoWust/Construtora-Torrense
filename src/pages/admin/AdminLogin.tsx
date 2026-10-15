import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin");
    } else {
      setError("Senha incorreta");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--clr-offwhite)" }}>
      <div style={{ backgroundColor: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login Administrativo</h1>
        {error && <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: ".5rem" }}>Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: ".75rem", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
          </div>
          <button type="submit" className="btn btn--gold" style={{ width: "100%", justifyContent: "center" }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

