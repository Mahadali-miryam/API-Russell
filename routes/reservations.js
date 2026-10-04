const express = require("express");
const router = express.Router();

const reservationService = require("../services/reservations");

// Récupérer toutes les réservations d'un catway
router.get("/:catwayNumber/reservations", async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations(
      Number(req.params.catwayNumber),
    );

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer une réservation précise
router.get("/:catwayNumber/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      Number(req.params.catwayNumber),
      req.params.idReservation,
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer une réservation
router.post("/:catwayNumber/reservations", async (req, res) => {
  try {
    const reservation = await reservationService.createReservation({
      ...req.body,
      catwayNumber: Number(req.params.catwayNumber),
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer une réservation
router.delete(
  "/:catwayNumber/reservations/:idReservation",
  async (req, res) => {
    try {
      const reservation = await reservationService.deleteReservation(
        Number(req.params.catwayNumber),
        req.params.idReservation,
      );

      if (!reservation) {
        return res.status(404).json({ message: "Réservation introuvable" });
      }

      res.status(200).json({ message: "Réservation supprimée" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

module.exports = router;
