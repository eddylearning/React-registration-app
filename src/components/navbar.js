import React from 'react';
import { Link } from 'react-router-dom';


const Navbar= ()=>{
return (
    <nav className="navbar">
      <h1>Registration</h1>
      <div className="links">
         
        <Link to="/">Home</Link>
         <Link to="/About">Register</Link> 
        <Link to="/Create">Login</Link>
      
      </div>
    </nav>
  );
}
export default Navbar;