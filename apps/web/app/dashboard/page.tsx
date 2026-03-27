"use client";
import { useEffect, useState } from "react";
import { listClientsApiV1ClientsGet } from "@fitness/api-client/src/services.gen";
import Link from "next/link";

export default function CoachDashboardPage() {
  const [clientCount, setClientCount] = useState(0);
  const [recentClients, setRecentClients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listClientsApiV1ClientsGet();
        if (res.data) {
          setClientCount(res.data.length);
          setRecentClients(res.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-white mb-2">Dashboard</h2>
          <p className="text-gray-400 font-medium font-body">Welcome back, Coach. Here's your performance overview.</p>
        </div>
      </div>

      {/* Key Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
        <div className="bg-[#131313] p-6 rounded-2xl flex flex-col justify-between group hover:bg-white/5 transition-colors border border-white/5">
          <div className="flex justify-between items-start mb-4">
             <span className="p-2 bg-primary/10 text-primary rounded-lg material-symbols-outlined">group</span>
             <span className="text-emerald-500 text-xs font-bold">Live</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-label uppercase tracking-wider font-bold">Active Students</p>
            <h3 className="text-4xl font-extrabold font-headline mt-1 text-white">
              {isLoading ? "..." : clientCount}
            </h3>
          </div>
        </div>

        <div className="bg-[#131313] p-6 rounded-2xl flex flex-col justify-between group border border-white/5 border-l-4 border-l-red-500/50">
          <div className="flex justify-between items-start mb-4">
             <span className="p-2 bg-red-500/10 text-red-500 rounded-lg material-symbols-outlined">warning</span>
             <span className="text-red-500 text-xs font-bold">0</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-label uppercase tracking-wider font-bold">At Risk</p>
            <h3 className="text-4xl font-extrabold font-headline mt-1 text-white">0</h3>
          </div>
        </div>

        <div className="bg-[#131313] p-6 rounded-2xl flex flex-col justify-between group hover:bg-white/5 transition-colors border border-white/5">
          <div className="flex justify-between items-start mb-4">
             <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg material-symbols-outlined">trending_up</span>
             <span className="text-emerald-500 text-xs font-bold">+24</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-label uppercase tracking-wider font-bold">Total PRs</p>
            <h3 className="text-4xl font-extrabold font-headline mt-1 text-white">24</h3>
          </div>
        </div>

        <div className="bg-gradient-to-tr from-[#5f8bff] to-[#b3c5ff] p-6 rounded-2xl flex flex-col justify-between shadow-xl shadow-primary/20">
          <div className="flex justify-between items-start mb-4">
             <span className="p-2 bg-white/20 text-white rounded-lg material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div>
             <p className="text-[#002468]/70 text-xs font-label uppercase tracking-wider font-bold">AI Insights</p>
             <h3 className="text-4xl font-extrabold font-headline mt-1 text-[#002468]">3</h3>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students Table */}
        <section className="lg:col-span-2 bg-[#131313] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <div className="px-6 py-6 flex justify-between items-center">
             <h3 className="text-lg font-bold font-headline text-white">Recent Students</h3>
             <Link href="/dashboard/clients" className="text-primary text-sm font-bold hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[500px]">
               <thead>
                 <tr className="bg-white/5 border-none">
                   <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-gray-500">Student</th>
                   <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-gray-500">Email</th>
                   <th className="px-6 py-4 text-[10px] font-label font-bold uppercase tracking-widest text-gray-500">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 font-body">
                 {isLoading ? (
                   <tr><td colSpan={3} className="px-6 py-10 text-center animate-pulse text-gray-500">Loading...</td></tr>
                 ) : recentClients.map(client => (
                   <tr key={client.id} className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center text-[10px] font-bold text-white">
                           {client.profile?.full_name?.charAt(0) || "U"}
                         </div>
                         <span className="text-sm font-semibold text-white">{client.profile?.full_name}</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-sm text-gray-400">{client.email}</td>
                     <td className="px-6 py-4">
                       <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold uppercase tracking-tighter">Active</span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </section>

        {/* AI Insights Sidebar */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold font-headline text-white">AI Insights</h3>
            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[10px] font-bold">READY</span>
          </div>

          <div className="space-y-4 font-body">
             <div className="bg-[#131313] p-4 rounded-2xl border-l-4 border-primary border-white/5">
                <div className="flex items-start gap-3">
                   <span className="material-symbols-outlined text-primary">analytics</span>
                   <div>
                     <p className="text-white text-sm font-semibold">Plateau detected in Bench Press</p>
                     <p className="text-gray-500 text-xs mt-1">Suggesting variation change for Student John.</p>
                     <button className="mt-3 text-primary text-xs font-bold flex items-center gap-1 group">
                         Apply Suggestion
                         <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                     </button>
                   </div>
                </div>
             </div>

             <div className="bg-[#131313] p-4 rounded-2xl border-l-4 border-amber-500 border-white/5">
                <div className="flex items-start gap-3">
                   <span className="material-symbols-outlined text-amber-500">notifications_active</span>
                   <div>
                     <p className="text-white text-sm font-semibold">Engagement gap</p>
                     <p className="text-gray-500 text-xs mt-1">Maria hasn't logged reps in 4 days.</p>
                   </div>
                </div>
             </div>
          </div>
          
          <button className="w-full py-3 bg-[#131313] text-white text-sm font-bold rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
              View All Insights
          </button>
        </section>
      </div>
    </>
  );
}
