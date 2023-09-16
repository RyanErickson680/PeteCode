import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages'
import Page1 from './Pages/page1';
import Page2 from './Pages/page2';
import Page3 from './Pages/page3';
import Board from './Pages/board';
import Competitions from './Pages/competitions';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/board' element={<Board />} />
                <Route path='/competitions' element={<Competitions />} />
                <Route path='/page3' element={<Page3 />} />
            </Routes>
        </Router>
        
    );
}

export default App;
