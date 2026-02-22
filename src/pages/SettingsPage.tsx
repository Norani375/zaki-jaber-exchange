import { Database, Landmark, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const handleBackup = () => {
    // منطق دانلود فایل JSON از دیتابیس
    alert("بک‌آپ با موفقیت در سیستم ذخیره شد.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
        <h2 className="text-xl font-black text-slate-800 mb-8">تنظیمات پیشرفته سیستم</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={handleBackup} className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-500 transition-all group">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:scale-110"><Database /></div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm">ایجاد نسخه پشتیبان (Backup)</p>
              <p className="text-[10px] text-slate-400">ذخیره تمام تراکنش‌ها در فایل ایمن</p>
            </div>
          </button>

          <button className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 hover:border-amber-500 transition-all group">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl group-hover:scale-110"><Landmark /></div>
            <div className="text-right">
              <p className="font-bold text-slate-800 text-sm">ایجاد نمایندگی جدید</p>
              <p className="text-[10px] text-slate-400">اتصال شعبه‌های تحت اثر به مرکز</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
