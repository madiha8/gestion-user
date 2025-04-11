const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Récupérer tous les utilisateurs
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Ajouter un nouvel utilisateur
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, name, email });
    }
  );
});

// Mettre à jour un utilisateur
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, req.params.id],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: req.params.id, name, email });
    }
  );
});

// Supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
  db.run(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: "Utilisateur supprimé" });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});