import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PublicLayout from "./pages/PublicLayout";
import Home from "./pages/Home";
import Empreendimentos from "./pages/Empreendimentos";
import EmpreendimentoDetalhe from "./pages/EmpreendimentoDetalhe";
import QuemSomos from "./pages/QuemSomos";
import Contato from "./pages/Contato";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminEmpreendimentos from "./pages/admin/AdminEmpreendimentos";
import AdminEmpreendimentoForm from "./pages/admin/AdminEmpreendimentoForm";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

// Providers
import { EmpreendimentosProvider } from "./context/EmpreendimentosContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <EmpreendimentosProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/empreendimentos" element={<Empreendimentos />} />
              <Route path="/empreendimentos/:id" element={<EmpreendimentoDetalhe />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/contato" element={<Contato />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminEmpreendimentos />} />
              <Route path="novo" element={<AdminEmpreendimentoForm />} />
              <Route path="editar/:id" element={<AdminEmpreendimentoForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EmpreendimentosProvider>
    </AuthProvider>
  );
}
