const request = require("supertest");
const app = require("../app");

let emailTest = `test${Date.now()}@example.com`;
const passwordTest = "123456";

// Regroupe les tests de l'authentification
describe("Tests de l'authentification", () => {

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
  });

  // Connexion de l'utilisateur
  it("POST /auth/login doit connecter l'utilisateur", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: emailTest,
        password: passwordTest,
      });

    if (response.status !== 200) {
      throw new Error("La connexion a échoué");
    }

    if (!response.body.token) {
      throw new Error("Le token JWT est absent");
    }
  });
});