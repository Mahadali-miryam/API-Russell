const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Importation des routes liées aux catways et aux réservations
const catwaysRouter = require("./routes/catways");
const reservationsRouter = require("./routes/reservations");

// Permet à Express de comprendre les données envoyées au format JSON
app.use(express.json());

// Associe les routes des catways et des réservations à l'URL /catways
app.use("/catways", catwaysRouter);
app.use("/catways", reservationsRouter);

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
