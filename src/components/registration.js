import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [data, setData] = useState({
        // this match with what is in model student file
        Firstname: '',
        Lastname: '',
        Gender: ''
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const saveStudent = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:4000/api/addStudent",
                 data, {
                withCredentials: true,
            });

            toast.success("✅ Student added successfully");
            setData({ Firstname: "", Lastname: "", Gender: "" });
        } catch (error) {
            console.error("❌ Error:", error.response?.data || error.message);
            toast.error(
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
                        name="Firstname"
                        value={data.firstname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="Lastname"
                        value={data.lastname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        name="Gender"
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
                    Register Student
                </Button>
            </Form>
        </div>
    );
};

export default Register;
