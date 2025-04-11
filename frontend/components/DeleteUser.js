import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur :", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error("Erreur :", error));
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>❌ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
