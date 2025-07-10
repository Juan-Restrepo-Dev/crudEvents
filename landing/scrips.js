window.addEventListener("DOMContentLoaded", () => {

    const apiUrl = "http://localhost:3000/";

    const date = new Date();
    const readableDate = date.toLocaleString();

    function showEvents(){

        const containerEvents = document.getElementById('containerEvents')

        fetch(apiUrl + "events")
        .then((response) => response.json())
        .then((events)=>{
            console.log("hola")

            events.forEach(event => {
                containerEvents.innerHTML += `<div class="evento">
                    <div class="img-placeholder">
                        <img src="${event.image}" alt="">
                    </div>
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <button type="button">ver detalles</button>
                </div>`

                
                });
            })
    }
    showEvents()


    document.getElementById("submit").addEventListener("click", () => {

        const email = document.getElementById("emailSubmit");

        const emailValue = email.value.trim();

        if (!emailValue) {
            console.error("Please, complete  field correctry");
            alert("Please, complete field correctry");
            return;
        }

        const newsubscriber = {
            email: emailValue,
            date: readableDate,
        };

        fetch(apiUrl+"subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newsubscriber),
        })

            .then((response) => {
                if (!response.ok) throw new Error("Network error");
                alert("Subscription saved successfully!");
                email.value = "";
            })
            .catch((error) => {
                console.error("Error saving subscriber:", error);
                alert("There was an error saving the subscription.");
            })
    });


    document.getElementById("submitMessage").addEventListener("click",()=>{

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("emailMessage");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();


    if(!name || !email || !message ){
        console.error("Please, complete all fields correctry");
        alert("Please, complete all fields correctry");
        return;
    }

    const newMessages = {
        name : name,
        email : email,
        message : message,
        date :  readableDate,
    };

    fetch(apiUrl+"/messages",{
        method : "POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify(newMessages),
    })

    .then((response)=>{
        if(!response.ok) throw new Error("Network error");
        alert("Subscription saved successfully!");
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    })
    .catch((error)=>{
        console.error("Error saving subscriber:", error);
        alert("There was an error saving the subscription.");
    })
    
});



});