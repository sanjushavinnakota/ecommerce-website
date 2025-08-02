import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Products from './pages/Products/Products';
import CardItems from './components/CardItems/CardItems';
import Login from './components/login/Login';
import CheckoutPage from './components/Checkout/CheckoutPage';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import SellerRegister from './pages/Seller/SellerRegister';
import SellerLogin from './pages/Seller/SellerLogin';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      {/* ✅ Pass setSearch to Navbar */}
      <Navbar />
      <Header />

      <Routes>
        {/* ✅ Pass searchQuery to Products */}
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<CardItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/seller-login" element={<SellerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
