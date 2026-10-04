const express = require("express");
const router = express.Router();
const catwayService = require("../services/catways");

// Récupère et renvoie la liste de tous les catways
router.get("/", async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupère un catway à partir de son identifiant
router.get("/:id", async (req, res) => {
  try {
    const catway = await catwayService.getCatwayById(req.params.id);
    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crée un nouveau catway à partir des données reçues
router.post("/", async (req, res) => {
  try {
    const nouveauCatway = await catwayService.createCatway(req.body);

    res.status(201).json(nouveauCatway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remplace les données d'un catway existant
router.put("/:id", async (req, res) => {
  try {
    const catway = await catwayService.updateCatway(req.params.id, req.body);

    if (!catway) {
      return res.status(404).json({
        message: "Catway non trouvé",
      });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modifie uniquement les champs transmis pour un catway
router.patch("/:id", async (req, res) => {
  try {
    const catway = await catwayService.patchCatway(req.params.id, req.body);

    if (!catway) {
      return res.status(404).json({
        message: "Catway non trouvé",
      });
    }

    res.status(200).json(catway);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprime un catway à partir de son identifiant
router.delete("/:id", async (req, res) => {
  try {
    const catway = await catwayService.deleteCatway(req.params.id);

    if (!catway) {
      return res.status(404).json({
        message: "Catway non trouvé",
      });
    }

    res.status(200).json({
      message: "Catway supprimé avec succès",
      catway,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rend le routeur disponible pour l'application
module.exports = router;
