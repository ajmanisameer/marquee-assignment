import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Main from './MainRoutes';

function App() {
  // console.log = function no_console() {};
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
