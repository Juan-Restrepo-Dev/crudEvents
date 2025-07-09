//json server
import {urlDB} from "../environments/dev-environment.js"


// get all data
async function getAll(){
    const res = await fetch(urlDB)
    console.log(res)
}

//create data in table
async function create(data,table){
    const res = fetch(urlDB+table,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

}
async function edit(method,id,newData){

};

async function del(id){

}

//firebase realtime