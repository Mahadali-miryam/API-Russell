const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Importation des routes liées aux catways et aux réservations et à l'authentification
const catwaysRouter = require("./routes/catways");
const reservationsRouter = require("./routes/reservations");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

// Permet à Express de comprendre les données envoyées au format JSON
app.use(express.json());

// Association des routes à leurs URL respectives
app.use("/catways", authMiddleware, catwaysRouter);
app.use("/catways", authMiddleware, reservationsRouter);
app.use("/auth", authRouter);

// Connexion à la base de données MongoDB grâce à l'URL stockée dans le fichier .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch((error) => {
    console.log("Connexion à MongoDB échouée !");
    console.error(error);
  });

// Démarre le serveur uniquement lorsque ce fichier est exécuté directement
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
  });
}

// Permet d'utiliser l'application dans les tests
module.exports = app;
