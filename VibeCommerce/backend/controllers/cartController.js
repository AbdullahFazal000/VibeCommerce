import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const getCart = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, qty = 1 } = req.body;
  if (!userId || !productId) return res.status(400).json({ error: 'userId and productId required' });
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    const existing = cart.items.find(item => item.productId.toString() === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ productId, name: product.name, price: product.price, qty });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { qty, userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'cart not found' });
    const item = cart.items.id(id);
    if (!item) return res.status(404).json({ error: 'cart item not found' });

    if (qty <= 0) {
      item.remove();
    } else {
      item.qty = qty;
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'cart not found' });
    const item = cart.items.id(id);
    if (!item) return res.status(404).json({ error: 'cart item not found' });
    item.remove();
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};
