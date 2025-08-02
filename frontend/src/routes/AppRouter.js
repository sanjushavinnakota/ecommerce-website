import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CardItems from '../components/CardItems/CardItems';
import Navbar from '../components/Navbar';
import CheckoutPage from '../components/Checkout/CheckoutPage';



const AppRouter = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carditems" element={<CardItems />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
