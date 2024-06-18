import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "./service";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const EmployeeTable = () => {
  const [datas, setData] = useState([]);
  const navigator = useNavigate();

 
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    listEmployees()
      .then((employees) => {
        setData(employees);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      });
  };

  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => {
        fetchEmployees(); // Refresh the list after deletion
      })
      .catch((err) => {
        console.error("Error deleting employee:", err);
      });
  };


  function handleAdd () {
      navigator("/add-employee")
  }

  function updateEmployee (id) {
       navigator(`edit-employee/${id}`)
  }





  return (
    <div>
         <button onClick={handleAdd}>Add Employee</button>
      <table border="1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Firstname</th>
            <th>Employee Lastname</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                 <button onClick={() => updateEmployee(employee.id)}>update</button>
                 <button onClick={ () => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
