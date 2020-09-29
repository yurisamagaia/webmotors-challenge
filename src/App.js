import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './routes'
import Header from './components/header'
 
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
