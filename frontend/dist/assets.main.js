(async function(){
  // simple hydration: fetch goon data and update placeholders
  async function fetchGoon(){ try{ const res = await fetch((window.VITE_BACKEND_URL||'') + '/api/goons'); if(!res.ok) return; const j = await res.json(); const mapEl=document.getElementById('goon-map'); const timeEl=document.getElementById('goon-time'); if(mapEl) mapEl.textContent = j.map || '—'; if(timeEl) timeEl.textContent = j.updatedAt? new Date(j.updatedAt).toLocaleString() : '—'; }catch(e){ console.error(e); } }
  window.VITE_BACKEND_URL = window.VITE_BACKEND_URL || '';
  fetchGoon();
  setInterval(fetchGoon, 60000);
})();