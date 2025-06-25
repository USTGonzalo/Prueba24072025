const cargarEquipos = async () => {
    const data = await getTeams();

    fillAllDatos(data);
};

const fillAllDatos = (data) => {
    const tableTeams = document.querySelector("#CuerpoEquipos");
    tableTeams.innerHTML = "";

    data.forEach((datos) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdleague = document.createElement("td");
        const tdname = document.createElement("td");
        const tddelete = document.createElement("td");

        tdId.textContent = datos.id;
        tdleague.textContent = datos.league;
        tdname.textContent = datos.name;

        // Botón eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Eliminar";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white";
        deleteBtn.onclick = async () => {
            const confirmar = confirm(`¿Eliminar equipo con ID ${datos.id}?`);
            if (confirmar) {
                const result = await DeleteTeam(datos.id);
                if (result.status === 200) {
                    cargarEquipos(); // recargar tabla
                } else {
                    alert("Error al eliminar equipo: " + result.message);
                }
            }
        };

        tddelete.appendChild(deleteBtn);

        tr.appendChild(tdId);
        tr.appendChild(tdleague);
        tr.appendChild(tdname);
        tr.appendChild(tddelete);

        tableTeams.appendChild(tr);
    });
};

document.addEventListener('DOMContentLoaded', cargarEquipos);