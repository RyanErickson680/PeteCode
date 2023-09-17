import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/homepage'
import Board from './Pages/board';
import Competitions from './Pages/competitions/competitions';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Reset from "./auth/Reset";
import Dashboard from "./auth/Dashboard";
import Recommendations from './Pages/recommendations';
import POTDBoard from './Pages/POTDboard';

function App() {
  return (
    <div className="app">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path='/' element={<Home />} />
          <Route path='/board' element={<Board />} />
          <Route path='/competitions' element={<Competitions />} />
          <Route path='/recommendations' element={<Recommendations/>} />
          <Route path='/POTDboard' element={<POTDBoard/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;