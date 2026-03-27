"use client";
import { useEffect, useState } from "react";
import { 
  listClientsApiV1ClientsGet, 
  createClientApiV1ClientsPost 
} from "@fitness/api-client/src/services.gen";

interface Client {
  id: number;
  email: string;
  is_active: boolean;
  profile?: {
    full_name: string;
    avatar_url?: string;
  };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const res = await listClientsApiV1ClientsGet();
      if (res.data) {
        setClients(res.data as Client[]);
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createClientApiV1ClientsPost({
        body: {
          full_name: newClientName,
          email: newClientEmail,
        }
      });
      setIsModalOpen(false);
      setNewClientName("");
      setNewClientEmail("");
      fetchClients(); // Refresh list
    } catch (error) {
      console.error("Error creating client", error);
      alert("Erro ao criar aluno. Verifique os dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-white mb-2">Clients</h2>
          <p className="text-gray-400 font-medium font-body">Manage and track your elite athlete roster.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-headline font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(95,139,255,0.2)]"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Add Client
          </button>
        </div>
      </div>

      {/* Kinetic Filters Bar */}
      <div className="bg-surface-container-low p-4 rounded-2xl flex flex-wrap items-center gap-6 mb-8 border border-white/5">
         <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-2">Status:</span>
            <select className="bg-transparent border-none text-sm font-semibold text-primary focus:ring-0 cursor-pointer py-1 outline-none">
               <option>All Statuses</option>
               <option>Active</option>
               <option>Inactive</option>
            </select>
         </div>
         <div className="w-[1px] h-4 bg-white/10 hidden md:block"></div>
         <div className="ml-auto relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">filter_list</span>
            <input 
              className="bg-[#1c1c1c] border border-white/5 rounded-lg pl-10 pr-4 py-2 text-xs text-white w-48 focus:w-64 transition-all focus:border-primary/30 outline-none" 
              placeholder="Search name or ID..." 
              type="text"
            />
         </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-[#131313] rounded-3xl overflow-hidden border border-white/5 shadow-2xl mb-8">
        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                 <tr className="bg-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500">Client Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500 hidden sm:table-cell">Email</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500 hidden lg:table-cell">Program</th>
                    <th className="px-6 py-4 text-[10px] font-bold font-label uppercase tracking-wider text-gray-500 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-body">
                 {isLoading ? (
                   <tr>
                     <td colSpan={5} className="px-6 py-20 text-center text-gray-500 animate-pulse">
                       Carregando atletas...
                     </td>
                   </tr>
                 ) : clients.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                       Nenhum aluno encontrado. Comece adicionando um novo!
                     </td>
                   </tr>
                 ) : clients.map((client) => (
                   <tr key={client.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#252525] to-[#3a3a3a] flex items-center justify-center text-white font-bold">
                              {client.profile?.full_name?.charAt(0) || "A"}
                            </div>
                            <div>
                               <p className="font-headline font-bold text-white text-sm">{client.profile?.full_name || "Sem Nome"}</p>
                               <p className="text-[10px] text-gray-500 font-medium">ID: #{client.id}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <span className="text-sm font-medium text-gray-400">{client.email}</span>
                      </td>
                      <td className="px-6 py-5">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${client.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                           {client.is_active ? 'Active' : 'Inactive'}
                         </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-500 italic">No active program</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                         <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white/5 text-white rounded-lg hover:bg-primary transition-all"><span className="material-symbols-outlined text-sm">visibility</span></button>
                            <button className="p-2 bg-white/5 text-white rounded-lg hover:bg-primary transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#131313] border border-white/10 rounded-3xl p-8 shadow-2xl scale-in-center">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white font-headline">New Pupil</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddClient} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <input 
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl text-white focus:border-primary outline-none transition-all font-body"
                    placeholder="Ex: Marcus Sterling"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-white/5 rounded-xl text-white focus:border-primary outline-none transition-all font-body"
                    placeholder="marcus@email.com"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                  type="submit"
                >
                  {isSubmitting ? "Adding..." : "Confirm & Send invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
