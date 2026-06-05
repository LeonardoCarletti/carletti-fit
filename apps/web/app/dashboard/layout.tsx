"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../providers';
import { usePathname, useRouter } from 'next/navigation';

function NavLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 font-headline font-bold rounded-xl transition-all duration-200 group ${
        isActive
          ? 'text-white bg-[#1c1c1c] border border-white/5'
          : 'text-gray-500 hover:text-white hover:bg-[#1c1c1c]'
      }`}
    >
      <span className={`material-symbols-outlined ${isActive ? 'text-primary' : ''}`} data-icon={icon}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex text-sm selection:bg-primary/30 font-body">
      {/* SideNavBar (Anchor) */}
      <aside className="bg-[#131313] h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col p-4 z-50 overflow-y-auto border-r border-white/5">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#002468] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-white font-headline tracking-tighter uppercase">Carletti Fit</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Performance Hub</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavLink href="/dashboard" icon="dashboard" label="Dashboard" />
          <NavLink href="/dashboard/clients" icon="group" label="Clients" />
          <NavLink href="/dashboard/workouts" icon="fitness_center" label="Workouts" />
          <NavLink href="/dashboard/store" icon="store" label="Loja" />
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 font-headline font-bold hover:text-white hover:bg-[#1c1c1c] rounded-xl transition-all duration-200 group">
            <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
            <span>AI Insights</span>
          </Link>
          <NavLink href="/workout" icon="smartphone" label="Mobile View" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button className="w-full bg-primary text-white py-3 rounded-xl font-headline font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">add</span>
            New Program
          </button>
          
          <div className="mt-6 flex items-center gap-3 px-2 group relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#252525] to-[#3a3a3a] flex items-center justify-center font-bold text-white border border-white/10">
              {user?.email?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.email?.split('@')[0] || "Coach"}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Elite Tier</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-colors group/logout"
              title="Sair"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="md:ml-64 flex-1 flex flex-col min-w-0 min-h-screen pb-24 md:pb-8">
        {/* TopNavBar */}
        <header className="bg-[#0a0a0a]/80 backdrop-blur-md flex justify-between items-center px-6 py-4 w-full sticky top-0 z-40 border-b border-white/5">
          <div className="flex items-center gap-4">
             <div className="text-sm font-black tracking-widest text-[#5f8bff] font-headline uppercase hidden md:block">Master Dashboard</div>
             <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
             <div className="flex items-center gap-4">
               <span className="text-gray-500 font-headline text-xs font-bold hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Metrics</span>
               <span className="text-gray-500 font-headline text-xs font-bold hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Library</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-white transition-colors relative">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-[#0a0a0a]"></span>
              </button>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                 <span className="material-symbols-outlined" data-icon="settings">settings</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="p-6 md:p-8 flex-1 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-[#131313]/90 backdrop-blur-xl border-t border-white/5">
        <Link href="/dashboard" className={`flex flex-col items-center justify-center ${pathname === '/dashboard' ? 'text-primary' : 'text-gray-500'}`}>
           <span className="material-symbols-outlined">dashboard</span>
           <span className="font-bold text-[9px] uppercase tracking-widest mt-1">Home</span>
        </Link>
        <Link href="/dashboard/clients" className={`flex flex-col items-center justify-center ${pathname.startsWith('/dashboard/clients') ? 'text-primary' : 'text-gray-500'}`}>
           <span className="material-symbols-outlined">group</span>
           <span className="font-bold text-[9px] uppercase tracking-widest mt-1">Clients</span>
        </Link>
        <Link href="/dashboard/store" className={`flex flex-col items-center justify-center ${pathname.startsWith('/dashboard/store') ? 'text-primary' : 'text-gray-500'}`}>
           <span className="material-symbols-outlined">store</span>
           <span className="font-bold text-[9px] uppercase tracking-widest mt-1">Loja</span>
        </Link>
        <Link href="/workout" className={`flex flex-col items-center justify-center ${pathname === '/workout' ? 'text-primary' : 'text-gray-500'}`}>
           <span className="material-symbols-outlined">fitness_center</span>
           <span className="font-bold text-[9px] uppercase tracking-widest mt-1">Workout</span>
        </Link>
      </nav>
    </div>
  );
}
