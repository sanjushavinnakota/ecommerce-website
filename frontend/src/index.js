import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './components/CardItems/CartContext';
import { ProductProvider } from './context/ProductContext';
import { SearchProvider } from './context/SearchContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SearchProvider>
    <ProductProvider>
    <CartProvider>
        <App />
    </ CartProvider>
    </ProductProvider>
    </SearchProvider>
);
