// Obtener el token de acceso de la URL
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
    // Cambia estos valores con los tuyos
    const clientId = "1243654191453306922";
    const clientSecret = "TGtbEeM3aPLgDSY4LRK6HEgk8agbK0Fzt"; // Añade tu client secret de Discord
    const redirectUri = "https://edu579.github.io/callback";

    // Realiza la solicitud para obtener el token de acceso
    fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
            scope: "identify"
        })
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;

        // Realiza otra solicitud a la API de Discord para obtener el perfil del usuario
        return fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    })
    .then(response => response.json())
    .then(user => {
        // Muestra el nombre de usuario y el avatar en el HTML
        document.body.innerHTML = `
            <h1>Bienvenido, ${user.username}#${user.discriminator}</h1>
            <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" />
        `;
    })
    .catch(error => {
        console.error("Error al obtener los datos del usuario:", error);
        document.body.innerHTML = "<p>Error al autenticar. Intenta nuevamente.</p>";
    });
} else {
    document.body.innerHTML = "<p>Error: Código de autorización no encontrado.</p>";
}
