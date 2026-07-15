import { useState } from "react";
import api from "../../api/api";


function AddPatient(){

    const [newPatient , setNewPatient] = useState({
  "nom": "",
  "prenom": "",
  "email": "",
  "username": "",
  "password": "",
  "telephone": "",
  "dateNaissance": ""
})

function handleSubmit(e){
e.preventDefault();

  api.post("/patient" , newPatient).then(res => {
        console.log(res.data)
        setNewPatient({
  "nom": "",
  "prenom": "",
  "email": "",
  "username": "",
  "password": "",
  "telephone": "",
  "dateNaissance": ""

    }).catch(err => {
        console.log(err);
    });
})



}
    return(
        <>
        <form onSubmit={handleSubmit}>
               nom :
            <input type="text" name="nom" id="" value={newPatient.nom} onChange={(e) => {setNewPatient({...newPatient , nom : e.target.value})}} />
            prenom :
            <input type="text" name="prenom" id="" value={newPatient.prenom} onChange={(e) => {setNewPatient({...newPatient , prenom : e.target.value})}} />

            email :
            <input type="email" name="email" id="" value={newPatient.email} onChange={(e) => {setNewPatient({...newPatient , email : e.target.value})} }/>
             password :
            <input type="password" name="password" id="" value={newPatient.password} onChange={(e) => {setNewPatient({...newPatient , password : e.target.value})} }/>
            username :  
            <input type="text" name="username" id="" value={newPatient.username} onChange={(e) => {setNewPatient({...newPatient , username : e.target.value})}}/>
            telephone : 
            <input type="number" name="telephone" id="" value={newPatient.telephone} onChange={(e) => {setNewPatient({...newPatient , telephone : e.target.value})} }/>
             datedenaissance : 
            <input type="date" name="dateNaissance" id="" value={newPatient.dateNaissance} onChange={(e) => {setNewPatient({...newPatient , dateNaissance : e.target.value})}}/>
            <button type="submit">add</button>
        </form>
        </>
    )
}

export default AddPatient;