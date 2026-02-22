import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Coins, Save, Loader2 } from 'lucide-react';

export default function NewExchange({ lang }: any) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(63.20);

  const total = amount * rate;

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('exchange_transactions').insert([
      { purchase_amount: amount, market_rate: rate, sale_amount: total, currency_code: 'USD' }
    ]);
    if (!error) alert(lang === 'en' ? 'Saved!' : 'با موفقیت ثبت شد');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in duration-500">
      <div className="bg-[#1a222f] p-6 text-white flex items-center gap-3">
        <Coins className="text-blue-500" />
        <h2 className="font-black uppercase tracking-widest text-sm">New Exchange - تبادله جدید</h2>
      </div>
      
      <form onSubmit={handleSave} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase">Customer Name</label>
          <input type="text" className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold" placeholder="نام مشتری" />
          
          <label className="block text-[10px] font-black text-slate-400 uppercase">Purchase Amount (USD)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-black text-xl" placeholder="0.00" />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-400 uppercase">Market Rate (USD to AFN)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-blue-50 p-4 rounded-2xl outline-none border-2 border-blue-100 font-black text-blue-600 text-xl" />
          
          <div className="p-6 bg-slate-900 rounded-2xl text-white">
            <p className="text-[9px] font-bold opacity-50 uppercase">Total Payable (AFN)</p>
            <p className="text-3xl font-black">{total.toLocaleString()} <span className="text-xs font-normal">AFN</span></p>
          </div>
        </div>

        <button disabled={loading} className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95">
          {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> {lang === 'en' ? 'Save Transaction' : 'ثبت در سیستم'}</>}
        </button>
      </form>
    </div>
  );
}
