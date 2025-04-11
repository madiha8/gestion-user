import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur :", error));
  }, []);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <Link to="/add">Ajouter un utilisateur</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Link to={`/delete/${user.id}`}>❌ Supprimer</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
