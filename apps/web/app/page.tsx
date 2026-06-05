import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="pt-16">
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#131313] dark:bg-[#131313] flex justify-between items-center px-6 py-3 border-none font-headline text-sm font-medium">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-tight text-white">Carletti Fit</span>
          <div className="hidden md:flex items-center gap-6">
            <Link className="text-white font-bold transition-colors" href="#">Home</Link>
            <Link className="text-gray-400 hover:bg-[#252525] transition-colors px-3 py-1 rounded-lg" href="#features">Features</Link>
            <Link className="text-gray-400 hover:bg-[#252525] transition-colors px-3 py-1 rounded-lg" href="#how-it-works">How It Works</Link>
            <Link className="text-gray-400 hover:bg-[#252525] transition-colors px-3 py-1 rounded-lg" href="#testimonials">Success Stories</Link>
            <Link className="text-gray-400 hover:bg-[#252525] transition-colors px-3 py-1 rounded-lg" href="/loja">Loja</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-400 hover:text-white px-4 py-2 transition-all">Log In</Link>
          <Link href="/login" className="bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-on-primary-container px-5 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all text-xs">Start Free Trial</Link>
        </div>
      </nav>

      <main>
        <section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/20 via-[#131313]/80 to-[#131313] z-10"></div>
            <img 
              className="w-full h-full object-cover grayscale-[0.4]" 
              alt="Intense athlete" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa82BW8_Uqy2hWJ2ugKmh9ieEtqSP9XHbW9poOVAFuvnLp-Y8gcizKPN3x0Quk_cSMaKqVAU4RHkg5MCHr6tuTeUP8V1ZF5oBDgd83wRvyOsojVmt-bNQ_V4d0PzcJEJl6KpatDW8HkfjPlSdJOY6IXQzxuI32efCSM6gPv8f3OxuNcM-GfzPSgteo8HBmsW79E6Gohi6ScZE3lIgE6KFAb2nnRXkVEXUxy6ivQT5WQllsbRypBcYyX5HcX6rerGI9F3uBu0bnccc"
            />
          </div>
          <div className="relative z-20 max-w-5xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Trusted by 500+ Elite Coaches</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-extrabold tracking-tighter text-white leading-[0.9]">
              Scale your coaching with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">AI-powered precision.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-body">
              The ultimate SaaS ecosystem for performance professionals. Automate your workflow, track every metric, and deliver world-class results at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-xl text-lg hover:shadow-[0_0_30px_rgba(95,139,255,0.4)] transition-all text-center">Start Your Journey</Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-surface-container-highest border border-outline-variant/30 text-white font-bold rounded-xl text-lg hover:bg-surface-bright transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span> Request Demo
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto" id="features">
           <div className="text-center mb-12">
             <h2 className="text-4xl font-headline font-extrabold text-white">Engineered Intelligence</h2>
           </div>
        </section>
      </main>
    </div>
  );
}
