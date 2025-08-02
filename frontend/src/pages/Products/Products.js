import React, { useState, useContext, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import { SearchContext } from '../../context/SearchContext';
import { CartContext } from '../../components/CardItems/CartContext'; 
import { ProductContext } from '../../context/ProductContext';
import './Products.css';

// ✅ Accept search prop
const HomePage = () => {
  const { searchQuery } = useContext(SearchContext);
  const { product: globalProducts } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [filters, setFilters] = useState({
    categories: [],
    price: 1000,
    search: '',
    location: '',
  });

  // ✅ Update filters.search when Navbar search changes

  // ✅ Filter using all criteria
  const filteredProducts = globalProducts.filter(product => {
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesPrice = product.price <= filters.price;
    const matchesSearch =
    (product.name?.toLowerCase() + product.para?.toLowerCase()).includes(searchQuery.toLowerCase())
    const matchesLocation = !filters.location || product.location === filters.location;
    return matchesCategory && matchesPrice && matchesSearch && matchesLocation;
  });
  const handleBuyNow = async (product) => {
    try {
      const response = await fetch('http://localhost:5050/api/payment/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price * 100, // in paisa
          productId: product._id,
          name: product.name,
        }),
      });
  
      const data = await response.json();
  
      if (!data?.order) {
        throw new Error('Order creation failed');
      }
  
      const options = {
        key: 'rzp_test_Bz3o6kTb0wugeq', // replace with your Razorpay key
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Your Shop Name',
        description: product.name,
        order_id: data.order.id,
        handler: function (response) {
          alert('Payment successful!');
        },
        
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <main className="products-container">
      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No products match your criteria.</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              {...product}
              image={
                product.image?.startsWith('/uploads/')
                  ? `http://localhost:5050${product.image}`
                  : product.image
              }
              onCustomize={() => handleBuyNow(product)} 
              onAddToCart={() => handleAddToCart(product)}
            />
          ))
        )}
      </div>

    </main>
  );
};

export default HomePage;
