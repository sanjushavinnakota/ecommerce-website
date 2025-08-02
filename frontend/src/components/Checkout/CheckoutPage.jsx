import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css'
const CheckoutPage = () => {
  const navigate = useNavigate();

  // Simulate login check
  const isLoggedIn = localStorage.getItem('token'); // or your auth state

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/checkout'); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  const handlePlaceOrder = () => {
    // Submit order details to backend
    alert('Order Placed!');
    navigate('/');
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Address Section */}
      <div className="section">
        <h3>Shipping Address</h3>
        <input type="text" placeholder="Full Name" required />
        <input type="text" placeholder="Address Line" required />
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="Pincode" required />
      </div>

      {/* Payment Section */}
      <div className="section">
        <h3>Payment Method</h3>

        <label>
          <input type="radio" name="payment" value="card" defaultChecked />
          Credit & Debit Cards
        </label>
        <label>
          <input type="radio" name="payment" value="upi" />
          UPI
        </label>
        <label>
          <input type="radio" name="payment" value="other" />
          Another Payment Method
        </label>
      </div>

      <button className='confirm-pay' onClick={handlePlaceOrder}>Confirm and Pay</button>
    </div>
  );
};

export default CheckoutPage;
