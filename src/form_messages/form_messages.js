window.addEventListener("DOMContentLoaded",()=>{

const apiUrl = "http://localhost:3000/messages";


const date = new Date();
const readableDate = date.toLocaleString();

document.getElementById("submit").addEventListener("click",()=>{

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
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

    fetch(apiUrl,{
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