import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MobileNav } from "./components/MobileNav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { CalculadoraCargaGlicemica } from "./pages/tools/CalculadoraCargaGlicemica";
import { GuiaMarcas } from "./pages/tools/GuiaMarcas";
import { Top10Enganos } from "./pages/tools/Top10Enganos";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/loja/ferramentas/calculadora-carga-glicemica" element={<CalculadoraCargaGlicemica />} />
          <Route path="/loja/ferramentas/guia-marcas-expandido" element={<GuiaMarcas />} />
          <Route path="/loja/ferramentas/top-10-enganos" element={<Top10Enganos />} />
        </Routes>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
