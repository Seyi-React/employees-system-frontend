import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

// Fetch a specific employee by ID
export const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};

// Fetch all employees
export const listEmployees = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Create a new employee
export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(REST_API_BASE_URL, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update an existing employee
export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${REST_API_BASE_URL}/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`${REST_API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };
