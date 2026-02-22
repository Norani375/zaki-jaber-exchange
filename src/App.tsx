import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import * as Icons from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AFG_RED = "#d32f2f";

// تعریف ساختار داده‌ها برای دقت بیشتر
interface Branch {
  id: string;
  name: string;
  manager_name: string;
  afn_balance: number;
  usd_balance: number;
}

export default function App() {
  const [tab, setTab] = useState("dash");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [calc, setCalc] = useState({ currency: 'USD', amount: 0, rate: 0 });
  const [receiptData, setReceiptData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ۱. دریافت اطلاعات با هندل کردن خطا
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('name');
    
    if (error) {
      console.error("Error fetching branches:", error.message);
    } else {
      setBranches(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  // ۲. عملیات ثبت معامله و چاپ
  const handleProcess = async () => {
    if (calc.amount <= 0 || calc.rate <= 0) {
      alert("لطفاً مقادیر معتبر وارد کنید");
      return;
    }
    setLoading(true);
    
    const trackId = 'EXC-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const newData = {
      customer_name: "مشتری حضوری",
      from_currency: calc.currency,
      to_currency: 'AFN',
      amount_in: calc.amount,
      amount_out: calc.amount * calc.rate,
      rate: calc.rate,
      tracking_id: trackId,
      date: new Date().toLocaleDateString('fa-AF') + " " + new Date().toLocaleTimeString('fa-AF')
    };

    const { error } = await supabase.from('exchange_transactions').insert([newData]);

    if (error) {
      alert("خطا در ثبت دیتابیس: " + error.message);
    } else {
      setReceiptData(newData);
      // وقفه کوتاه برای رندر شدن رسید قبل از پرینت
      setTimeout(() => { 
        window.print(); 
        fetchData(); // به‌روزرسانی موجودی‌ها بعد از معامله
      }, 500);
    }
    setLoading(false);
  };

  const menuItems = [
    { id: "dash", l: "داشبورد گرافیکی", i: <Icons.LayoutDashboard size={22}/> },
    { id: "branch", l: "موجودی نمایندگی‌ها", i: <Icons.MapPin size={22}/> },
    { id: "calc", l: "ماشین حساب صرافی", i: <Icons.Repeat size={22}/> },
    { id: "settings", l: "تنظیمات سیستم", i: <Icons.Settings size={22}/> },
  ];

  return (
    <div className="flex h-screen bg-[#f4f7f6] font-sans text-slate-900 overflow-hidden" dir="rtl">
      
      {/* --- بخش مخصوص چاپ --- */}
      <div id="receipt-print" className="hidden print:block p-10 bg-white text-black w-full mx-auto font-sans">
        <div className="text-center border-b-4 border-double border-black pb-4 mb-6">
          <h1 className="text-3xl font-black">د افغانستان بانک</h1>
          <h2 className="text-xl font-bold">صرافی احمد ذکی (واحد عملیاتی)</h2>
          <p className="text-sm mt-2">سیستم یکپارچه تبادلات ارزی - SATS</p>
        </div>
        {receiptData && (
          <div className="space-y-6 text-lg">
            <div className="flex justify-between font-mono"><span>ID: {receiptData.tracking_id}</span> <span>تاریخ: {receiptData.date}</span></div>
            <hr className="border-black" />
            <div className="grid grid-cols-2 gap-y-4">
              <span className="font-bold">نوع ارز:</span> <span>{receiptData.from_currency}</span>
              <span className="font-bold">مقدار ورودی:</span> <span>{receiptData.amount_in.toLocaleString()}</span>
              <span className="font-bold">نرخ تبادله:</span> <span className="text-xl">{receiptData.rate}</span>
            </div>
            <div className="bg-gray-200 p-6 flex justify-between text-3xl font-black border-2 border-black rounded-lg">
              <span>خروجی (AFN):</span>
              <span>{receiptData.amount_out.toLocaleString()}</span>
            </div>
            <div className="text-center mt-20 italic text-sm">محل امضا و مهر صرافی</div>
          </div>
        )}
      </div>

      {/* --- سایدبار --- */}
      <aside className="w-80 bg-[#0c0c0c] text-white flex flex-col p-8 shadow-2xl relative print:hidden transition-all">
        <div className="absolute top-0 right-0 w-2 h-full bg-red-600"></div>
        <div className="py-10 flex flex-col items-center border-b border-white/5 mb-8">
          <Icons.Landmark size={50} className="text-yellow-500 mb-4" />
          <h1 className="text-xl font-black uppercase">DAB Management</h1>
        </div>
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 ${tab === item.id ? "bg-red-600 text-white font-black shadow-xl -translate-x-2" : "hover:bg-white/5 text-slate-500"}`}>
              {item.i} <span className="text-sm">{item.l}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* --- محتوای اصلی --- */}
      <main className="flex-1 overflow-y-auto p-12 print:hidden">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 italic">
              {menuItems.find(i => i.id === tab)?.l}
            </h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Connected to Supabase Node</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
             {loading && <Icons.Loader2 className="animate-spin text-red-600" />}
             <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100"><Icons.Bell size={20}/></div>
             <div className="px-4 py-2 bg-black text-white rounded-xl font-bold text-sm">پنل مدیریت</div>
          </div>
        </header>

        {tab === "dash" && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-red-500 transition-all cursor-pointer">
                  <div>
                    <p className="text-slate-400 text-xs font-black mb-2 uppercase">موجودی صندوق مرکزی</p>
                    <h3 className="text-4xl font-black text-slate-900">8,500,000 <span className="text-sm font-normal">AFN</span></h3>
                  </div>
                  <Icons.Wallet size={50} className="text-slate-100 group-hover:text-red-100 transition-colors" />
               </div>
               <div className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100 flex justify-between items-center group hover:border-blue-500 transition-all">
                  <div>
                    <p className="text-slate-400 text-xs font-black mb-2 uppercase">مجموع نقدینگی ولایات</p>
                    <h3 className="text-4xl font-black text-slate-900">
                      {branches.reduce((a, b) => a + (Number(b.afn_balance) || 0), 0).toLocaleString()} 
                      <span className="text-sm font-normal pr-2">AFN</span>
                    </h3>
                  </div>
                  <Icons.Globe size={50} className="text-slate-100 group-hover:text-blue-100 transition-colors" />
               </div>
            </div>

            <div className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-100 h-[400px]">
               <h3 className="text-xs font-black text-slate-400 mb-8 uppercase tracking-[3px]">توزیع سرمایه در نمایندگی‌ها</h3>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branches}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                     <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                     <Bar dataKey="afn_balance" fill={AFG_RED} radius={[10, 10, 0, 0]} barSize={50} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        )}

        {tab === "calc" && (
          <div className="bg-white p-10 rounded-[45px] shadow-2xl border border-slate-100 animate-in zoom-in duration-500 max-w-4xl mx-auto">
             <h2 className="text-2xl font-black mb-8 flex items-center gap-3"><Icons.Repeat className="text-red-600" /> ثبت فاکتور صرافی</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black mr-4 text-slate-400 uppercase">انتخاب ارز</label>
                  <select className="bg-slate-50 p-5 rounded-3xl font-bold outline-none border-2 border-transparent focus:border-red-500" value={calc.currency} onChange={e => setCalc({...calc, currency: e.target.value})}>
                    <option value="USD">دالر (USD)</option>
                    <option value="EUR">یورو (EUR)</option>
                    <option value="PKR">کلدار (PKR)</option>
                    <option value="TOMAN">تومان (IRT)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black mr-4 text-slate-400 uppercase">مقدار ارز</label>
                  <input type="number" placeholder="0.00" className="bg-slate-50 p-5 rounded-3xl font-black outline-none border-2 border-transparent focus:border-red-500" onChange={e => setCalc({...calc, amount: Number(e.target.value)})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black mr-4 text-slate-400 uppercase">نرخ تبادله (Rate)</label>
                  <input type="number" placeholder="0.00" className="bg-slate-50 p-5 rounded-3xl font-black outline-none border-2 border-transparent focus:border-red-500 text-red-600" onChange={e => setCalc({...calc, rate: Number(e.target.value)})} />
                </div>
             </div>
             <div className="bg-[#0c0c0c] text-white p-10 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">مجموع قابل پرداخت به مشتری</p>
                  <h3 className="text-6xl font-black text-yellow-500">{(calc.amount * calc.rate).toLocaleString()} <span className="text-xl">AFN</span></h3>
                </div>
                <button onClick={handleProcess} disabled={loading} className="w-full md:w-auto bg-red-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                   {loading ? <Icons.Loader2 className="animate-spin" /> : <><Icons.Printer size={24}/> تایید و چاپ</>}
                </button>
             </div>
          </div>
        )}

        {tab === "branch" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
             {branches.length > 0 ? branches.map(b => (
               <div key={b.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                    <Icons.Building size={26} className="text-red-600" />
                  </div>
                  <h4 className="text-xl font-black mb-1">{b.name}</h4>
                  <p className="text-xs text-slate-400 font-bold mb-6 italic">Manager: {b.manager_name}</p>
                  <div className="pt-4 border-t border-slate-50 space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400">AFGHANI</span>
                        <span className="font-black text-lg">{Number(b.afn_balance).toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400">DOLLAR</span>
                        <span className="font-black text-blue-600">${Number(b.usd_balance).toLocaleString()}</span>
                     </div>
                  </div>
               </div>
             )) : (
               <div className="col-span-3 text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-300 text-slate-400 font-bold">
                 داده‌ای برای نمایش وجود ندارد.
               </div>
             )}
          </div>
        )}
      </main>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-print, #receipt-print * { visibility: visible; }
          #receipt-print { 
            position: fixed; 
            left: 0; 
            top: 0; 
            width: 100%; 
            display: block !important; 
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
