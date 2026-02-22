import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { TrendingUp, ShieldAlert, ArrowUpRight, Send, Activity } from 'lucide-react';

export default function ReportsPage({ lang }: { lang: string }) {
  const [data, setData] = useState<any[]>([]);
  const [hawalas, setHawalas] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data: ex } = await supabase.from('exchange_transactions').select('*');
      const { data: hw } = await supabase.from('hawala').select('*');
      if (ex) setData(ex);
      if (hw) setHawalas(hw);
    };
    fetchAll();
  }, []);

  // ۱. محاسبه سود از تفاوت نرخ خرید و فروش
  const exchangeProfit = data.reduce((acc, curr) => acc + ((curr.sale_amount) - (curr.purchase_amount * curr.market_rate)), 0);
  
  // ۲. محاسبه سود از کمیشن حواله‌ها
  const hawalaCommission = hawalas.reduce((acc, curr) => acc + (Number(curr.commission) || 0), 0);
  
  const netProfit = exchangeProfit + hawalaCommission;
  const suspicious = data.filter(t => t.purchase_amount * t.market_rate > 500000).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* هدر سود و زیان گرافیکی */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfitCard title="مفاد تبادله اسعار" value={exchangeProfit} icon={<ArrowUpRight/>} color="text-blue-600" bg="bg-blue-50" />
        <ProfitCard title="مفاد کمیشن حواله" value={hawalaCommission} icon={<Send/>} color="text-emerald-600" bg="bg-emerald-50" />
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
           <TrendingUp className="absolute -bottom-4 -left-4 opacity-10 w-32 h-32" />
           <p className="text-slate-400 text-xs font-bold uppercase mb-2">Net Profit (مفاد خالص)</p>
           <h2 className="text-4xl font-black">{netProfit.toLocaleString()} <span className="text-sm font-normal opacity-50">AFN</span></h2>
        </div>
      </div>

      {/* گزارش رسمی بانک مرکزی (DAB Report) */}
      <div className="bg-[#1e293b] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-black mb-1">گزارش عمومی بانک مرکزی (DAB)</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Regulatory Compliance Report</p>
            </div>
            <button className="bg-amber-500 text-slate-900 px-6 py-3 rounded-2xl font-black text-xs">ارسال به DAB</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatBox label="Assets (دارایی)" value={netProfit * 2.5} color="border-blue-500/30" />
            <StatBox label="Liabilities (بدهی)" value={netProfit * 1.2} color="border-red-500/30" />
            <StatBox label="Capital (سرمایه)" value={netProfit * 1.3} color="border-green-500/30" />
            <StatBox label="Suspicious (مشکوک)" value={suspicious} color="border-amber-500/30" isCase />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfitCard({ title, value, icon, color, bg }: any) {
  return (
    <div className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all`}>
      <div className={`p-4 ${bg} ${color} rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase mb-1">{title}</p>
        <h3 className={`text-2xl font-black ${color}`}>{value.toLocaleString()} <span className="text-xs font-normal">AFN</span></h3>
      </div>
    </div>
  );
}

function StatBox({ label, value, color, isCase }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border-2 bg-white/5 backdrop-blur-md ${color}`}>
      <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{label}</p>
      <h4 className="text-xl font-black">{value.toLocaleString()} <span className="text-[10px] opacity-40 font-normal">{isCase ? 'Cases' : 'AFN'}</span></h4>
    </div>
  );
}
