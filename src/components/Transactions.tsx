import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { PlusCircle, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react'

export default function AddTransaction({ onRefresh }: { onRefresh: () => void }) {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('credit')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) return

    setIsSubmitting(true)
    const { error } = await supabase
      .from('transactions')
      .insert([{ 
        amount: Number(amount), 
        type: type,
        created_at: new Date().toISOString() 
      }])

    if (!error) {
      setAmount('')
      onRefresh()
    } else {
      alert("خطا در ثبت تراکنش: " + error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 mb-10 transition-all hover:shadow-2xl hover:shadow-blue-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <PlusCircle size={20} />
        </div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight">عملیات مالی سریع</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* بخش وارد کردن مبلغ */}
          <div className="relative group">
            <label className="block text-xs font-bold text-slate-400 mb-2 mr-2 uppercase tracking-widest">مبلغ تراکنش (AFN)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-lg font-black text-slate-700 placeholder:text-slate-300"
              required
            />
          </div>

          {/* بخش انتخاب نوع تراکنش */}
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 mr-2 uppercase tracking-widest">نوع عملیات</label>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-1.5 rounded-2xl border-2 border-transparent">
              <button
                type="button"
                onClick={() => setType('credit')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  type === 'credit' 
                  ? 'bg-white text-green-600 shadow-md scale-100' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <ArrowUpRight size={18} /> واریز
              </button>
              <button
                type="button"
                onClick={() => setType('debit')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  type === 'debit' 
                  ? 'bg-white text-red-600 shadow-md scale-100' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <ArrowDownLeft size={18} /> برداشت
              </button>
            </div>
          </div>
        </div>

        {/* دکمه ثبت نهایی */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-12 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                در حال ثبت...
              </>
            ) : (
              'تایید و ثبت تراکنش'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
