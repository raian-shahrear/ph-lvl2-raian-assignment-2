import express, { Router } from 'express';
import { OrderControllers } from './order.controller';

const router: Router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrder);

export const OrderRoutes = router;
