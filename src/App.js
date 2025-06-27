import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Register from './components/registration';
import Login from './components/login';
import Navbar from './components/navbar';
import UpdateStudent from './components/Updatestudent';
import AllStudents from './components/Allstudents';
import GetAllStudents from './components/getAllStudents';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/Registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Updatestudent" element={<UpdateStudent />} />
          <Route path="/Allstudents" element={<AllStudents />} />
          <Route path="/getAllStudents" element={<GetAllStudents/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
