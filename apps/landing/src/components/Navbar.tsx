import { Link, useLocation } from "react-router-dom";
import { getConsultoriaUrl } from "../data/products";

const links = [
  { to: "/", label: "Home" },
  { to: "/#protocolo", label: "Protocolo" },
  { to: "/#especialidade", label: "Diabetes" },
  { to: "/loja", label: "Loja" },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Carletti Fit" className="w-9 h-9 rounded-lg" />
          <div className="hidden sm:block">
            <span className="font-display font-bold text-white tracking-tight">Carletti Fit</span>
            <span className="block text-[10px] text-muted uppercase tracking-widest">Diabético Imortal</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                (link.to === "/loja" && pathname.startsWith("/loja")) || (link.to === "/" && pathname === "/")
                  ? "text-white bg-white/10"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a href={getConsultoriaUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2 px-4 hidden sm:inline-flex">
          Consultoria
        </a>
      </div>
    </nav>
  );
}
