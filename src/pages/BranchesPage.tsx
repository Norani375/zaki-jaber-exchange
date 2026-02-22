import { Building2, ArrowRightLeft } from 'lucide-react';

export default function BranchesPage({ lang }: any) {
  const branches = [
    { name: 'نمایندگی مرکزی کندز', manager: 'احمد ذکی تنها', afn: '5,263,000', usd: '85,000' },
    { name: 'نمایندگی کابل', manager: 'حسیب الله', afn: '1,120,000', usd: '12,000' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
        <Building2 className="text-blue-600" size={28} /> 
        {lang === 'en' ? 'Branch Management' : 'مدیریت نمایندگی‌ها'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map(b => (
          <div key={b.name} className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:border-blue-500 transition-all">
            <h3 className="font-black text-lg mb-1 text-slate-800">{b.name}</h3>
            <p className="text-xs text-slate-400 mb-6 font-bold">
              {lang === 'en' ? 'Manager: ' : 'مدیر مسئول: '} {b.manager}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                  <p className="text-[10px] font-black text-blue-400 uppercase">CASH AFN</p>
                  <p className="font-black text-blue-700 text-lg">{b.afn}</p>
               </div>
               <div className="bg-emerald-50 p-4 rounded-2xl text-center border border-emerald-100">
                  <p className="text-[10px] font-black text-emerald-400 uppercase">CASH USD</p>
                  <p className="font-black text-emerald-700 text-lg">{b.usd}</p>
               </div>
            </div>
            
            <button className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-200">
               <ArrowRightLeft size={16}/> 
               {lang === 'en' ? 'Transfer to Head Office' : 'انتقال سرمایه به مرکز'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
