const mongoose = require("mongoose");

// Définition du schéma qui décrit la structure d'un catway dans MongoDB
const catwaySchema = mongoose.Schema({
// Numéro du catway : obligatoire et unique
  catwayNumber: {
    type: Number,
    required: true,
    unique: true,
  },

// Type de catway : obligatoire
  catwayType: {
    type: String,
    required: true,
  },

// État du catway : obligatoire
  catwayState: {
    type: String,
    required: true,
  },
});
// Création et exportation du modèle Catway pour accéder aux données dans MongoDB
module.exports = mongoose.model("Catway", catwaySchema);
