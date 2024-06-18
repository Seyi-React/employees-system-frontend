import EmployeeTable from "./Component/EmployeeData";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddEmployee from "./Component/AddEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
       
        <Routes>
          <Route path="/" Component={ EmployeeTable } />
          <Route path="/add-employee" Component={AddEmployee} />
          <Route  path="/edit-employee/:id" Component={AddEmployee} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
