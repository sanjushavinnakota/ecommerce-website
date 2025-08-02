// src/context/ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  // Fetch products initially
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/products');
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // Call once on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const addProduct = async (productData) => {
    try {
      const response = await axios.post('http://localhost:5050/api/products', productData);
      setProduct((prev) => [...prev, response.data]); // update list
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <ProductContext.Provider value={{ product, addProduct, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
