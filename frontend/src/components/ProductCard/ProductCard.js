import React, { useState, useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../CardItems/CartContext';
import './ProductCard.css';

export default function ProductCard({ _id, image, name, para, category, location, price, onCustomize }) {
  const [bgColor, setbgColor] = useState("grey");
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    setbgColor(prev => (prev === "grey" ? "#693232" : "grey"));
    addToCart({ _id, image, name, para, category, location, price });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async ({ name, price }) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Order creation failed:", data.error || "Unknown error");
        alert(data.error || "Failed to create order. Try again.");
        return;
      }

      const { orderId, amount, currency } = data;

      const options = {
        key: "rzp_test_Bz3o6kTb0wugeq",
        amount,
        currency,
        name: "MSME Marketplace",
        description: `Payment for ${name}`,
        order_id: orderId,
        handler: function (response) {
          alert("✅ Payment Successful");
          console.log("Razorpay Response:", response);
        },
        prefill: {
          name: "Your Name",
          email: "example@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="product-info">
      <img
        className="product-image"
        src={
          image?.startsWith("http") || image?.startsWith("data:image")
            ? image
            : `http://localhost:5050${image}`
        }
        alt={name}
        onError={(e) => {
          e.target.src = "/default-placeholder.png";
        }}
      />

      <h3>{name}</h3>
      <p>{para}</p>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Price:</strong> ₹{price}</p>

      <div className="button-wrapper">
        <button className="btn" onClick={() => handlePayment({ name, price })}>
          Buy Now
        </button>
        <FaShoppingCart
          size={30}
          onClick={handleAddToCart}
          fill={bgColor}
          className="cart-icon"
        />
      </div>
    </div>
  );
}
