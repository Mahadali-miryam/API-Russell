const token = sessionStorage.getItem("token");

const catwaysList = document.getElementById("catwaysList");
const message = document.getElementById("message");
const createCatwayForm = document.getElementById("createCatwayForm");

// Vérifie que l'utilisateur est connecté
if (!token) {
  window.location.href = "/";
}

// Récupère et affiche les catways
async function afficherCatways() {
  try {
    const response = await fetch("/catways", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer les catways.");
    }

    const catways = await response.json();

    catwaysList.innerHTML = "";

    catways.forEach((catway) => {
      const element = document.createElement("div");

      const numero = document.createElement("h3");
      numero.textContent = `Catway n° ${catway.catwayNumber}`;

      const type = document.createElement("p");
      type.textContent = `Type : ${catway.type || catway.catwayType}`;

      const etat = document.createElement("p");
      etat.textContent = `État : ${catway.catwayState}`;

      element.append(numero, type, etat);
      catwaysList.appendChild(element);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}

// Ajoute un nouveau catway
createCatwayForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nouveauCatway = {
    catwayNumber: Number(document.getElementById("catwayNumber").value),
    type: document.getElementById("type").value,
    catwayState: document.getElementById("catwayState").value,
  };

  try {
    const response = await fetch("/catways", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nouveauCatway),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Impossible de créer le catway.");
    }

    message.textContent = "Catway créé avec succès !";
    createCatwayForm.reset();

    await afficherCatways();
  } catch (error) {
    message.textContent = error.message;
  }
});

// Modifie l'état d'un catway
document
  .getElementById("updateCatwayForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("updateCatwayId").value;
    const catwayState = document.getElementById("newCatwayState").value;

    try {
      const response = await fetch(`/catways/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ catwayState }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Erreur lors de la modification",
        );
      }

      message.textContent = "État du catway modifié avec succès !";

      document.getElementById("updateCatwayForm").reset();

      // Actualise la liste des catways
      await afficherCatways();
    } catch (error) {
      message.textContent = error.message;
    }
  });

// Supprime un catway
document
  .getElementById("deleteCatwayForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("deleteCatwayId").value;

    if (!confirm("Voulez-vous vraiment supprimer ce catway ?")) {
      return;
    }

    try {
      const response = await fetch(`/catways/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Erreur lors de la suppression",
        );
      }

      message.textContent = "Catway supprimé avec succès !";

      document.getElementById("deleteCatwayForm").reset();

      await afficherCatways();
    } catch (error) {
      message.textContent = error.message;
    }
  });

// Consulte les détails d'un catway
document
  .getElementById("getCatwayForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("getCatwayId").value;
    const catwayDetails = document.getElementById("catwayDetails");

    try {
      const response = await fetch(`/catways/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Catway introuvable");
      }

      catwayDetails.innerHTML = "";

      const numero = document.createElement("p");
      numero.textContent = `Numéro : ${data.catwayNumber}`;

      const type = document.createElement("p");
      type.textContent = `Type : ${data.type || data.catwayType}`;

      const etat = document.createElement("p");
      etat.textContent = `État : ${data.catwayState}`;

      catwayDetails.append(numero, type, etat);
    } catch (error) {
      catwayDetails.textContent = error.message;
    }
  });

// Affiche les catways au chargement de la page
afficherCatways();
