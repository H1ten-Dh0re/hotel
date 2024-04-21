

import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

function App(){
  return (
    <Router>

      <Routes>
        <Route path="/" element={<SignInForm/>} />

        <Route path="/signup" element={<SignUpForm/>} />
      </Routes>
    </Router>
  );
};

export default App;

