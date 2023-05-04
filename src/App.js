import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Signup';
import { ToastContainer } from 'react-toastify';
import Product from './components/product';
import ProductDetails from './components/ProductDetails';
//import { AuthProvider } from './context/auth';
//import API from './api';
const Message = ({ message }) => {
  return <h1>{message}</h1>;
};
const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/message")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Check if it has the 'message' property
        setMessage(data.message);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/message" element={<Message message={message} />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
