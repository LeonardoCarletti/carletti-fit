"use client";
import { useEffect, useState } from "react";
import { 
  listWorkoutsApiV1WorkoutsGet, 
  createWorkoutApiV1WorkoutsPost,
  listClientsApiV1ClientsGet
} from "@fitness/api-client/src/services.gen";

interface Client {
  id: number;
  email: string;
  profile?: {
    full_name: string;
  };
}

interface Workout {
  id: number;
  name: string;
  intensity: string;
  volume: string;
  duration_minutes: number;
  client_id: number;
  created_at: string;
}

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [clientId, setClientId] = useState<number | "">("");
  const [intensity, setIntensity] = useState("Medium");
  const [volume, setVolume] = useState("Moderate");
  const [duration, setDuration] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [workoutsRes, clientsRes] = await Promise.all([
        listWorkoutsApiV1WorkoutsGet(),
        listClientsApiV1ClientsGet()
      ]);
      
      if (workoutsRes.data) setWorkouts(workoutsRes.data as Workout[]);
      if (clientsRes.data) setClients(clientsRes.data as Client[]);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return alert("Select a student");
    
    setIsSubmitting(true);
    try {
      await createWorkoutApiV1WorkoutsPost({
        body: {
          name,
          client_id: Number(clientId),
          intensity,
          volume,
          duration_minutes: duration,
          exercises: [] // Scaffold inicial
        }
      });
      setIsModalOpen(false);
      setName("");
      setClientId("");
      fetchData(); // Refresh list
    } catch (error) {
      console.error("Error creating workout", error);
      alert("Error creating workout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-white mb-2">Workouts</h2>
          <p className="text-gray-400 font-medium font-body">Prescribe and manage elite training protocols.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-headline font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(95,139,255,0.2)]"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Workout
        </button>
      </div>

      <div className="bg-[#131313] rounded-3xl overflow-hidden border border-white/5 shadow-2xl mb-8">
        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                 <tr className="bg-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500">Workout Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500">Intensity</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500">Student ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-body">
                 {isLoading ? (
                    <tr><td colSpan={4} className="px-6 py-20 text-center text-gray-500 animate-pulse">Loading workouts...</td></tr>
                 ) : workouts.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-20 text-center text-gray-500">No workouts created. Start now!</td></tr>
                 ) : workouts.map((workout) => (
                    <tr key={workout.id} className="hover:bg-white/5 transition-colors group">
                       <td className="px-6 py-5 font-bold text-white text-sm">{workout.name}</td>
                       <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase">
                            {workout.intensity}
                          </span>
                       </td>
                       <td className="px-6 py-5 text-sm text-gray-400">Atleta #{workout.client_id}</td>
                       <td className="px-6 py-5 text-right">
                          <button className="p-2 bg-white/5 text-white rounded-lg hover:bg-primary transition-all">
                            <span className="material-symbols-outlined text-sm">visibility</span>
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#131313] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white font-headline mb-6">Create Protocol</h3>
            
            <form onSubmit={handleCreateWorkout} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Workout Name</label>
                  <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl text-white outline-none focus:border-primary transition-all" placeholder="Ex: Leg Day Elite" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Select Student</label>
                  <select required value={clientId} onChange={(e) => setClientId(Number(e.target.value))} className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl text-white outline-none focus:border-primary transition-all">
                    <option value="">Choose athlete...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.profile?.full_name || c.email}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Intensity</label>
                    <select value={intensity} onChange={(e) => setIntensity(e.target.value)} className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl text-white outline-none">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Duration (min)</label>
                    <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl text-white outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-xl">Cancel</button>
                <button disabled={isSubmitting} type="submit" className="flex-1 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
                  {isSubmitting ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
