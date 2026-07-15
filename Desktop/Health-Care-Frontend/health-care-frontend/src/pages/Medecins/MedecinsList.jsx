import api from "../../api/api";
import { useState , useEffect } from "react";


function MedecinsList(){


    const [medecins , setMedecins] = useState([]);

    useEffect(() => {
        api.get("/medecin").then(res => setMedecins(res.data.content))
        .catch((error) => {
                console.log(error);
            });
    } )

    return(
            <div>
      <h1>medecins</h1>

      { medecins.map(m => (
        <p key={m.id}>{m.nom} - {m.prenom} - {m.email}</p>
      ))}
    </div>
    )

}

export default MedecinsList;