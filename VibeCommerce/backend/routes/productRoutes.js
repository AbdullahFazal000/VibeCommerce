import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';
const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// POST /api/products (create product)
router.post('/', createProduct);

export default router;
