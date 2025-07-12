const api = "http://localhost:3000/events";
const main = document.getElementById("main");
const buttonsNewEvent = document.getElementById("newEvent");
const tittle = document.getElementById("tittle");
const date = document.getElementById("date");
const descriptions = document.getElementById("descriptions");
const image = document.getElementById("image");
const inputadd = document.getElementById("addCard");

const day = new Date().toISOString().split("T")[0];
date.setAttribute("min" , day);

function addEvents() {
    buttonsNewEvent.addEventListener("click", () => {
        main.style = `display: none;`;
        inputadd.style = `display: block;`;
    });

    const buttonbtnCancel = document.getElementById('btnCancel');

    buttonbtnCancel.addEventListener('click', () => {
        main.style = `display: block;`;
        inputadd.style = `display: none;`;
    })

    const buttonbtnAdd = document.getElementById("btnAdd");

    buttonbtnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        main.style = `display: block;`;
        inputadd.style = `display: none;`;

        const newEvents = {
            name: tittle.value.trim(),
            date: date.value.trim(),
            description: descriptions.value.trim(),
            image: image.value.trim(),
        };

        if (!newEvents.name || !newEvents.date || !newEvents.description || !newEvents.image) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        console.log(newEvents);
        fetch(api, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newEvents),
        })
            .then((response) => response.json())
            .then((data) => console.log("Evento agregado" + JSON.stringify(data)))
            .then(() => window.location.reload())
            .catch((error) => console.error(error));
    });


}
addEvents();

function showEvents() {
    const containerCards = document.getElementById("containerCards");

    fetch(api)
        .then((response) => response.json())
        .then((events) => {
            console.log(events);
            

            events.forEach((event) => {

                const newCard= document.createElement("div")
                newCard.innerHTML += `<div class="card__complete">

                    <div class="card__elements">
                        <img class="imagen" src="${event.image}" alt="">
                        <div class="text">
                            <h2>${event.name}</h2>
                            <p>${event.description || "hola mundo"}</p>
                            <span>${event.date}</span>
                        </div>
                    </div>
                    <div class="card__buttons">
                        <button id="btnDeleteCard" class="btn btn-outline-primary btn__card btnDeleteCard">eliminar</button>
                        <button id="btnUpdateCard" class="btn btn-outline-primary btnUpdateCard">editar</button>
                    </div>
                </div>`;
                containerCards.appendChild(newCard)
                const btnDelete= newCard.querySelector("button.btnDeleteCard")
                const btnUpdate= newCard.querySelector("button.btnUpdateCard")


                btnDelete.addEventListener("click",()=>{
                    console.log("hola")
                    deleteEvents(event.id);
                })

                btnUpdate.addEventListener("click",()=>{
                    console.log("holaaaaaa")
                    updateEvents(event,event.id);
                    

                })
               
            })

        })
        .catch((error) => console.log("Error mostrar evento", error));

}
showEvents();

function deleteEvents(id){
    fetch(api + `/`+ id, {method: "DELETE"})
    .then(() => console.log("Producto eliminado"))
    .catch((error) => console.log("Hay un pequeño error" + error))

    window.location.reload();
}

function updateEvents(event,id){

    main.style = `display: none;`;
    inputadd.style = `display: block;`;
    
    document.querySelector('button.btnAdd').style=`display: none;`

    const containerBtnInput = document.getElementById("containerBtnInput");

    const newBtn = document.createElement("button")
    newBtn.classList.add('btnactualizar')
    newBtn.textContent="Actualizar"

    containerBtnInput.appendChild(newBtn)

    tittle.value = event.name
    date.value = event.date
    descriptions.value = event.description
    image.value = event.image

    const btnAddUpdate= containerBtnInput.querySelector("button.btnactualizar")


    btnAddUpdate.addEventListener("click", (e) => {
        e.preventDefault();

    

        const newEvents = {
                name: tittle.value.trim(),
                date: date.value.trim(),
                description: descriptions.value.trim(),
                image: image.value.trim(),
            };

        if (!newEvents.name || !newEvents.date || !newEvents.description || !newEvents.image) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        fetch(api + `/` + id,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newEvents)
        }).then(response => response.json())
        .then(data => console.log("Producto actualizado" + JSON.stringify(data)))
        .catch(error => console.error(error))
        .finally(() => {
            window.location.reload();
        });
    })
   
}