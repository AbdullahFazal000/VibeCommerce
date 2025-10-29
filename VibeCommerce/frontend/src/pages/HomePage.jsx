import React from 'react';
import ProductGrid from '../components/ProductGrid';

export default function HomePage(){
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Featured Electronics</h1>
      <ProductGrid />
    </div>
  );
}
