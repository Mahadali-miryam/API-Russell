const request = require("supertest");
const app = require("../app");

let emailTest = `test${Date.now()}@example.com`;
const passwordTest = "123456";
let userId;
let token;

// Regroupe les tests de l'authentification
describe("Tests de l'authentification", function () {
  this.timeout(10000);
  // Création d'un utilisateur
  it("POST /auth/register doit créer un utilisateur", async () => {
    const utilisateur = {
      name: "Test",
      email: emailTest,
      password: passwordTest,
    };

    const response = await request(app)
      .post("/auth/register")
      .send(utilisateur);

    if (response.status !== 201) {
      throw new Error("L'utilisateur n'a pas été créé");
    }

    if (!response.body.user) {
      throw new Error("Les informations de l'utilisateur sont absentes");
    }

    userId = response.body.user.id;
  });

  // Connexion de l'utilisateur
  it("POST /auth/login doit connecter l'utilisateur", async () => {
    const response = await request(app).post("/auth/login").send({
      email: emailTest,
      password: passwordTest,
    });

    if (response.status !== 200) {
      throw new Error("La connexion a échoué");
    }

    if (!response.body.token) {
      throw new Error("Le token JWT est absent");
    }

    token = response.body.token;
  });

  // Modification d'un utilisateur
  it("PUT /auth/users/:id doit modifier un utilisateur", async () => {
    const response = await request(app)
      .put(`/auth/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test modifié" });

    if (response.status !== 200) {
      throw new Error(
        "La modification de l'utilisateur a échoué : " +
          JSON.stringify(response.body),
      );
    }

    if (response.body.user.name !== "Test modifié") {
      throw new Error("Le nom de l'utilisateur n'a pas été modifié");
    }
  });

  // Suppression d'un utilisateur
  it("DELETE /auth/users/:id doit supprimer un utilisateur", async () => {
    const response = await request(app)
      .delete(`/auth/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    if (response.status !== 200) {
      throw new Error(
        "La suppression de l'utilisateur a échoué : " +
          JSON.stringify(response.body),
      );
    }
  });
});
