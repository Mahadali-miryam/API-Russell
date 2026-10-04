// Importation du modèle Catway pour interagir avec la collection MongoDB
const Catway = require("../models/catways");

// Récupère la liste de tous les catways
const getAllCatways = async () => {
  return await Catway.find();
};

// Recherche un catway à partir de son identifiant
const getCatwayById = async (id) => {
  return await Catway.findById(id);
};

// Crée un nouveau catway et l'enregistre dans la base de données
const createCatway = async (data) => {
  const catway = new Catway(data);
  return await catway.save();
};

// Remplace entièrement les données d'un catway existant
const updateCatway = async (id, data) => {
  return await Catway.findOneAndReplace({ _id: id }, data, {
    new: true,
    runValidators: true,
  });
};

// Modifie uniquement les champs transmis sans remplacer tout le catway
const patchCatway = async (id, data) => {
  return await Catway.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true },
  );
};

// Supprime un catway à partir de son identifiant
const deleteCatway = async (id) => {
  return await Catway.findByIdAndDelete(id);
};

// Rend les fonctions disponibles pour les routes et les autres fichiers
module.exports = {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatway,
  patchCatway,
  deleteCatway,
};
