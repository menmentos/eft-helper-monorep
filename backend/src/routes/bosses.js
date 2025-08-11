import express from 'express';
import { fetchBossesFromTarkovDev, getBossesFromCache } from '../services/tarkovService.js';
const router = express.Router();
router.get('/', (req,res) => { const bosses = getBossesFromCache(); res.json({ bosses }); });
router.post('/sync', async (req,res) => { try{ const bosses = await fetchBossesFromTarkovDev(); res.json({ success:true, count: bosses.length, bosses }); } catch(e){ console.error(e); res.status(500).json({ success:false, error: e.message }); } });
export default router;
