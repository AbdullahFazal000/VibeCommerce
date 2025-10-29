import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

export default function ProductGrid(){
  const { products, loading } = useProducts();

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(p => <ProductCard key={p._id || p.id} product={p} />)}
    </div>
  );
}
