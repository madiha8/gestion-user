import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/users';

  // Simuler une base de données (en réalité, vous devriez connecter à votre backend/database.js)
  useEffect(() => {
    // Simuler un chargement depuis la base de données
    const mockUsers = [
      { id: 1, name: 'madiha', email: 'madiha@example.com' },
      { id: 2, name: 'malak', email: 'malak@example.com' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (isEditing) {
      // Mise à jour de l'utilisateur
      setUsers(users.map(user => user.id === formData.id ? formData : user));
    } else {
      // Ajout d'un nouvel utilisateur
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }

    // Réinitialiser le formulaire
    setFormData({ name: '', email: '', id: null });
    setIsEditing(false);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>Gestion des Utilisateurs</h1>
        
        <div className="form-container">
          <h2>{isEditing ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              {isEditing ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {isEditing && (
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setFormData({ name: '', email: '', id: null });
                  setIsEditing(false);
                }}
              >
                Annuler
              </button>
            )}
          </form>
        </div>

        <div className="users-table">
          <h2>Liste des Utilisateurs</h2>
          {users.length === 0 ? (
            <p>Aucun utilisateur à afficher</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="actions">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="edit-btn"
                      >
                        Modifier
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="delete-btn"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;