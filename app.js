const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch((error) => {
    console.log("Connexion à MongoDB échouée !");
    console.error(error);
  });

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
