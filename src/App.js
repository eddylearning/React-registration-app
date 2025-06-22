import React from 'react';
import './App.css';
import Register from './components/registration';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <h2>Register</h2>
      <Register />
      <h2>login</h2>
      <Login />
    </div>
  );
}

export default App;