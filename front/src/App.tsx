import React from 'react';
import QuizPage from './components/QuizPage/QuizPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePageContainer from './components/HomePage/index';

import './App.css';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageContainer />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

