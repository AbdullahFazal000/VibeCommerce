import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  qty: { type: Number, default: 1 }
}, { _id: true });

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  items: [CartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
