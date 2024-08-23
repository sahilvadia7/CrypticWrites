import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from 'D:/My Project/CrypticWrites/src/components/Register/Register.js'; 
import Login from 'D:/My Project/CrypticWrites/src/components/Login/Login.js';
import MyIndex from './view/MyIndex';

function App() {
  return (
    <BrowserRouter>
      {/* <AppHeader /> */}
      <Routes>
        <Route path="/" element={<MyIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;