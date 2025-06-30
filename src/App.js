import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Register from './components/registration';
import Login from './components/login';
import Navbar from './components/navbar';
import UpdateStudent from './components/Updatestudent';
import AllStudents from './components/Allstudents';
import GetAllStudents from './components/getAllStudents';

// Optional NotFound component (you can customize this)
const NotFound = () => (
  <div className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Optional home route */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/Registration" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Updatestudent" element={<UpdateStudent />} />
            <Route path="/Allstudents" element={<AllStudents />} />
            <Route path="/getAllStudents" element={<GetAllStudents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
