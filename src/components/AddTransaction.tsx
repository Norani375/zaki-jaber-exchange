import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { PlusCircle, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react'

export default function AddTransaction({ onRefresh }: { onRefresh: () => void }) {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('credit')
  const [currency, setCurrency] = useState('AFN')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return
    setIsSubmitting(true)
    const { error } = await supabase.from('transactions').insert([{ amount: Number(amount), type, currency_code: currency }])
    if (!error) { setAmount(''); onRefresh(); }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 transition-all hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200"><PlusCircle size={22} /></div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight">ثبت عملیات مالی سریع</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">مبلغ تراکنش</label>
            <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-xl font-black text-slate-700" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">واحد ارز</label>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1">
              {['AFN', 'USD', 'IRT'].map((c) => (
                <button key={c} type="button" onClick={() => setCurrency(c)} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${currency === c ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">نوع تراکنش</label>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1">
              <button type="button" onClick={() => setType('credit')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${type === 'credit' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400'}`}><ArrowUpRight size={16} /> واریز</button>
              <button type="button" onClick={() => setType('debit')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${type === 'debit' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400'}`}><ArrowDownLeft size={16} /> برداشت</button>
            </div>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
          {isSubmitting ? <Loader2 className="animate-spin" size={22} /> : 'تایید و ثبت در سیستم'}
        </button>
      </form>
    </div>
  )
}
