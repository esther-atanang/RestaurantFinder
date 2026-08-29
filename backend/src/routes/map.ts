import express from 'express';
import { updateStatus, getRestaurants } from '@/middlewares/map.ts';

const router = express.Router();

router.get("/",getRestaurants);
router.put("/status:userID", updateStatus);


export default router;