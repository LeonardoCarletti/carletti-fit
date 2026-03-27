"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../providers";
import { listWorkoutsApiV1WorkoutsGet } from "@fitness/api-client/src/services.gen";
import Link from "next/link";

export default function WorkoutMobilePage() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await listWorkoutsApiV1WorkoutsGet();
        if (res.data) {
          setWorkouts(res.data);
        }
      } catch (error) {
        console.error("Error fetching workouts", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-32">
       {/* Mobile Header */}
       <header className="p-6 pt-12 flex justify-between items-start bg-gradient-to-b from-[#131313] to-transparent gap-4">
          <div>
             <h1 className="text-3xl font-black text-white font-headline tracking-tight">Today's Lift</h1>
             <p className="text-gray-500 font-medium font-body">Push your limits, break your records.</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
             <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
          </div>
       </header>

       <main className="px-6 mt-4 space-y-6">
          {isLoading ? (
            <div className="py-20 text-center animate-pulse text-gray-500 font-body">Preparing your session...</div>
          ) : workouts.length === 0 ? (
            <div className="bg-[#131313] p-10 rounded-3xl border border-white/5 text-center space-y-4">
               <span className="material-symbols-outlined text-6xl text-gray-800">fitness_center</span>
               <h3 className="text-xl font-bold text-white">No workout assigned yet</h3>
               <p className="text-gray-500 text-sm font-body">Your coach hasn't scheduled today's session. Time for a rest day?</p>
            </div>
          ) : (
            workouts.map(workout => (
              <div key={workout.id} className="bg-gradient-to-tr from-[#131313] to-[#1c1c1c] p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-8xl">bolt</span>
                 </div>
                 
                 <div className="relative z-10">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {workout.intensity} Intensity
                    </span>
                    <h2 className="text-2xl font-black text-white font-headline mt-3">{workout.name}</h2>
                    <div className="flex gap-4 mt-4 font-label text-xs font-bold text-gray-400">
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {workout.duration_minutes}m</span>
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">layers</span> {workout.volume} Volume</span>
                    </div>

                    <button className="mt-8 w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
                       Start Session <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                 </div>
              </div>
            ))
          )}

          {/* Progress Card */}
          <section className="bg-surface-container-low rounded-3xl p-6 border border-white/5">
             <h4 className="text-sm font-bold text-white font-headline mb-4">Weekly Adherence</h4>
             <div className="flex justify-between items-end h-32 gap-3">
                {[40, 70, 45, 90, 65, 30, 0].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                     <div className="w-full bg-[#1c1c1c] rounded-lg relative overflow-hidden flex-1">
                        <div 
                          className={`absolute bottom-0 w-full transition-all duration-1000 ${i === 3 ? 'bg-primary' : 'bg-gray-800'}`} 
                          style={{ height: `${h}%` }}
                        ></div>
                     </div>
                     <span className="text-[10px] font-bold text-gray-600">{"MTWTFSS"[i]}</span>
                  </div>
                ))}
             </div>
          </section>
       </main>

       {/* Mobile Nav */}
       <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-10 pt-4 bg-[#131313]/80 backdrop-blur-xl rounded-t-[40px] border-t border-white/5">
          <Link href="/dashboard" className="flex flex-col items-center text-gray-500">
             <span className="material-symbols-outlined">home</span>
             <span className="text-[10px] font-bold mt-1">Home</span>
          </Link>
          <div className="relative -top-10">
             <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 border-8 border-[#0a0a0a]">
                <span className="material-symbols-outlined text-3xl">add</span>
             </button>
          </div>
          <Link href="/workout" className="flex flex-col items-center text-primary">
             <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>fitness_center</span>
             <span className="text-[10px] font-bold mt-1">Training</span>
          </Link>
       </nav>
    </div>
  );
}
