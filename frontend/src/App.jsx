import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function App(){
  const [goon, setGoon] = useState({map:null, updatedAt:null});
  useEffect(()=>{ fetch(); const t = setInterval(fetch, 60000); return ()=>clearInterval(t); },[]);
  async function fetch(){ try{ const res = await axios.get((import.meta.env.VITE_BACKEND_URL||'') + '/api/goons'); setGoon(res.data); }catch(e){ console.error(e); } }
  return (<div className="p-6 max-w-3xl mx-auto">
    <header className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">EFT Helper — Frontend (fixed)</h1>
      <div className="text-sm">Goon Tracker</div>
    </header>
    <div className="border rounded p-4 flex items-center gap-3">
      <img src="/icon-goon.png" alt="goon" className="w-12 h-12"/>
      <div>
        <div className="text-lg font-semibold">{goon.map ? goon.map : 'Нет данных'}</div>
        <div className="text-sm text-gray-600">Последнее: {goon.updatedAt ? new Date(goon.updatedAt).toLocaleString() : '—'}</div>
      </div>
      <div className="ml-auto">
        <a className="px-3 py-1 bg-blue-600 text-white rounded" href="/map.html">Открыть карту</a>
      </div>
    </div>
    <main className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Bosses</h2>
      <p className="text-sm text-gray-700">Перейдите на страницу Bosses, чтобы синхронизировать данные с tarkov.dev.</p>
    </main>
  </div>);
}
