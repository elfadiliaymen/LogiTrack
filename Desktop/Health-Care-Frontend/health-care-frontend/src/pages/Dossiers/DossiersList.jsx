import { useEffect, useState } from "react";
import api from "../../api/api";




function DossierList(){

    const [dossier , setDossiers] = useState([]);

    useEffect(() => {

        api.get("/DossierMedical").then(res => setDossiers(res.data.content))
        .catch((error) => {
                console.log(error);
            });


    })

    return(
     <div>
      <h1>dossiers</h1>

      {dossier.map(d => (
        <p key={d.id}>{d.diagnostic} - {d.observations}</p>
      ))}
    </div>
    )
}

export default DossierList;