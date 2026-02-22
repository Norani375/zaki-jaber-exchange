import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Send, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function HawalaPage() {
  const [hawalas, setHawalas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHawalas = async () => {
    const { data } = await supabase.from('hawala').select('*').order('created_at', { ascending: false });
    if (data) setHawalas(data);
  };

  useEffect(() => { fetchHawalas() }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2"><Send className="text-blue-600" /> مدیریت حواله‌ها</h2>
        <div className="flex gap-4">
          <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl text-xs font-black border border-amber-100">
            نا اجرا: {hawalas.filter(h => h.status === 'unpaid').length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hawalas.map(h => (
          <div key={h.id} className={`p-5 rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${h.status === 'unpaid' ? 'border-r-4 border-r-amber-500' : 'border-r-4 border-r-green-500'}`}>
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="font-black text-slate-800">{h.customer_name}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{h.destination}</p>
               </div>
               <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${h.status === 'unpaid' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                  {h.status === 'unpaid' ? 'UNPAID' : 'PAID'}
               </span>
            </div>
            <div className="text-xl font-black text-blue-600 mb-2">{h.amount.toLocaleString()} <span className="text-xs">{h.currency_code}</span></div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 border-t pt-3">
               <span>کمیشن: {h.commission}</span>
               <button className="text-blue-600 hover:underline">مشاهده جزئیات</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
