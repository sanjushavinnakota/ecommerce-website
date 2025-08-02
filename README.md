# 🛒 MSME Marketplace – Full Stack MERN App Setup Guide

A complete MSME Marketplace built with **MongoDB**, **Express**, **React**, **Node.js**, and **Razorpay** for test payments.

## 📁 Project Structure

msme-marketplace/
├── backend/       # Node.js + Express API
└── frontend/      # React.js frontend

## 🧰 Tech Stack

- Frontend: React.js (CRA)
- Backend: Node.js + Express.js
- Database: MongoDB (local)
- Payment Integration: Razorpay (Test Mode)

## 🔐 Environment Variables

In the `backend` folder, create a `.env` file with the following:

RAZORPAY_KEY_ID=your_razorpay_key_id_here  
RAZORPAY_SECRET=your_razorpay_secret_here  
MONGO_URI=your_mongodb_connection_string_here  
PORT=5050


## 🧪 Prerequisites

Make sure you have installed:

- Node.js & npm
- MongoDB (local or Atlas)
- Git

## 🚀 Backend Setup

1. Go to the backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create `.env` file as shown above.

4. Start MongoDB server (in another terminal):
   mongod

5. Start the backend server:
   npm run dev

Server should run at http://localhost:5050

## 🌐 Frontend Setup

1. Open a new terminal and go to the frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start the frontend app:
   npm start

React app will run at http://localhost:3000

## 📤 Uploads Folder

The backend expects an `uploads/` folder for storing product images.

Create it manually:

mkdir backend/uploads

Access uploaded images via:
http://localhost:5050/uploads/<image_name>

## 💡 Example Razorpay Test Keys

For development, use Razorpay Test Keys:  
https://razorpay.com/docs/payments/test-card-upi-details/

Example:

RAZORPAY_KEY_ID=rzp_test_Bz3o6kTb0wugeq  
RAZORPAY_SECRET=yE8uemffi2u91Pk3lECKhZsA

Replace these with your actual Razorpay test keys.

## ✅ Final Checklist

- [x] MongoDB running locally  
- [x] `.env` file added to backend  
- [x] `uploads/` folder created  
- [x] Backend server running on port 5050  
- [x] Frontend running on port 3000  
- [x] Razorpay payment works in test mode


