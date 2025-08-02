import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { useNavigate } from "react-router-dom";
import './seller.css'

const SellerLogin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!loginData.username || !loginData.password) {
      alert("Please fill in both username and password");
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5050/api/sellers/login', loginData);
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
      navigate("/add-product");  // navigate only on success
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <form className="seller-login-form" onSubmit={handleLogin}>
    <h2>Seller Login</h2>
    <label>Username</label>
    <input name="username" value={loginData.username} onChange={handleChange} required />
    <label>Password</label>
    <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
    <button type="submit">Login</button>
  </form>
  
  );
};

export default SellerLogin;
