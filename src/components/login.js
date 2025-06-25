import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Spinner } from 'react-bootstrap';

// src/components/GetStudents.js
const Login = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const token = sessionStorage.getItem('access_token'); // Optional if using auth
      const response = await axios.get('http://localhost:4000/api/getAllStudent', {
        headers: {
          Authorization: `Bearer ${token}`, // Optional
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('❌ Failed to fetch students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="mb-4 text-center">All Students</h3>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : students.length === 0 ? (
        <p className="text-center text-muted">No students found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id || index}>
                <td>{index + 1}</td>
                <td>{student.Firstname || student.firstname}</td>
                <td>{student.Lastname || student.lastname}</td>
                <td>{student.Gender || student.gender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Login;
