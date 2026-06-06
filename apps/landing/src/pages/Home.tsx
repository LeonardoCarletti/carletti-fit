import { Link } from "react-router-dom";
import { getConsultoriaUrl, products, formatPrice } from "../data/products";

export function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-muted">Precision Protocol</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            Performance metabólica de{" "}
            <span className="text-gradient">elite</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Consultoria online de treino, nutrição e performance metabólica.
            Especialidade real em Diabetes Mellitus. Domine a própria fisiologia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getConsultoriaUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
              Agendar Consultoria
            </a>
            <Link to="/loja" className="btn-ghost text-center">
              Ver Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Especialidade */}
      <section id="especialidade" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-accent font-bold">Especialidade</span>
            <h2 className="font-display text-4xl font-bold">Diabético Imortal</h2>
            <p className="text-muted leading-relaxed">
              Protocolo desenvolvido para quem vive com diabetes e não aceita limitações.
              Treino de alta performance, nutrição estratégica e controle glicêmico integrado.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["DM Tipo 1", "DM Tipo 2", "CGM Integration", "Performance"].map((tag) => (
                <div key={tag} className="card p-4 text-center">
                  <span className="text-sm font-bold">{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8 space-y-4">
            <h3 className="font-display text-xl font-bold">O que você recebe</h3>
            {[
              "Treino periodizado com ajustes semanais",
              "Nutrição com foco em carga glicêmica",
              "Monitoramento de métricas metabólicas",
              "Suporte direto via WhatsApp",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted">
                <span className="text-accent">✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocolo */}
      <section id="protocolo" className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="font-display text-4xl font-bold">Precision Protocol</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Diagnóstico", desc: "Anamnese completa, histórico glicêmico e avaliação de performance." },
              { step: "02", title: "Prescrição", desc: "Treino e nutrição personalizados com periodização inteligente." },
              { step: "03", title: "Otimização", desc: "Ajustes semanais baseados em dados reais de CGM, HRV e performance." },
            ].map((item) => (
              <div key={item.step} className="card p-8 text-left space-y-3">
                <span className="font-mono text-primary text-sm">{item.step}</span>
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loja preview */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Loja</span>
            <h2 className="font-display text-4xl font-bold mt-2">Produtos digitais</h2>
          </div>
          <Link to="/loja" className="text-primary font-bold text-sm hover:underline">Ver todos →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <Link key={p.id} to="/loja" className="card p-6 hover:bg-white/5 transition-colors space-y-3">
              {p.badge && (
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{p.badge}</span>
              )}
              <h3 className="font-display font-bold text-lg">{p.name}</h3>
              <p className="text-sm text-muted line-clamp-2">{p.description}</p>
              <span className="text-xl font-display font-bold text-primary">{formatPrice(p.price)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto card p-12 text-center space-y-6 bg-gradient-to-br from-primary/10 to-accent/5">
          <h2 className="font-display text-3xl font-bold">Pronto para dominar sua fisiologia?</h2>
          <p className="text-muted">Agende sua consultoria ou explore os produtos digitais na loja.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={getConsultoriaUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Falar no WhatsApp
            </a>
            <Link to="/loja" className="btn-ghost">Explorar Loja</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
