import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Repeat, Send, Landmark, 
  Settings, ChevronDown, X, Globe, UserCircle 
} from 'lucide-react';

export default function Sidebar({ lang, setLang, isOpen, setIsOpen }: any) {
  const [openSub, setOpenSub] = useState<string | null>(null);
  const location = useLocation();

  const menu = [
    { id: 'dash', label: {dr:'مدیریت', en:'Management'}, icon: <LayoutDashboard size={20}/>, path: '/' },
    { 
      id: 'tx', label: {dr:'معاملات', en:'Transactions'}, icon: <Repeat size={20}/>,
      sub: [
        { label: {dr:'تبادله اسعار', en:'Exchange'}, path: '/exchange/new' },
        { label: {dr:'حواله ارسالی', en:'Send Hawala'}, path: '/hawala/send' }
      ]
    },
    { id: 'dab', label: {dr:'د افغانستان بانک', en:'Central Bank'}, icon: <Landmark size={20}/>, path: '/dab' },
    { id: 'set', label: {dr:'تنظیمات', en:'Settings'}, icon: <Settings size={20}/>, path: '/settings' },
  ];

  return (
    <aside className={`
      fixed top-0 h-screen w-72 bg-[#0f172a] text-slate-400 flex flex-col z-50 transition-transform duration-500 ease-in-out
      ${isOpen ? 'translate-x-0' : (lang === 'en' ? '-translate-x-full' : 'translate-x-full')}
      ${lang === 'en' ? 'left-0' : 'right-0'}
    `}>
      <div className="p-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">A</div>
          <span className="font-black text-white text-lg tracking-tighter">AERO <span className="text-blue-500">SOFT</span></span>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={20} /></button>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {menu.map((item) => (
          <div key={item.id}>
            <div 
              onClick={() => item.sub ? setOpenSub(openSub === item.id ? null : item.id) : setIsOpen(false)}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${location.pathname === item.path ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white/5 hover:text-white'}`}
            >
              <Link to={item.path || '#'} className="flex items-center gap-4 w-full">
                {item.icon} <span className="text-sm font-bold">{lang === 'en' ? item.label.en : item.label.dr}</span>
              </Link>
              {item.sub && <ChevronDown size={16} className={openSub === item.id ? 'rotate-180' : ''} />}
            </div>
            {item.sub && openSub === item.id && (
              <div className="mt-2 space-y-1 pr-10 border-r border-white/10 mr-4">
                {item.sub.map(s => (
                  <Link key={s.path} to={s.path} onClick={() => setIsOpen(false)} className="block py-2 text-xs font-medium hover:text-blue-400 transition-colors">
                    {lang === 'en' ? s.label.en : s.label.dr}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 flex gap-2">
        {['dr', 'ps', 'en'].map(l => (
          <button key={l} onClick={() => setLang(l)} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>{l}</button>
        ))}
      </div>
    </aside>
  );
}
