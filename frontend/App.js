import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import DeleteUser from "./components/deleteUser";

function App() {
  return (
    <Router>
      <h1>Gestion des Utilisateurs</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUserForm />} />
        <Route path="/delete/:id" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
}

export default App;
