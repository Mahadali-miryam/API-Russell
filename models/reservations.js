const mongoose = require("mongoose");

// Définition du schéma qui décrit la structure d'une réservation
const reservationSchema = mongoose.Schema({
  // Numéro du catway concerné par la réservation
  catwayNumber: {
    type: Number,
    required: true,
  },

  // Nom du client qui effectue la réservation
  clientName: {
    type: String,
    required: true,
  },

  // Nom du bateau réservé
  boatName: {
    type: String,
    required: true,
  },

  // Date d'arrivée du client
  checkIn: {
    type: Date,
    required: true,
  },

  // Date de départ du client
  checkOut: {
    type: Date,
    required: true,
  },
});

// Création et exportation du modèle Reservation pour gérer les réservations dans MongoDB
module.exports = mongoose.model("Reservation", reservationSchema);
