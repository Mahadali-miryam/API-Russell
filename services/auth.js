const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Inscription d'un nouvel utilisateur
const register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return await user.save();
};

// Connexion d'un utilisateur
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};

// Exportation des fonctions
module.exports = {
  register,
  login,
};
