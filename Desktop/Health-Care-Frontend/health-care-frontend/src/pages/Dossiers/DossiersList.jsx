import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";




function DossierList(){

    const [dossier , setDossiers] = useState([]);

    useEffect(() => {

        api.get("/DossierMedical").then(res => setDossiers(res.data.content))
        .catch((error) => {
                console.log(error);
            });

    }, [])

    function handleDelete(dossierId) {
      const confirmed = window.confirm("Voulez-vous supprimer ce dossier ?");

      if (!confirmed) {
        return;
      }

      api.delete(`/DossierMedical/${dossierId}`)
        .then(() => {
          setDossiers((currentDossiers) =>
            currentDossiers.filter((item) => item.id !== dossierId)
          );
        })
        .catch((error) => {
          console.log(error);
          alert("La suppression a échoué.");
        });
    }

 return (

<div className="page">

    <div className="page-header">

        <h1>Liste des Dossiers Médicaux</h1>

        <Link
            className="btn-primary"
            to="/add-dossier"
        >
            + Ajouter
        </Link>

    </div>

    <div className="table-container">

        <table className="table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Diagnostic</th>
                    <th>Observations</th>
                    <th>Patient</th>
                    <th>Date de création</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {dossier.length > 0 ? (

                    dossier.map((d) => (

                        <tr key={d.id}>

                            <td>{d.id}</td>

                            <td>{d.diagnostic}</td>

                            <td>{d.observations}</td>

                            <td>{d.patientId}</td>

                            <td>{d.dateCreation}</td>

                            <td className="table-actions">

                                <Link
                                    className="btn-view"
                                    to={`/consulter-dossier/${d.id}`}
                                >
                                    Consulter
                                </Link>

                                <Link
                                    className="btn-edit"
                                    to={`/update-dossier/${d.id}`}
                                >
                                    Modifier
                                </Link>

                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(d.id)}
                                >
                                    Supprimer
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan="6">
                            Aucun dossier trouvé.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>

);
}

export default DossierList;