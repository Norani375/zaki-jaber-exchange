export default function Header({ lang }: any) {
  return (
    <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">AFN / USD</div>
        <div className="text-right border-r pr-4 border-slate-200">
           <h1 className="text-sm font-black text-slate-800">احمد ذکی تنها</h1>
           <p className="text-[10px] text-slate-400">کندز، مارکیت مهمند، منزل دوم</p>
        </div>
      </div>
      <div className="flex gap-2">
         <button className="px-3 py-1 text-[11px] font-bold hover:bg-slate-100 rounded">DAB LINKS</button>
         <button className="px-3 py-1 text-[11px] font-bold bg-slate-800 text-white rounded uppercase">English</button>
      </div>
    </header>
  );
}
