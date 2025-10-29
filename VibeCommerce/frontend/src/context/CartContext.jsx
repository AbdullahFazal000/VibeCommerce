import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const MOCK_USER_ID = "demo_user_123"; // mock user persisted in backend

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], createdAt: null });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart?userId=${MOCK_USER_ID}`);
      const json = await res.json();
      setCart(json);
    } catch (err) {
      console.error("fetchCart error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, qty = 1) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: MOCK_USER_ID, productId, qty }),
      });
      if (!res.ok) throw new Error("Add to cart failed");
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (cartItemId, qty) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: MOCK_USER_ID, qty }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const res = await fetch(`/api/cart/${cartItemId}?userId=${MOCK_USER_ID}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      const ids = (cart.items || [])
        .map((i) => i._id || i.id)
        .filter(Boolean);
      await Promise.all(
        ids.map((id) =>
          fetch(`/api/cart/${id}?userId=${MOCK_USER_ID}`, { method: "DELETE" })
        )
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const checkout = async (checkoutPayload) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: MOCK_USER_ID, ...checkoutPayload }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Checkout failed");
      }
      const json = await res.json();
      await fetchCart();
      return json;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Correctly export both the hook and provider
export const useCart = () => useContext(CartContext);
export default CartContext;
