const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const languageDropdown = document.getElementById('language-dropdown');

hamburger.addEventListener("click", () => {
  navbar.classList.toggle("active"); // Alternar clase 'active' para mostrar/ocultar el navbar
});
const languageButton = document.getElementById('language-button');
const languageOptions = document.querySelector('.language-options');
const arrow = document.querySelector('.arrow');

languageButton.addEventListener("click", () => {
  languageOptions.classList.toggle("active"); // Alterna la visibilidad del menú
  arrow.classList.toggle("active"); // Activa la animación de la flecha
});

// Cerrar el menú si se hace clic fuera de él
document.addEventListener("click", (event) => {
  if (!languageButton.contains(event.target) && !languageOptions.contains(event.target)) {
    languageOptions.classList.remove("active");
    arrow.classList.remove("active"); // Detener la animación si se cierra
  }
});

// Manejar el cambio de idioma
const languageLinks = document.querySelectorAll('.language-options a');
languageLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Evita que el enlace recargue la página
    const selectedLang = link.getAttribute('data-lang');
    console.log("Idioma seleccionado:", selectedLang); // Aquí puedes implementar la lógica para cambiar el idioma
    // Ejemplo: cargar un archivo de idioma, cambiar el contenido, etc.
  });
});
document.getElementById("connexion-button").addEventListener("click", function() {
  // Aquí puedes agregar la funcionalidad que desees al hacer clic en Connexion
  alert("Conectando..."); // Ejemplo de alerta
});
// script.js (frontend)
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

if (code) {
    // Enviar el código al backend
    fetch('/api/get-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        // Manejar los datos del usuario o el token
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}
