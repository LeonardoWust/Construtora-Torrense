import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImg from "@/imports/ChatGPT_Image_31_de_ago._de_2026__23_30_22.png";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          <NavLink to="/" className="nav__logo" onClick={() => setOpen(false)}>
            <img
              src={logoImg}
              alt="Torrense Construtora e Incorporadora"
              style={{ height: "70px", width: "auto", display: "block", objectFit: "contain" }}
            />
          </NavLink>

          <ul className="nav__links">
            <li><NavLink to="/" end className={({ isActive }) => "nav__link" + (isActive ? " active" : "")}>Home</NavLink></li>
            <li><NavLink to="/empreendimentos" className={({ isActive }) => "nav__link" + (isActive ? " active" : "")}>Empreendimentos</NavLink></li>
            <li><NavLink to="/quem-somos" className={({ isActive }) => "nav__link" + (isActive ? " active" : "")}>Quem Somos</NavLink></li>
            <li><NavLink to="/contato" className={({ isActive }) => "nav__link" + (isActive ? " active" : "")}>Contato</NavLink></li>
            <li>
              <a
                href="https://wa.me/5515999999999?text=Ol%C3%A1%2C+gostaria+de+saber+mais+sobre+os+empreendimentos+Torrense."
                className="btn btn--gold nav__cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale Conosco
              </a>
            </li>
          </ul>

          <button
            className="nav__hamburger"
            aria-label="Abrir menu"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={"nav__mobile" + (open ? " is-open" : "")}>
        <NavLink to="/" end className="nav__mobile-link" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/empreendimentos" className="nav__mobile-link" onClick={() => setOpen(false)}>Empreendimentos</NavLink>
        <NavLink to="/quem-somos" className="nav__mobile-link" onClick={() => setOpen(false)}>Quem Somos</NavLink>
        <NavLink to="/contato" className="nav__mobile-link" onClick={() => setOpen(false)}>Contato</NavLink>
        <img
          src={logoImg}
          alt="Torrense"
          style={{ height: "36px", width: "auto", objectFit: "contain", marginBottom: ".5rem" }}
        />
        <a
          href="https://wa.me/5515999999999"
          className="btn btn--gold"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: ".5rem", justifyContent: "center" }}
          onClick={() => setOpen(false)}
        >
          Falar no WhatsApp
        </a>
      </div>
    </>
  );
}
