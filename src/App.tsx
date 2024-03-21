import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './movieSearch/HomePage';

function App() {
  return (
    <div className="App">
      Search Movie
      <Router>
       <Routes>
       <Route path="/" element={<HomePage />} />
       </Routes>
      </Router>

    </div>
  );
}

export default App;
