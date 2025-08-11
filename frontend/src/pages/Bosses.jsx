import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Bosses(){
  const [bosses,setBosses]=useState([]);
  useEffect(()=>{ load(); },[]);
  async function load(){ try{ const res = await axios.get((import.meta.env.VITE_BACKEND_URL||'') + '/api/bosses'); setBosses(res.data.bosses || []); }catch(e){ console.error(e); } }
  async function syncNow(){ await axios.post((import.meta.env.VITE_BACKEND_URL||'') + '/api/bosses/sync'); load(); }
  return (<div className="p-6 max-w-4xl mx-auto">
    <div className="flex items-center justify-between mb-4"><h1 className="text-2xl">Bosses</h1><button onClick={syncNow} className="px-3 py-1 bg-green-600 text-white rounded">Sync</button></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{bosses.map(b=> (<div key={b.id} className="border p-3 rounded"><h3 className="font-semibold">{b.name}</h3><p className="text-sm">{b.description}</p></div>))}</div>
  </div>);
}
