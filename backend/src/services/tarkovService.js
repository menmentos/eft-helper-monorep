import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
const CACHE = path.join(process.cwd(), 'src', 'data', 'bosses.json');
const GRAPHQL = `query Bosses { bosses { id name description imageLink wikiLink spawnLocations { map { name } spawnChance spawnLocations } } }`;
export async function fetchBossesFromTarkovDev(){ const url = process.env.TARKOV_DEV_GRAPHQL || 'https://api.tarkov.dev/graphql'; const res = await fetch(url, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ query: GRAPHQL }) }); if(!res.ok) throw new Error('tarkov.dev fetch failed '+res.status); const j = await res.json(); const bosses = (j.data && j.data.bosses) ? j.data.bosses : []; const norm = bosses.map(b=>({ id: b.id || (b.name||'').replace(/\s+/g,'_').toLowerCase(), name: b.name, description: b.description || null, image: b.imageLink || null, wiki: b.wikiLink || null, spawnLocations: (b.spawnLocations||[]).map(s=>({ map: s.map?.name || null, chance: s.spawnChance || null, raw: s.spawnLocations || null })) })); fs.writeFileSync(CACHE, JSON.stringify(norm, null, 2), 'utf-8'); return norm; }
export function getBossesFromCache(){ if(!fs.existsSync(CACHE)) return []; try{ return JSON.parse(fs.readFileSync(CACHE,'utf-8')); }catch(e){ return []; } }
