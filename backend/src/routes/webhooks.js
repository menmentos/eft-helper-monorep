import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
router.post('/', express.raw({ type: 'application/json' }), (req,res) => {
  console.log('stripe webhook received');
  res.json({ received: true });
});
export default router;
