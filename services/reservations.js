const Reservation = require("../models/reservations");

// Récupère toutes les réservations d'un catway
const getAllReservations = async (catwayNumber) => {
  return await Reservation.find({ catwayNumber });
};

// Récupère une réservation précise
const getReservationById = async (catwayNumber, idReservation) => {
  return await Reservation.findOne({
    _id: idReservation,
    catwayNumber,
  });
};

// Crée une nouvelle réservation
const createReservation = async (data) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

// Supprime une réservation
const deleteReservation = async (catwayNumber, idReservation) => {
  return await Reservation.findOneAndDelete({
    _id: idReservation,
    catwayNumber,
  });
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  deleteReservation,
};