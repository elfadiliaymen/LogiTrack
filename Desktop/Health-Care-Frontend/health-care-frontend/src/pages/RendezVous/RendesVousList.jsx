import { useState , useEffect } from "react";
import api from "../../api/api";


function RendesVousList(){

    const[rendesVous , setRendezVous] = useState([]);

     useEffect(() => {
        api.get("/RendezVous").then(res => setRendezVous(res.data.content))
        .catch((error) => {
                console.log(error);
            });
    } )


     return(

          <div>
      <h1>rendezVous : </h1>

      {rendesVous.map(r => (
        <p key={r.id}>{r.dateRendezVous} - {r.statut}</p>
      ))}
    </div>


     );

}

export default RendesVousList;