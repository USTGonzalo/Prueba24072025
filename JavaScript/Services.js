const getPlayers = async () => {
    const response = await fetch(`http://127.0.0.1:8787/jugadores`, {
        method: 'GET'
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log("Data: ", data);
        return data;
    }

    if (response.status === 404) {
        return {
            status: 404,
            message: "¡ERROR! No se logró encontrar los jugadores."
        }
    }

    return {
        status: 500,
        message: "Error desconocido"
    }
};

const getTeams = async () => {
    const response = await fetch(`http://127.0.0.1:8787/equipos`, {
        method: 'GET'
    });

    if (response.status === 200) {
        const data = await response.json();
        console.log("Data: ", data);
        return data;
    }

    if (response.status === 404) {
        return {
            status: 404,
            message: "¡ERROR! No se logró encontrar los equipos."
        }
    }

    return {
        status: 500,
        message: "Error desconocido"
    }
};

const mostrarError = (mensaje) => {
    let divError = document.getElementById("mensaje-error");

    if (!divError) {
        divError = document.createElement("div");
        divError.id = "mensaje-error";
        divError.style.backgroundColor = "red";
        divError.style.color = "white";
        document.body.prepend(divError);
    }

    divError.textContent = mensaje;
    divError.style.display = "block";
};

const ocultarError = () => {
    const divError = document.getElementById("mensaje-error");
    if (divError) {
        divError.style.display = "none";
    }
};

const InsertPlayer = async (datos) => {
    const response = await fetch(`http://127.0.0.1:8787/jugadores`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const contentType = response.headers.get("Content-Type");

    if (response.ok) {
        ocultarError();
        return await response.json();
    } else {
        let errorData = { status: response.status, message: "Error desconocido" };

        if (contentType && contentType.includes("application/json")) {
            const errorBody = await response.json();
            errorData.message = errorBody.message || errorData.message;
        }

        mostrarError(errorData.message);
        console.error("Error al insertar jugador:", errorData);
        return errorData;
    }
};


const UpdatePlayer = async (id, datos) => {
    const response = await fetch(`http://127.0.0.1:8787/jugadores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const contentType = response.headers.get("Content-Type");

    if (response.ok) {
        ocultarError();
        return await response.json();
    } else {
        let errorData = { status: response.status, message: "Error desconocido" };

        try {
            if (contentType && contentType.includes("application/json")) {
                const errorBody = await response.json();
                errorData.message = errorBody.message || JSON.stringify(errorBody);
            } else {
                const textError = await response.text();
                errorData.message = textError;
            }
        } catch (e) {
            errorData.message = "No se pudo leer el cuerpo del error";
        }

        mostrarError(errorData.message);
        console.error("Error al actualizar jugador:", errorData);
        return errorData;
    }
};

const DeletePlayer = async (id) => {
    const response = await fetch(`http://127.0.0.1:8787/jugadores/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        return { status: 200, message: "Jugador eliminado con éxito" };
    } else {
        const errorBody = await response.text();
        return { status: response.status, message: errorBody };
    }
};


const InsertTeam = async (datos) => {
    const response = await fetch(`http://127.0.0.1:8787/equipos`, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const contentType = response.headers.get("Content-Type");

    if (response.ok) {
        ocultarError();
        return await response.json();
    } else {
        let errorData = { status: response.status, message: "Error desconocido" };

        if (contentType && contentType.includes("application/json")) {
            const errorBody = await response.json();
            errorData.message = errorBody.message || errorData.message;
        }

        mostrarError(errorData.message);
        console.error("Error al insertar equipo:", errorData);
        return errorData;
    }
};

const UpdateTeam = async (id, datos) => {
    const response = await fetch(`http://127.0.0.1:8787/equipos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const contentType = response.headers.get("Content-Type");

    if (response.ok) {
        ocultarError();
        return await response.json();
    } else {
        let errorData = { status: response.status, message: "Error desconocido" };

        try {
            if (contentType && contentType.includes("application/json")) {
                const errorBody = await response.json();
                errorData.message = errorBody.message || JSON.stringify(errorBody);
            } else {
                const textError = await response.text();
                errorData.message = textError;
            }
        } catch (e) {
            errorData.message = "No se pudo leer el cuerpo del error";
        }

        mostrarError(errorData.message);
        console.error("Error al actualizar equipo:", errorData);
        return errorData;
    }
};

const DeleteTeam = async (id) => {
    const response = await fetch(`http://127.0.0.1:8787/equipos/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        return { status: 200, message: "Equipo eliminado con éxito" };
    } else {
        const errorBody = await response.text();
        return { status: response.status, message: errorBody };
    }
};

