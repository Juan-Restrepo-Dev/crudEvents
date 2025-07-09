

    const tables = document.getElementById("contenido")

    const history = JSON.parse(localStorage.getItem("Action")) || [];

    history.forEach((item,index)=>{
        const fila = document.createElement("tr"); 

        fila.innerHTML =`

            <td>${index + 1}</td>
            <td>${item.action}</td>
            <td>${item.date}</td>
        `;
        

        tables.appendChild(fila);
    });


