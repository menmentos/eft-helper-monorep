import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function BossList({ onShowMap }){
  const [bosses,setBosses]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{ load(); },[]);
  async function load(){ setLoading(true); try{ const res = await axios.get((import.meta.env.VITE_BACKEND_URL||'http://localhost:5000') + '/api/bosses'); setBosses(res.data.bosses || []); }catch(e){ console.error(e); } setLoading(false); }
  async function syncNow(){ setLoading(true); try{ const res = await axios.post((import.meta.env.VITE_BACKEND_URL||'http://localhost:5000') + '/api/bosses/sync'); setBosses(res.data.bosses || []); alert('Синхронизировано: '+(res.data.count||0)); }catch(e){ alert('Ошибка sync'); } setLoading(false); }
  return (<div><h2>Bosses</h2><div><button onClick={syncNow}>Обновить данные</button></div>{loading? <div>Loading...</div> : <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:12}}>{bosses.map(b=>(<div key={b.id} style={{border:'1px solid #ddd',padding:12,borderRadius:6}}><img src={b.image||''} alt='' style={{width:'100%',height:120,objectFit:'cover'}} onError={(e)=>{e.target.style.display='none'}}/><h3>{b.name}</h3><p style={{fontSize:13,color:'#444'}}>{b.description}</p>{(b.spawnLocations||[]).map((s,i)=>(<div key={i} style={{marginTop:6}}><strong>{s.map}</strong> — шанс: {s.chance||'N/A'}</div>))}<div style={{marginTop:8}}><button onClick={()=>onShowMap(b)}>Показать на карте</button></div></div>))}</div>}</div>); }
