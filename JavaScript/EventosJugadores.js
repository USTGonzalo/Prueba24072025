const cargarJugadores = async () => {
    const data = await getPlayers();

    fillAllDatos(data);
};

const fillAllDatos = (data) => {
    const tablePlayers = document.querySelector("#CuerpoJugadores");
    tablePlayers.innerHTML = "";

    data.forEach((datos) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdcountry = document.createElement("td");
        const tdbirth_at = document.createElement("td");
        const tdteam = document.createElement("td");
        const tddelete = document.createElement("td");

        tdId.textContent = datos.id;
        tdName.textContent = datos.name;
        tdcountry.textContent = datos.country;
        tdbirth_at.textContent = datos.birth_at;
        tdteam.textContent = datos.team;

        // Botón eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white";
        deleteBtn.onclick = async () => {
            const confirmacion = confirm(`¿Seguro que deseas eliminar al jugador con ID ${datos.id}?`);
            if (confirmacion) {
                const result = await DeletePlayer(datos.id);
                if (result.status === 200) {
                    cargarJugadores(); // recargar la tabla
                } else {
                    alert("Error al eliminar: " + result.message);
                }
            }
        };

        tddelete.appendChild(deleteBtn);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdcountry);
        tr.appendChild(tdbirth_at);
        tr.appendChild(tdteam);
        tr.appendChild(tddelete);
        tablePlayers.appendChild(tr);
    });
};


document.addEventListener('DOMContentLoaded', cargarJugadores);