import express from 'express';
import fs from 'fs';
import path from 'path';
const router = express.Router();
const FILE = path.join(process.cwd(), 'src', 'data', 'maps.json');
router.get('/', (req,res) => { try{ const raw = fs.readFileSync(FILE,'utf-8'); res.json(JSON.parse(raw)); }catch(e){ res.status(500).json({ error:'failed' }); } });
router.get('/:id', (req,res) => { try{ const raw = fs.readFileSync(FILE,'utf-8'); const maps = JSON.parse(raw); const m = maps.find(x=>x.id===req.params.id||x.slug===req.params.id); if(!m) return res.status(404).json({ error:'not found' }); res.json(m); } catch(e){ res.status(500).json({ error:'failed' }); } });
export default router;
