
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext'; // adjust path

const Login = () => {
  const { login, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    await login(email, password, () => {
      toast.success('✅ Logged in successfully');
      navigate('/students'); // redirect after login
    });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {error && <div className="text-danger mt-3">{error}</div>}
      </Form>
    </div>
  );
};

export default Login;

