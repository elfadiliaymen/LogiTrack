import api from "../../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function MedecinsList(){


    const [medecins , setMedecins] = useState([]);
    const [hasDeleted , setHasDeleted] = useState(false);

    useEffect(() => {
      api.get("/medecin").then(res =>{ 
        setMedecins(res.data.content)
        setHasDeleted(false)
    })
      .catch((error) => {
          console.log(error);
        });

    }, [hasDeleted == true])

    function handleDelete(medecinId) {
      const confirmed = window.confirm("Voulez-vous supprimer ce médecin ?");

      if (!confirmed) {
        return;
      }

      api.delete(`/medecin/${medecinId}`)
        .then((res) => {
        //   setMedecins((currentMedecins) =>
        //     currentMedecins.filter((medecin) => medecin.id !== medecinId)
        //   );
        if(res.status == "200" ){
 setHasDeleted(true);
        }
       
        
        })
        .catch((error) => {
          console.log(error);
          alert("La suppression a échoué.");
        });
    }

   return (

<div className="page">

    <div className="page-header">

        <h1>Liste des Médecins</h1>

        <Link
            className="btn-primary"
            to="/add-medecin"
        >
            + Ajouter
        </Link>

    </div>

    <div className="table-container">

        <table className="table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nom</th>
                    <th>Spécialité</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {medecins.length > 0 ? (

                    medecins.map((medecin) => (

                        <tr key={medecin.id}>

                            <td>{medecin.id}</td>

                            <td>{medecin.nom}</td>

                            <td>{medecin.specialite}</td>

                            <td>{medecin.email}</td>

                            <td>{medecin.telephone}</td>

                            <td className="table-actions">

                                <Link
                                    className="btn-view"
                                    to={`/consulter-medecin/${medecin.id}`}
                                >
                                    Consulter
                                </Link>

                                <Link
                                    className="btn-edit"
                                    to={`/update-medecin/${medecin.id}`}
                                >
                                    Modifier
                                </Link>

                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(medecin.id)}
                                >
                                    Supprimer
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan="6">

                            Aucun médecin trouvé.

                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>

);

}

export default MedecinsList;