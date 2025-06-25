// Enviar nuevo equipo
const enviarEquipo = async (event) => {
    try {
        event.preventDefault();
        const datos = new FormData(new_formulario);
        const payload = Object.fromEntries(datos.entries());

        // Suponiendo que el formulario tiene campos "nuevo_nombre" y "nuevo_league"
        await InsertTeam({
            name: payload.nuevo_name,
            league: payload.nuevo_league
        });

        console.log("Equipo enviado");
        console.log("Payload:", payload);
    } catch (error) {
        mostrarError("Error: " + (error.message || error));
    }
};

// Actualizar equipo
const actualizarEquipo = async (event) => {
    try {
        event.preventDefault();
        const datos = new FormData(formulario);
        const payload = Object.fromEntries(datos.entries());

        const id = parseInt(payload.id);

        const equipoActualizado = {
            name: payload.name,
            league: payload.league
        };

        console.log("Payload:", equipoActualizado);

        const respuesta = await UpdateTeam(id, equipoActualizado);
        console.log("Respuesta:", respuesta);
    } catch (error) {
        mostrarError("Error: " + (error.message || error));
    }
};

const formulario = document.querySelector("#FormularioActualizarEquipo");
formulario.addEventListener("submit", actualizarEquipo);

const new_formulario = document.querySelector("#FormularioNuevoEquipo");
new_formulario.addEventListener("submit", enviarEquipo);