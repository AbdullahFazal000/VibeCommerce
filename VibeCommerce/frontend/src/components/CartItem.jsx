import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }){
  const { updateQuantity, removeItem } = useCart();
  const id = item._id || item.id;

  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <div className="text-sm text-gray-500">₹{item.price}</div>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => updateQuantity(id, item.qty - 1)} className="px-2 py-1 bg-gray-100 rounded">-</button>
          <div className="px-3 py-1 border rounded">{item.qty}</div>
          <button onClick={() => updateQuantity(id, item.qty + 1)} className="px-2 py-1 bg-gray-100 rounded">+</button>
          <button onClick={() => removeItem(id)} className="ml-4 text-sm text-red-500">Remove</button>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold">₹{(item.price * item.qty).toFixed(2)}</div>
      </div>
    </div>
  );
}
