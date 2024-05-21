import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
// router.get('/:productId',);
// router.put('/:productId',);

export const ProductRoutes = router;
