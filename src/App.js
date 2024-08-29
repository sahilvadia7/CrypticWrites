import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register.js'; 
import Login from './components/Login/Login.js';
import MyIndex from './view/MyIndex';
import AboutUs from './view/AboutUs.js';
import Contact from './components/Contact/Contact.jsx';
import About from './components/About/About.jsx';


function App() {
  return (
    <BrowserRouter>
      {/* <AppHeader /> */}
      <Routes>
        <Route path="/" element={<MyIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;