
const apiUrl = "http://localhost:3000/subscription";

function Obtainsubscribed(){
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => ShowSubscribed(data))
    .catch((error)=>console.error("Error ",error))

}

function ShowSubscribed(subscription){

    const subscribedlist = document.getElementById("container");
    subscribedlist.innerHTML= "";

    subscription.forEach((subscribed,index) =>{

        const row = document.createElement("tr");

        row.innerHTML= `
            <td>${index + 1}</td>
            <td>${subscribed.email}</td>
            <td>${subscribed.date}</td>
            <td><button type="button" class="btn btn-outline-primary" data-id=${subscribed.id}>Delete</button></td>        
        `;

    subscribedlist.appendChild(row);

    });

    document.querySelectorAll(".btn").forEach((button)=>{
    button.addEventListener("click",(event)=>{
        const id = event.target.getAttribute("data-id");
        DeleteBook(id)
    });

    });

};

function DeleteBook(id) {
    fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    })
    .then(() => Obtainsubscribed())
    .catch((error) => console.error("Error Deleting book:", error));
}




Obtainsubscribed();

