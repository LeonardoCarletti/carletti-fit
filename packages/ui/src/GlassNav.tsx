import * as React from 'react';

export interface GlassNavProps {
  appName: string;
  links: { label: string; href: string }[];
  onLogin?: () => void;
  onTrial?: () => void;
}

export function GlassNav({ appName, links, onLogin, onTrial }: GlassNavProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#131313]/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 border-none font-headline text-sm font-medium">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold tracking-tight text-white">{appName}</span>
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a 
              key={link.label} 
              className="text-gray-400 hover:bg-[#252525] hover:text-white transition-colors px-3 py-1 rounded-lg" 
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {onLogin && (
          <button onClick={onLogin} className="hidden md:block text-gray-400 hover:text-white px-4 py-2 transition-all">
            Log In
          </button>
        )}
        {onTrial && (
          <button onClick={onTrial} className="bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] text-[#002468] px-5 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">
            Start Free Trial
          </button>
        )}
      </div>
    </nav>
  );
}
