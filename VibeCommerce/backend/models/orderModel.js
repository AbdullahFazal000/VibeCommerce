import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  qty: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  receiptId: { type: String, required: true },
  userId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  orderStatus: { type: String, default: 'Confirmed' }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
