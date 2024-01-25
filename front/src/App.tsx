import React from 'react';
import GamePageContainer from './components/GamePage/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageContainer from './components/HomePage/index-h';
import QuestionGenerator from './components/QuestionGenerator/QuestionGenerator';

import './App.css';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageContainer />} />
        <Route path="/question" element={<QuestionGenerator />} />
        <Route path="/quiz" element={<GamePageContainer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

