import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './seller.css'

const SellerRegister = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    pan: '',
    phone: '',
    email: '',
    gstin: '',
    displayName: '',
    pickupAddress: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/sellers/register', form);
      alert('Registered successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering seller');
    }
  };

  return (
    <form className="seller-register-form" onSubmit={handleSubmit}>
    <h2>Seller Register</h2>
    {Object.entries(form).map(([key, value]) => (
      <div key={key}>
        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
        <input
          type={key === 'password' ? 'password' : 'text'}
          name={key}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
    ))}
    <button type="submit">Register</button>
    <Link to="/seller-login" className="seller-nav-link">Already have an account? Login</Link>
  </form>
  
  );
};

export default SellerRegister;
