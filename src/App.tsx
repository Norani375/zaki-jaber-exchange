import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewExchange from './pages/NewExchange';
import HawalaForm from './pages/HawalaForm';

export default function App() {
  const [lang, setLang] = useState('dr');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  }, [lang]);

  return (
    <Router>
      <div className={`flex min-h-screen bg-[#fcfdfe] ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* ۱. سایدبار پنهان‌شونده */}
        <Sidebar lang={lang} setLang={setLang} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-500">
          {/* ۲. هدر مینیمال */}
          <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="p-2.5 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all active:scale-90"
              >
                <Menu size={24} />
              </button>
              <div className="hidden md:flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Search size={16} className="text-slate-400" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none text-xs focus:ring-0 w-40" />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right ml-4">
                <h1 className="text-sm font-black text-slate-800 leading-none">صرافی ذکی جابر</h1>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Premium SarafSoft</span>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <User size={20} />
              </div>
            </div>
          </header>

          {/* ۳. محتوای صفحات */}
          <main className="p-6 lg:p-10">
            <Routes>
              <Route path="/" element={<Dashboard lang={lang} />} />
              <Route path="/exchange/new" element={<NewExchange lang={lang} />} />
              <Route path="/hawala/send" element={<HawalaForm lang={lang} />} />
            </Routes>
          </main>
        </div>

        {/* لایه محافظ (Overlay) */}
        {isSidebarOpen && (
          <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-all" />
        )}
      </div>
    </Router>
  );
}
