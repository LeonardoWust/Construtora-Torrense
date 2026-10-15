import { Link } from "react-router-dom";
import logoImg from "@/imports/ChatGPT_Image_31_de_ago._de_2026__23_30_22.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src={logoImg}
              alt="Torrense Construtora e Incorporadora"
              style={{ height: "48px", width: "auto", objectFit: "contain", marginBottom: ".75rem" }}
            />
            <p>Construtora e Incorporadora com tradição, qualidade e compromisso com quem sonha em ter um lar.</p>
          </div>
          <div>
            <p className="footer__col-title">Navegação</p>
            <ul className="footer__links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/empreendimentos" className="footer__link">Empreendimentos</Link></li>
              <li><Link to="/quem-somos" className="footer__link">Quem Somos</Link></li>
              <li><Link to="/contato" className="footer__link">Contato</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Contato</p>
            <ul className="footer__links">
              <li><a href="tel:+5515999999999" className="footer__link">(15) 9 9999-9999</a></li>
              <li><a href="mailto:contato@torrense.com.br" className="footer__link">contato@torrense.com.br</a></li>
              <li><span className="footer__link">Sorocaba, SP</span></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          &copy; {new Date().getFullYear()} Torrense Construtora e Incorporadora. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
