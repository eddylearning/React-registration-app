import React from 'react';
import { Link } from 'react-router-dom';


const Navbar= ()=>{
return (
    <nav className="navbar">
      <h1>Registration</h1>
      <div className="links">
         
        <Link to="/">Home</Link>
        <Link to="/registration">Register</Link> 
        <Link to="/login">Login</Link>
        <Link to="/Updatestudent">UpdateStudent</Link>
        <Link to="/Allstudents">AllStudents</Link>

      
      </div>
    </nav>
  );
}
export default Navbar;