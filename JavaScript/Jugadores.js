const listarEquipos = async () => {
    const data = await getTeams();
    fillSelect(data);
    new_fillSelect(data);
};

const new_fillSelect = (data) => {
    const new_selectTeams = document.querySelector("#new_equipos");
    new_selectTeams.innerHTML = "";

    data.forEach((datos) => {
        const option = document.createElement("option");
        option.innerHTML = datos.name;
        option.value = datos.name;
        new_selectTeams.appendChild(option);
    });
};

const fillSelect = (data) => {
    const selectTeams = document.querySelector("#equipos");
    selectTeams.innerHTML = "";

    data.forEach((datos) => {
        const option = document.createElement("option");
        option.innerHTML = datos.name;
        option.value = datos.name;
        selectTeams.appendChild(option);
    });
};

const enviarJugador = async (event) => {
    try {
        event.preventDefault();
        const Datos = new FormData(new_formulario);
        const payload = Object.fromEntries(Datos.entries());
        await InsertPlayer({
            name: payload.nuevo_nombre,
            country: payload.nuevo_Pais,
            birth_at: payload.nuevo_Nacimiento,
            team: payload.new_equipo
        });
        console.log("Formulario enviado");
        console.log("Payload:", payload);
    } catch (error) {
        document.innerHTML = "Error: " + error;
    }
};

const actualizarJugador = async (event) => {
    try {
        event.preventDefault();

        const Datos = new FormData(formulario);
        const payload = Object.fromEntries(Datos.entries());

        const id = parseInt(payload.id);

        const jugadorActualizado = {
            name: payload.nombre,
            country: payload.Pais,
            birth_at: payload.Nacimiento,
            team: payload.equipos
        };

        console.log("Payload:", jugadorActualizado);

        const respuesta = await UpdatePlayer(id, jugadorActualizado);
        console.log("Respuesta:", respuesta);
    } catch (error) {
        const errorDiv = document.querySelector("#mensaje-error");
        if (errorDiv) {
            errorDiv.textContent = "Error: " + (error.message || error);
        } else {
            console.error("Error: ", error);
        }
    }
};


const formulario = document.querySelector("#FormularioActualizarJugador");
formulario.addEventListener("submit", actualizarJugador);

const new_formulario = document.querySelector("#FormularioNuevoJugador");
new_formulario.addEventListener("submit", enviarJugador);

document.addEventListener('DOMContentLoaded', listarEquipos);
