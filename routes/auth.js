const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const authService = require("../services/auth");

// Inscription d'un utilisateur
router.post("/register", async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connexion d'un utilisateur
router.post("/login", async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Modifier un utilisateur (route protégée)
router.put("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await authService.updateUser(req.params.id, req.body);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json({
      message: "Utilisateur modifié avec succès",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un utilisateur (route protégée)
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await authService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
