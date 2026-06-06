import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Carletti Fit" className="w-10 h-10 rounded-lg" />
          <div>
            <p className="font-display font-bold text-white">Carletti Fit</p>
            <p className="text-xs text-muted">diabeticoimortal.fit</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm text-muted">
          <Link to="/loja" className="hover:text-white transition-colors">Loja</Link>
          <a href="/#protocolo" className="hover:text-white transition-colors">Protocolo</a>
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} Carletti Fit. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
