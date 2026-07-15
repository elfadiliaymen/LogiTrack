import api from "../../api/api";
import { useState } from "react";



function ModifiePatient(){

    const [patientId , setPatientId] = useState();
    const[patient , setPatient] = useState({
  "nom": "",
  "prenom": "",
  "email": "",
  "username": "",
  "password": "",
  "telephone": "",
  "dateNaissance": ""
    })

    function getPatient(id){
            api.get(`/patient/${id}/consulter`).then(
        res => {
            console.log(res.data);
            setPatient(res.data);
        }
    )
      .catch((error) => {
                console.log(error);
            });
    }

    function handleSubmit(e){
        e.preventDefault();

         api.put(`/patient/${patientId}` , patient).then(res => {
        console.log(res.data)
        setPatient({
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
    }

)
    }

    return(
        <>
        <h1>Modifie Patient :</h1>
        enter id de patient : <input type="number" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        <button onClick={() => getPatient(patientId)}> get patient </button>
        <form onSubmit={handleSubmit}>
               nom :
            <input type="text" name="nom" id="" value={patient.nom} onChange={(e) => {setPatient({...patient , nom : e.target.value})}} />
            prenom :
            <input type="text" name="prenom" id="" value={patient.prenom} onChange={(e) => {setPatient({...patient , prenom : e.target.value})}} />

            email :
            <input type="email" name="email" id="" value={patient.email} onChange={(e) => {setPatient({...patient , email : e.target.value})} }/>
             password :
            <input type="password" name="password" id="" value={patient.password} onChange={(e) => {setPatient({...patient , password : e.target.value})} }/>
            username :  
            <input type="text" name="username" id="" value={patient.username} onChange={(e) => {setPatient({...patient , username : e.target.value})}}/>
            telephone : 
            <input type="number" name="telephone" id="" value={patient.telephone} onChange={(e) => {setPatient({...patient , telephone : e.target.value})} }/>
             datedenaissance : 
            <input type="date" name="dateNaissance" id="" value={patient.dateNaissance} onChange={(e) => {setPatient({...patient , dateNaissance : e.target.value})}}/>
            <button type="submit">add</button>
        </form>
        </>
    );

}

export default ModifiePatient;