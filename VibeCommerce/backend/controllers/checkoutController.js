import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import { v4 as uuidv4 } from 'uuid';

export const checkout = async (req, res) => {
  const { userId, name, email, address, phone } = req.body;
  if (!userId || !name || !email) return res.status(400).json({ error: 'userId, name & email required' });
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'cart is empty' });

    const items = cart.items.map(i => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      qty: i.qty
    }));
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const receiptId = uuidv4();
    const order = await Order.create({
      receiptId,
      userId,
      name,
      email,
      address,
      phone,
      items,
      total,
      orderStatus: 'Confirmed'
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({
      receiptId: order.receiptId,
      total: order.total,
      timestamp: order.createdAt,
      items: order.items,
      name: order.name,
      email: order.email,
      address: order.address,
      phone: order.phone,
      orderStatus: order.orderStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Checkout failed' });
  }
};
