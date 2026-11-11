const token = sessionStorage.getItem("token");

// Vérifier la connexion
if (!token) {
  window.location.href = "/";
}

// Créer un utilisateur
document
  .getElementById("createUserForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("createUserMessage");

    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      message.textContent = data.message || "Réponse du serveur reçue.";

      if (response.ok) {
        document.getElementById("createUserForm").reset();
      }
    } catch (error) {
      console.error("Erreur création :", error);
      message.textContent = "Erreur de communication avec le serveur.";
    }
  });

// Modifier un utilisateur
document
  .getElementById("updateUserForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("updateUserMessage");

    const id = document.getElementById("updateUserId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const email = document.getElementById("updateEmail").value.trim();
    const password = document.getElementById("updatePassword").value;

    if (!id) {
      message.textContent = "Veuillez saisir l'identifiant de l'utilisateur.";
      return;
    }

    const userData = {};
    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = password;

    if (Object.keys(userData).length === 0) {
      message.textContent =
        "Veuillez saisir au moins une nouvelle information.";
      return;
    }

    try {
      console.log("Envoi de la modification :", id);

      const response = await fetch(`/auth/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      console.log("Réponse modification :", response.status, data);

      message.textContent = data.message || "Réponse du serveur reçue.";

      if (response.ok) {
        document.getElementById("updateUserForm").reset();
      }
    } catch (error) {
      console.error("Erreur modification :", error);
      message.textContent = "Erreur de communication avec le serveur.";
    }
  });

// Supprimer un utilisateur
document
  .getElementById("deleteUserForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("deleteUserMessage");
    const id = document.getElementById("deleteUserId").value.trim();

    if (!id) {
      message.textContent = "Veuillez saisir l'identifiant de l'utilisateur.";
      return;
    }

    try {
      const response = await fetch(`/auth/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      message.textContent = data.message || "Réponse du serveur reçue.";

      if (response.ok) {
        document.getElementById("deleteUserForm").reset();
      }
    } catch (error) {
      console.error("Erreur suppression :", error);
      message.textContent = "Erreur de communication avec le serveur.";
    }
  });

// Déconnexion
document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("token");
  window.location.href = "/";
});
