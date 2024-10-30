// Obtener el token de acceso de la URL
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
    const clientId = "1243654191453306922";
    const clientSecret = "TGtbEeM3aPLgDSY4LRK6HEgk8agbK0Fzt";
    const redirectUri = "https://edu579.github.io/callback";

    // Mostrar mensaje de autenticación en progreso
    document.body.innerHTML = `
        <div class="container">
            <h2>Autenticando...</h2>
            <p>Por favor espera un momento.</p>
            <div class="loading-bar"></div>
        </div>
    `;

    // Solicitud para obtener el token de acceso
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
        console.log("Respuesta de token:", data); // Muestra el token o el error

        if (data.error) {
            throw new Error(`Error de token: ${data.error_description}`);
        }

        const accessToken = data.access_token;
        return fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    })
    .then(response => response.json())
    .then(user => {
        console.log("Datos del usuario:", user);
        document.body.innerHTML = `
            <div class="container">
                <h1>Bienvenido, ${user.username}#${user.discriminator}</h1>
                <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%;"/>
            </div>
        `;
    })
    .catch(error => {
        console.error("Error al autenticar:", error);
        document.body.innerHTML = `
            <div class="container">
                <h2>Error de Autenticación</h2>
                <p>No se pudo autenticar. Por favor, intenta nuevamente.</p>
            </div>
        `;
    });
} else {
    console.error("Código de autorización no encontrado en la URL.");
    document.body.innerHTML = `
        <div class="container">
            <h2>Error</h2>
            <p>Código de autorización no encontrado en la URL.</p>
        </div>
    `;
}
