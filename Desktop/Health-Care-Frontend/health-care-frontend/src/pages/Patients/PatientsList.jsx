import { useEffect , useState } from "react";
import api from "../../api/api";
import axios from "axios";


function PatientsList(){
    const [patients , setPatients] = useState([]);
  useEffect(() => {
     
    api.get("/patient").then(
        res => {
            console.log(res.data);
            setPatients(res.data.content);
        }
    )
      .catch((error) => {
                console.log(error);
            });
  } , [])

    

     return(

           <div>
      <h1>patients</h1>

      {patients.map(p => (
        <p key={p.id}>{p.nom} - {p.prenom} - {p.email}</p>
      ))}
    </div>

     );
}


export default PatientsList;