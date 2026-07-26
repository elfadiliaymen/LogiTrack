import { useState , useEffect } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";


function RendesVousList(){

    const[rendesVous , setRendezVous] = useState([]);

     useEffect(() => {
        api.get("/RendezVous").then(res => setRendezVous(res.data.content))
        .catch((error) => {
                console.log(error);
            });
    }, [])

    function handleDelete(rendezVousId) {
      const confirmed = window.confirm("Voulez-vous Annuler ce rendez-vous ?");

      if (!confirmed) {
        return;
      }

      api.put(`/RendezVous/${rendezVousId}/annuler`)
        .then(() => {
          setRendezVous((currentRendezVous) =>
            currentRendezVous.filter((rendezVous) => rendezVous.id !== rendezVousId)
          );
        })
        .catch((error) => {
          console.log(error);
          alert("La suppression a échoué.");
        });
    }


     return(

        <div className="page">

    <h1>Liste des rendez-vous</h1>

    <div className="table-container">

        <table className="table">

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Statut</th>
                    <th>Patient</th>
                    <th>Médecin</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {rendesVous.map((r) => (

                    <tr key={r.id}>

                        <td>{r.id}</td>
                        <td>{r.dateRendezVous}</td>
                        <td>{r.statut}</td>
                        <td>{r.patientId}</td>
                        <td>{r.medecinId}</td>

                        <td>

                            <Link to={`/consulter-rendez-vous/${r.id}`}>
                                Consulter
                            </Link>

                            <Link to={`/update-rendez-vous/${r.id}`}>
                                Modifier
                            </Link>

                            <button
                                className="btn"
                                onClick={() => handleDelete(r.id)}
                            >
                                Annuler
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

</div>

     );

}

export default RendesVousList;