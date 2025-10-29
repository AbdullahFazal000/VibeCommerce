import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar(){
  const { cart } = useCart();
  const count = (cart.items || []).reduce((s, it) => s + it.qty, 0);
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-vibe">VibeCommerce</Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4"></path></svg>
            <span className="absolute -top-2 -right-3 bg-vibe text-white text-xs px-2 py-0.5 rounded-full">{count}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
