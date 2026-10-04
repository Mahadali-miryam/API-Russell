const request = require("supertest");
const app = require("../app");

let catwayId;

// Regroupe les tests des routes des catways
describe("Tests des catways", () => {
  // Vérifie que la liste des catways est bien retournée
  it("GET /catways doit retourner la liste des catways", async () => {
    const response = await request(app).get("/catways");

    if (response.status !== 200) {
      throw new Error("La route /catways ne répond pas correctement");
    }

    if (!Array.isArray(response.body)) {
      throw new Error("La réponse doit être un tableau");
    }
  });

  // Vérifie qu'un catway inexistant renvoie une erreur 404
  it("GET /catways/:id doit retourner 404 si le catway est introuvable", async () => {
    const response = await request(app).get(
      "/catways/000000000000000000000000",
    );

    if (response.status !== 404) {
      throw new Error("Le statut attendu est 404");
    }
  });

  // Vérifie qu'un nouveau catway peut être créé
  it("POST /catways doit créer un nouveau catway", async () => {
    const nouveauCatway = {
      catwayNumber: Date.now(),
      catwayType: "long",
      catwayState: "Bon état",
    };

    const response = await request(app).post("/catways").send(nouveauCatway);

    if (response.status !== 201) {
      throw new Error("Le catway n'a pas été créé");
    }

    // Conserve l'identifiant MongoDB du catway créé
    catwayId = response.body._id;
  });

  // Vérifie qu'un catway existant peut être récupéré par son identifiant
  it("GET /catways/:id doit retourner un catway existant", async () => {
    const response = await request(app).get(`/catways/${catwayId}`);

    if (response.status !== 200) {
      throw new Error("Le catway n'a pas été trouvé");
    }

    if (response.body._id !== catwayId) {
      throw new Error("Le catway retourné est incorrect");
    }
  });

  // Vérifie le remplacement complet d'un catway
  it("PUT /catways/:id doit modifier un catway existant", async () => {
    const catwayModifie = {
      catwayNumber: Date.now(),
      catwayType: "long",
      catwayState: "État modifié",
    };

    const response = await request(app)
      .put(`/catways/${catwayId}`)
      .send(catwayModifie);

    if (response.status !== 200) {
      throw new Error("Le catway n'a pas été modifié");
    }

    if (response.body.catwayState !== "État modifié") {
      throw new Error("Les données du catway n'ont pas été remplacées");
    }
  });

  // Vérifie la modification partielle d'un catway
  it("PATCH /catways/:id doit modifier uniquement le champ transmis", async () => {
    const response = await request(app)
      .patch(`/catways/${catwayId}`)
      .send({ catwayState: "Bon état après modification" });

    if (response.status !== 200) {
      throw new Error(
        `Erreur PATCH : statut ${response.status} - ${JSON.stringify(response.body)}`,
      );
    }

    if (response.body.catwayState !== "Bon état après modification") {
      throw new Error("La modification partielle a échoué");
    }
  });

  // Vérifie la suppression d'un catway
  it("DELETE /catways/:id doit supprimer un catway existant", async () => {
    const response = await request(app).delete(`/catways/${catwayId}`);

    if (response.status !== 200) {
      throw new Error("Le catway n'a pas été supprimé");
    }

    // Vérifie que le catway supprimé n'est plus accessible
    const verification = await request(app).get(`/catways/${catwayId}`);

    if (verification.status !== 404) {
      throw new Error("Le catway existe encore après sa suppression");
    }
  });
});
