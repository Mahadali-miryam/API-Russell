const mongoose = require("mongoose");

// Définition du schéma qui décrit la structure d'un utilisateur
const userSchema = mongoose.Schema({
  
  // Nom de l'utilisateur : obligatoire
  name: {
    type: String,
    required: true,
  },

  // Adresse e-mail : obligatoire et unique
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Mot de passe : obligatoire
  password: {
    type: String,
    required: true,
  },
});

// Création et exportation du modèle User pour gérer les utilisateurs dans MongoDB
module.exports = mongoose.model("User", userSchema);
