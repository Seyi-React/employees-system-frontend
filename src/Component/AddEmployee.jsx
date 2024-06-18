import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "./service"
import { useParams } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  useEffect(() => {
    if (id) {
      getEmployee(id).then((data) => {
        setEmployee({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
        });
      }).catch(error => {
        console.error("Error fetching employee:", error);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!employee.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }
    if (!employee.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }
    if (!employee.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (id) {
      updateEmployee(id, employee).then((res) => {
        console.log(res);
        navigate("/");
      }).catch(error => {
        console.error("Error updating employee:", error);
      });
    } else {
      createEmployee(employee).then((res) => {
        console.log(res);
        navigate("/");
      }).catch(error => {
        console.error("Error creating employee:", error);
      });
    }
  };

  const pageTitle = () => {
    return id ? <h3>Update Employee</h3> : <h3>Add Employee</h3>;
  };

  return (
    <div>
      {pageTitle()}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          {errors.firstName && (
            <small style={{ color: "red" }}>{errors.firstName}</small>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          {errors.lastName && (
            <small style={{ color: "red" }}>{errors.lastName}</small>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <small style={{ color: "red" }}>{errors.email}</small>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployee;
