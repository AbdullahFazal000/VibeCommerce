import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CheckoutModal from '../components/CheckoutModal';
import { Link } from 'react-router-dom';

export default function CartPage(){
  const { cart, loading } = useCart();
  const [open, setOpen] = useState(false);

  if (loading) return <div>Loading cart...</div>;

  const total = (cart.items || []).reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-4"><Link to="/" className="text-sm text-vibe">← Continue shopping</Link></div>
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {(!cart.items || cart.items.length === 0) ? (
          <div className="p-6 bg-white rounded-lg shadow">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.items.map(item => <CartItem key={item._id || item.id} item={item} />)}
          </div>
        )}
      </div>

      <aside className="bg-white rounded-2xl p-6 shadow sticky top-24">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <div className="mt-4 flex justify-between">
          <span>Subtotal</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="mt-6">
          <button disabled={(!cart.items || cart.items.length===0)} onClick={() => setOpen(true)} className="w-full bg-vibe text-white py-3 rounded-xl">
            Proceed to Checkout
          </button>
        </div>
      </aside>

      <CheckoutModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
