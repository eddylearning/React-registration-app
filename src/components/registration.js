
// src/components/rregistration.js
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [data, setData] = useState({
    Firstname: '',
    Lastname: '',
    gender: ''
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = async (e) => {
    e.preventDefault();

     setSuccessMessage("");
    setErrorMessage("");

    try {
      // Removed unused response variable
      await axios.post(
        "http://localhost:4000/api/addStudent",
        data,
        {
          withCredentials: true,
        }
      );

      setSuccessMessage("✅ Student added successfully");
      setData({ Firstname: "", Lastname: "", gender: "" });
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.error?.message || "Failed to add student."
      );
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Add Student</h3>
      <Form onSubmit={saveStudent}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
         register student
        </Button>
      </Form>
    </div>
  );
};

export default Register;