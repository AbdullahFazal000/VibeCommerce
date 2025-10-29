import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutModal({ isOpen, onClose }){
  const { cart, checkout } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' });

  const total = (cart.items || []).reduce((s, it) => s + it.price * it.qty, 0);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkout(form);
      setSuccess(res);
    } catch (err) {
      alert('Checkout error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <motion.div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div className="bg-white rounded-2xl p-6 w-full max-w-xl z-10" initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} exit={{y:40, opacity:0}}>
            <h3 className="text-xl font-semibold mb-4">Checkout</h3>

            {success ? (
              <div className="p-4 bg-green-50 rounded">
                <h4 className="font-medium">Order Confirmed</h4>
                <p className="text-sm">Receipt: <span className="font-mono">{success.receiptId}</span></p>
                <p className="text-sm">Total: ₹{success.total.toFixed(2)}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => { onClose(); setSuccess(null); }} className="px-4 py-2 bg-vibe text-white rounded">Close</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="p-2 border rounded" />
                  <input required placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} className="p-2 border rounded" />
                </div>
                <input required placeholder="Address" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} className="p-2 border rounded w-full" />
                <input required placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} className="p-2 border rounded w-full" />
                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="font-semibold">₹{total.toFixed(2)}</div>
                  </div>
                  <button type="submit" disabled={loading} className="bg-vibe text-white px-4 py-2 rounded">
                    {loading ? 'Processing...' : 'Confirm Order'}
                  </button>
                </div>
              </form>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
