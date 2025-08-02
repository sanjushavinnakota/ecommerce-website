import { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CardItems.css';

const CardItems = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const itemCount = cartItems.length;

  // 🔗 Common Razorpay integration
  const initiateRazorpay = async (amount, orderDetails = {}, onSuccess) => {
    try {
      const res = await fetch('http://localhost:5050/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount * 100 }),
      });
      const data = await res.json();

      const options = {
        key: 'rzp_test_Bz3o6kTb0wugeq', // Replace with your test key
        amount: data.amount,
        currency: 'INR',
        name: 'My Shop',
        description: 'Product Purchase',
        order_id: data.id,
        handler: function (response) {
          alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
          onSuccess?.(); // Navigate or perform DB action
        },
        prefill: {
          name: 'Sanjusha',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#0b72b9',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Payment Error:', err);
      alert('Something went wrong during payment. Please try again.');
    }
  };

  const handleBuyNow = (item) => {
    if (item.category === 'Fashion') {
      item.onCustomize?.({
        name: item.name,
        price: item.price,
        category: item.category,
        location: item.location,
      });
    } else {
      initiateRazorpay(item.price, item, () => {
        navigate('/thank-you');
      });
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <p>🛒 Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img className="image" src={item.image} alt={item.name} width={300} height={300} />
              <h3 className="name">{item.name}</h3>
              <p className="para">{item.para}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>

              <div className="cart-actions">
                <button className="btn" onClick={() => handleBuyNow(item)}>
                   Buy Now
                </button>
                <button className="btn" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="price-summary">
          <h3>🧾 PRICE DETAILS</h3>
          <h4>Total items: {itemCount}</h4>
          <h4>Total Price: ₹{totalPrice.toFixed(2)}</h4>
          <button onClick={() => navigate('/checkout')}>PLACE ORDER</button>
        </div>
      )}
    </div>
  );
};

export default CardItems;
