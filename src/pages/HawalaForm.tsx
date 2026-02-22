import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, Loader2, User, MapPin } from 'lucide-react';

export default function HawalaForm({ lang }: any) {
  const [loading, setLoading] = useState(false);
  const [sender, setSender] = useState('');

  const handleHawala = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('hawala').insert([{ customer_name: sender, status: 'unpaid' }]);
    if (!error) alert(lang === 'en' ? 'Hawala Sent!' : 'حواله ثبت شد');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-4">
        <div className="p-4 bg-blue-600 rounded-3xl text-white shadow-xl"><Send size={28} /></div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">{lang === 'en' ? 'Send Hawala' : 'ثبت حواله ارسالی'}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tracking-tighter">Fast Transfer Service</p>
        </div>
      </div>

      <form onSubmit={handleHawala} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-300" size={20} />
            <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold" placeholder="فرستنده (Sender)" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-300" size={20} />
            <input type="text" className="w-full bg-slate-50 p-4 pl-12 rounded-2xl outline-none focus:ring-2 ring-blue-500 font-bold" placeholder="مقصد (Destination)" />
          </div>
        </div>
        <button disabled={loading} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
          {loading ? <Loader2 className="animate-spin" /> : t('save')}
        </button>
      </form>
    </div>
  );
}
