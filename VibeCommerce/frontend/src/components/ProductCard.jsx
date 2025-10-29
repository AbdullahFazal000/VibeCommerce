import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }){
  const { addToCart } = useCart();

  const id = product._id || product.id;

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <div className="h-40 flex items-center justify-center mb-4">
        <img src={product.image} alt={product.name} className="max-h-40 object-contain" />
      </div>
      <h3 className="font-medium text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500 h-12 overflow-hidden">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div>
          <div className="text-vibe font-semibold">₹{product.price}</div>
          <div className="text-xs text-gray-400">Rating: {product.rating}</div>
        </div>
        <button onClick={() => addToCart(id)} className="bg-vibe text-white px-3 py-2 rounded-lg hover:opacity-90">
          Add
        </button>
      </div>
    </div>
  );
}
