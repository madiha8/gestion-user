const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json()); // Pour lire le JSON
app.use(cors()); // Pour éviter les problèmes CORS

// Connexion à SQLite
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Erreur de connexion à SQLite:", err.message);
    } else {
        console.log("✅ Connecté à SQLite.");
    }
});

// Création de la table si elle n'existe pas
db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )`,
    (err) => {
        if (err) {
            console.error("Erreur de création de la table:", err.message);
        } else {
            console.log("✅ Table 'users' prête.");
        }
    }
);

//  Route pour récupérer tous les utilisateurs
app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

//  Route pour ajouter un utilisateur
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Veuillez fournir un nom et un email" });
    }

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.run(sql, [name, email], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, email });
    });
});

//  Route pour supprimer un utilisateur
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Utilisateur supprimé" });
  });
});


//  Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
