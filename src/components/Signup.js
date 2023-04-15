import React, { useState } from 'react';
import axios from 'axios';
//import { CloudinaryWidget } from 'react-cloudinary-upload-widget';
//import "./App.css";
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
//  const [role, setRole] = useState('');
 // const [avatarUrl, setAvatarUrl] = useState('');

  /*const handleAvatarUpload = (url) => {
    setAvatarUrl(url);
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/register`, {
        name,
        email,
        password,
        phone,
        address,
        //role,
      });
      console.log(res.data);
      alert('Registration Successful!');
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input type='text' id='phone' onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label htmlFor='address'>Address:</label>
          <input type='text' id='address' onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
