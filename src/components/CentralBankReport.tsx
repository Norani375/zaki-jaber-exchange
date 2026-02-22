import { ShieldCheck } from 'lucide-react'

export default function CentralBankReport({ lang }: { lang: string }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black flex items-center gap-3">
          <ShieldCheck className="text-amber-400" /> 
          {lang === 'en' ? 'DAB Compliance' : 'گزارش انطباق بانک مرکزی'}
        </h2>
        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold">Verified ✅</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase">Limit</p>
          <p className="text-lg font-bold tracking-widest">500,000 AFN</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase">Alerts</p>
          <p className="text-lg font-bold">0</p>
        </div>
      </div>
    </div>
  )
}
