import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Checkout from "./pages/Checkout";

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
