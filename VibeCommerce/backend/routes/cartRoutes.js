import express from 'express';
import { getCart, addToCart, updateCartItem, deleteCartItem } from '../controllers/cartController.js';
const router = express.Router();

// GET /api/cart?userId=...
router.get('/', getCart);

// POST /api/cart
router.post('/', addToCart);

// PUT /api/cart/:id
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id?userId=...
router.delete('/:id', deleteCartItem);

export default router;
