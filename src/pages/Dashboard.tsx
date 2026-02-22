import { Wallet, Landmark, Users, UserCircle, Building } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header Stat */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 italic">Financial Overview</h2>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Zaki Jaber Exchange Co.</p>
        </div>
        <div className="px-6 py-3 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-amber-200 cursor-pointer hover:scale-95 transition-all">
          ۶۰ روزه عدم بردگی پول
        </div>
      </div>

      {/* Main Cash Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Cash in Hand</h3>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:rotate-12 transition-transform"><Wallet size={24}/></div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-baseline border-b border-slate-50 pb-4">
              <span className="text-sm font-bold text-slate-500">USD</span>
              <span className="text-4xl font-black text-slate-800 tracking-tighter">-206,777</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-500">AFN</span>
              <span className="text-4xl font-black text-blue-600 tracking-tighter">57,656,719</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <Landmark className="absolute -bottom-10 -left-10 w-48 h-48 opacity-5 group-hover:scale-110 transition-transform" />
          <h3 className="text-xs font-bold opacity-40 mb-10 uppercase tracking-widest relative z-10">Branch Liquidity</h3>
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
              <span className="text-sm font-medium text-slate-500 uppercase">Total USD</span>
              <span className="text-4xl font-black tracking-tighter">47,403</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-slate-500 uppercase">Total AFN</span>
              <span className="text-4xl font-black text-emerald-400 tracking-tighter">7,065,715</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Customers" value="50" icon={<Users size={18}/>} />
        <StatCard label="Individual" value="36" icon={<UserCircle size={18}/>} />
        <StatCard label="Corporate" value="15" icon={<Building size={18}/>} />
        <StatCard label="Branches" value="3" icon={<Landmark size={18}/>} />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
      <div className="text-slate-300">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
        <p className="text-xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
