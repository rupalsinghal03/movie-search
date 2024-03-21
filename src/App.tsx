import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './movieSearch/HomePage';
import LoadingSpinner from './movieSearch/LoadingSpinner';

function App() {
  return (
    <div className="App pt-4">
      <h1> Search Movie</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
