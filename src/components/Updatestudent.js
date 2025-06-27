// src/components/UpdateStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateStudent = () => {
  const [id, setId] = useState('');
  const [data, setData] = useState({
    Firstname: '',
    Lastname: '',
    Gender: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!id) {
      toast.error('Please provide a student ID');
      return;
    }

    try {
      await axios.patch(`http://localhost:4000/api/UpdateStudent/${id}`, data);
      toast.success('✅ Student updated successfully');
      setId('');
      setData({ Firstname: '', Lastname: '', Gender: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to update student');
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h3 className="mb-4">Update Student</h3>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="Firstname"
            value={data.Firstname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="Lastname"
            value={data.Lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="Gender"
            value={data.Gender}
            onChange={handleChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Student
        </Button>
      </Form>
    </div>
  );
};

export default UpdateStudent;
