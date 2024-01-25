import React from 'react';
import QuizPageContainer from './components/QuizPage/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePageContainer from './components/HomePage/index';
import QuestionGenerator from './components/QuestionGenerator/QuestionGenerator';

import './App.css';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageContainer />} />
        <Route path="/question" element={<QuestionGenerator />} />
        <Route path="/quiz" element={<QuizPageContainer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

