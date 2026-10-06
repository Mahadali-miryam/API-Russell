const request = require("supertest");
const app = require("../app");

let token;
let reservationId;

describe("Tests des réservations", () => {
  // Crée un utilisateur et récupère son token
  before(async () => {
    const utilisateur = {
      name: "Test Reservation",
      email: `reservation${Date.now()}@example.com`,
      password: "123456",
    };

    await request(app).post("/auth/register").send(utilisateur);

    const response = await request(app).post("/auth/login").send({
      email: utilisateur.email,
      password: utilisateur.password,
    });

    token = response.body.token;
  });

  // Vérifie que la liste des réservations est retournée
  it("GET /catways/1/reservations doit retourner la liste des réservations", async () => {
    const response = await request(app)
      .get("/catways/1/reservations")
      .set("Authorization", `Bearer ${token}`);

    if (response.status !== 200) {
      throw new Error("La liste des réservations n'a pas été retournée");
    }

    if (!Array.isArray(response.body)) {
      throw new Error("La réponse doit être un tableau");
    }

    if (response.body.length === 0) {
      throw new Error("Aucune réservation trouvée pour le catway 1");
    }

    reservationId = response.body[0]._id;
  });

  // Vérifie qu'une réservation précise peut être récupérée
  it("GET /catways/1/reservations/:idReservation doit retourner une réservation", async () => {
    const response = await request(app)
      .get(`/catways/1/reservations/${reservationId}`)
      .set("Authorization", `Bearer ${token}`);

    if (response.status !== 200) {
      throw new Error("La réservation n'a pas été trouvée");
    }

    if (response.body._id !== reservationId) {
      throw new Error("La réservation retournée est incorrecte");
    }
  });

  // Vérifie qu'une réservation peut être créée
  it("POST /catways/1/reservations doit créer une réservation", async () => {
    const nouvelleReservation = {
      clientName: "Client Test",
      boatName: "Bateau Test",
      checkIn: "2026-10-10T10:00:00.000Z",
      checkOut: "2026-10-15T10:00:00.000Z",
    };

    const response = await request(app)
      .post("/catways/1/reservations")
      .set("Authorization", `Bearer ${token}`)
      .send(nouvelleReservation);

    if (response.status !== 201) {
      throw new Error(
        `La réservation n'a pas été créée : ${JSON.stringify(response.body)}`,
      );
    }

    if (!response.body._id) {
      throw new Error("L'identifiant de la réservation est absent");
    }

    reservationId = response.body._id;
  });

  // Vérifie qu'une réservation peut être supprimée
  it("DELETE /catways/1/reservations/:idReservation doit supprimer une réservation", async () => {
    const response = await request(app)
      .delete(`/catways/1/reservations/${reservationId}`)
      .set("Authorization", `Bearer ${token}`);

    if (response.status !== 200) {
      throw new Error("La réservation n'a pas été supprimée");
    }
  });
});
