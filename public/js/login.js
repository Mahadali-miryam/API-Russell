// Récupérer le formulaire de connexion
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

// Envoyer les informations de connexion à l'API
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Connexion impossible.";
      return;
    }

    // Enregistrer le token de connexion
    sessionStorage.setItem("token", data.token);

    // Ouvrir le tableau de bord
    window.location.href = "/dashboard.html";
  } catch (error) {
    message.textContent = "Impossible de contacter le serveur.";
  }
});
