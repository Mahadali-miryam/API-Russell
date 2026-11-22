const token = sessionStorage.getItem("token");
const reservationsList = document.getElementById("reservationsList");
const message = document.getElementById("message");

if (!token) {
  window.location.href = "/";
}

// Afficher les réservations d'un catway
async function afficherReservations(catwayNumber) {
  try {
    const response = await fetch(`/catways/${catwayNumber}/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const reservations = await response.json();

    if (!response.ok) {
      throw new Error("Impossible de récupérer les réservations.");
    }

    reservationsList.innerHTML = "";

    reservations.forEach((reservation) => {
      const element = document.createElement("div");

      element.textContent =
        `Catway n° ${reservation.catwayNumber} - ` +
        `${reservation.clientName} - ${reservation.boatName} - ` +
        `Du ${new Date(reservation.checkIn).toLocaleDateString()} ` +
        `au ${new Date(reservation.checkOut).toLocaleDateString()}`;

      reservationsList.appendChild(element);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}

// Afficher les réservations du catway choisi
document
  .getElementById("listReservationsForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const catwayNumber = document.getElementById("listCatwayNumber").value;

    await afficherReservations(catwayNumber);
  });

// Créer une réservation
document
  .getElementById("createReservationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const catwayNumber = document.getElementById("catwayNumber").value;

    const nouvelleReservation = {
      clientName: document.getElementById("clientName").value,
      boatName: document.getElementById("boatName").value,
      checkIn: document.getElementById("checkIn").value,
      checkOut: document.getElementById("checkOut").value,
    };

    try {
      const response = await fetch(`/catways/${catwayNumber}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nouvelleReservation),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Impossible de créer la réservation.");
      }

      message.textContent = "Réservation créée avec succès !";
      event.target.reset();
      await afficherReservations(catwayNumber);
    } catch (error) {
      message.textContent = error.message;
    }
  });

// Consulter une réservation
document
  .getElementById("getReservationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const catwayNumber = document.getElementById("getCatwayNumber").value;
    const reservationId = document.getElementById("getReservationId").value;
    const details = document.getElementById("reservationDetails");

    try {
      const response = await fetch(
        `/catways/${catwayNumber}/reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Réservation introuvable.");
      }

      details.textContent =
        `Client : ${data.clientName} | Bateau : ${data.boatName} | ` +
        `Arrivée : ${new Date(data.checkIn).toLocaleDateString()} | ` +
        `Départ : ${new Date(data.checkOut).toLocaleDateString()}`;
    } catch (error) {
      details.textContent = error.message;
    }
  });

// Supprimer une réservation
document
  .getElementById("deleteReservationForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const catwayNumber = document.getElementById("deleteCatwayNumber").value;
    const reservationId = document.getElementById("deleteReservationId").value;

    if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
      return;
    }

    try {
      const response = await fetch(
        `/catways/${catwayNumber}/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de supprimer la réservation.",
        );
      }

      message.textContent = "Réservation supprimée avec succès !";
      event.target.reset();
      await afficherReservations(catwayNumber);
    } catch (error) {
      message.textContent = error.message;
    }
  });
