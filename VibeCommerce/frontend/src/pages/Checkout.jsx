import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ correct import

const Checkout = () => {
  const { cart, checkout, clearCart } = useCart(); // ✅ from context
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await checkout(form); // ✅ calls backend via context
      setMessage(`✅ Order confirmed! Receipt ID: ${result.orderId || "N/A"}`);
      await clearCart();
    } catch (err) {
      setMessage(`❌ Checkout failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items?.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Your cart is empty 🛒
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.qty,
    0
  );

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>

      <ul className="mb-4">
        {cart.items.map((item) => (
          <li key={item._id || item.id} className="flex justify-between py-2 border-b">
            <span>{item.productId?.name || "Unnamed Product"} (x{item.qty})</span>
            <span>₹{(item.productId?.price || 0) * item.qty}</span>
          </li>
        ))}
      </ul>

      <p className="text-lg font-bold mb-4 text-right">Total: ₹{total.toFixed(2)}</p>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Processing..." : "Confirm Order"}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Checkout;
