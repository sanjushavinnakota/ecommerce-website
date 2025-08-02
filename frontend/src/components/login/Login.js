import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.css'
const Login = () => {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('black');
  const [activeView, setActiveView] = useState('login');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;
  
    const isEmail = emailPattern.test(input);
    const isPhone = phonePattern.test(input);
  
    if (!isEmail && !isPhone) {
      setMessage("Invalid Input");
      setColor("red");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5050/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...(isEmail ? { email: input } : { phone: input })
        })
      });
      console.log("Verifying OTP with:", { input, otp });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setColor("green");
        setIsOtpSent(true);
        console.log("JWT token:", data.token);
      } else {
        setMessage(data.message || "OTP sending failed");
        setColor("red");
      }
  
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Something went wrong");
      setColor("red");
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setMessage("Please enter OTP");
      setColor("red");
      return;
    }
    try {
      const response = await fetch("http://localhost:5050/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input, otp })
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("OTP Verified. User created / logged in");
        setColor("green");
        navigate('/');
        console.log("User verified ✅", data);
        // You can store token like this:
        // localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message || "Invalid OTP");
        setColor("red");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setMessage("Something went wrong");
      setColor("red");
    }
  };
  
  
  return (
   
    <div className='login-page'>
      <div className='login-left-section'>
      {activeView==='login' ? (
        <img src="https://t4.ftcdn.net/jpg/14/51/08/79/240_F_1451087970_ao0ZZg5O5tmJAR5LN3Bl3Ew0nOtcN5eL.jpg"
          width="400px" height="400px" alt="" />
        ):(
        <div>
          <img src="https://t3.ftcdn.net/jpg/14/26/85/24/240_F_1426852466_WoVg9vzvLnnJdiQ8Ht0FJDPJh7LUKAL8.jpg"
           width="450px" height="400px" alt=""/>
        </div>
       
      )}
      </div>

      <div className='login-right-section'>
      {activeView==='login' ? (
        <form className='form'>
          <h3>Login User</h3>
          Enter Email/PhoneNumber<br></br>
          <input type="text" name="name" onChange={(e) => setInput(e.target.value)} /><br></br>
          <button onClick={sendOtp}>Send OTP</button>
          {isOtpSent && (
  <>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <button onClick={verifyOtp}>Verify OTP</button>
  </>
)}
          <h5 style={{ color: color }}>
            {message}
          </h5>
          <div>
          <span style={{ cursor: 'pointer', color: 'white' }} onClick={() => setActiveView('newUser')}>
               New User?
              </span>
          </div>
        </form>
      ):(
        <div>
      <form className='form'>
      <h3>Create User</h3>
          Enter Email/PhoneNumber<br></br>
          <input type="text" name="name" onChange={(e) => setInput(e.target.value)} /><br></br>
          <button onClick={sendOtp}>Send OTP</button>
          {isOtpSent && (
  <>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <button onClick={verifyOtp}>Verify OTP</button>
  </>
)}
          <h5 style={{ color: color }}>
            {message}
          </h5>
          <div>
         
          </div>
        </form>
        <span style={{ cursor: 'pointer'}}onClick={() => setActiveView('login')}>Back to Login</span>
      </div>
      )}
    </div>
    </div>
  )

}

export default Login
