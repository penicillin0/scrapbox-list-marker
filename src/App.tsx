import React from 'react';
import './App.css';
import { Console } from './components/Console';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Console />
    </div>
  );
};

export default App;
