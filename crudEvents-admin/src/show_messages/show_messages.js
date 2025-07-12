

    const apiUrl = "http://localhost:3000/messages"

    function ObtainMessages(){
        fetch(apiUrl)
        .then((response)=> response.json())
        .then((data)=> Showmessage(data) )
        .catch((error)=>console.error("Error ",error))
    }

    function Showmessage(message){

        const messageList = document.getElementById("container");
        messageList.innerHTML="";

        message.forEach((message)=>{

            const card = document.createElement("div");
            card.className = ("pt-4");

            card.innerHTML=`
            <div class="card text-center">
            <div class="card-header">
                ${message.name}
            </div>
            <div class="card-body">
                <h5 class="card-title">${message.email}</h5>
                <p class="card-text">${message.message}</p>
            </div>
            <div class="card-footer text-body-secondary">
                ${message.date}
            </div>
            </div>
            `

        messageList.appendChild(card);

        });

    }

ObtainMessages();
