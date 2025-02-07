import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/users", { name, email })
      .then(() => navigate("/"))
      .catch(error => console.error("Erreur :", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un utilisateur</h2>
      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddUserForm;
