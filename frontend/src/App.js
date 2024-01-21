// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import Login from './components/Login';
import Signup from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" 
        
        element={<PrivateRoute>  <Form/>  </PrivateRoute> }/>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
