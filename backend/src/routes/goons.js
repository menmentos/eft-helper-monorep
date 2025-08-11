import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();
const FILE = path.join(process.cwd(), 'src', 'data', 'goons.json');
router.get('/', (req,res) => { try{ if(!fs.existsSync(FILE)) return res.json({ map:null, updatedAt:null }); const raw = fs.readFileSync(FILE,'utf-8'); res.json(JSON.parse(raw)); }catch(e){ res.status(500).json({ error:'failed' }); } });
router.post('/update', (req,res) => { try{ const payload = req.body || {}; const now = new Date().toISOString(); const obj = { map: payload.map || null, updatedAt: now }; fs.writeFileSync(FILE, JSON.stringify(obj, null, 2), 'utf-8'); res.json({ success:true, obj }); }catch(e){ res.status(500).json({ success:false }); } });
export default router;
