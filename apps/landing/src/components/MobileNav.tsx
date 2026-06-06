import { Link, useLocation } from "react-router-dom";

export function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-6 bg-background/90 backdrop-blur-xl border-t border-white/5">
      <Link to="/" className={`flex flex-col items-center text-xs font-bold ${pathname === "/" ? "text-primary" : "text-muted"}`}>
        <span>🏠</span> Home
      </Link>
      <Link to="/loja" className={`flex flex-col items-center text-xs font-bold ${pathname.startsWith("/loja") ? "text-primary" : "text-muted"}`}>
        <span>🛒</span> Loja
      </Link>
    </nav>
  );
}
