window.addEventListener("DOMContentLoaded",()=>{

const apiUrl = "http://localhost:3000/subscription";

const date = new Date();
const readableDate = date.toLocaleString();


document.getElementById("submit").addEventListener("click",()=>{

    const email = document.getElementById("email");

    const emailValue = email.value.trim();

    if (!emailValue){
        console.error("Please, complete  field correctry");
        alert("Please, complete field correctry");
        return;
    }

    const newsubscriber = {
      email : emailValue,
      date : readableDate,
    };

    fetch(apiUrl,{
        method:"POST",
        headers : { "Content-Type": "application/json" },
        body : JSON.stringify(newsubscriber),
    })

    .then((response)=>{
      if(!response.ok) throw new Error("Network error");
      alert("Subscription saved successfully!");
      email.value = "";
    })
    .catch((error)=>{
      console.error("Error saving subscriber:", error);
      alert("There was an error saving the subscription.");
    })
});

});