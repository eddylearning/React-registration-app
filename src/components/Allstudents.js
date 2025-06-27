// // src/components/GetAllStudents.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import Table from 'react-bootstrap/Table';
// import 'react-toastify/dist/ReactToastify.css';

// const GetAllStudents = () => {
//   const [students, setStudents] = useState([]);

//   const fetchAllStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/getAllStudent');
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('❌ Failed to fetch students');
//     }
//   };

//   useEffect(() => {
//     fetchAllStudents();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <ToastContainer />
//       <h3 className="mb-4">All Students</h3>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Gender</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.length === 0 ? (
//             <tr>
//               <td colSpan="4" className="text-center">No students found</td>
//             </tr>
//           ) : (
//             students.map((student, index) => (
//               <tr key={student._id}>
//                 <td>{index + 1}</td>
//                 <td>{student.Firstname}</td>
//                 <td>{student.Lastname}</td>
//                 <td>{student.Gender}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default GetAllStudents;

import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useNavigate } from "react-router-dom";// correct  import for react router v6

const AllStudents = () => {
  const [records, setRecords] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
//   const navigate = useHistory();
 const navigate = useNavigate();

  const loadEdit = (student_id) => {
    // navigate("/api/measurement/" + id);
    navigate.push("/UpdateStudent/" + student_id);
  };

  const LoadStudent = (student_id) => {
    // navigate("/api/measurement/" + id);
    navigate.push("/StudentDetails/" + student_id);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get(`http://localhost:4000/api/students/getallStudents`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setUnauthorized(true);
        }
      })
      .finally(() => {});
  }, []);

  return (
    <div className='class="d-flex justify-content-center align-items-center mx-auto col-md-12'>
      <div className="mt-3">
        <h5> All Students Details </h5>
        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>
                  <td>{r.firstname}</td>
                  <td>{r.lastname}</td>
                  <td>{r.gender}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="default"
                        id="dropdown-basic"
                        size="md"
                      >
                        Perform Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Link
                          to="/action-1"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            LoadStudent(r._id);
                          }}
                        >
                          Details
                        </Link>
                        <Link
                          to="/UpdateStudent/:id"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadEdit(r._id);
                          }}
                        >
                          Edit Student
                        </Link>
                        {/* <Link to="/delete" className="dropdown-item" onClick={(e) => { e.preventDefault(); LoadDelete(r.vendor_id)}}>
                                    Delete
                                    </Link> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;