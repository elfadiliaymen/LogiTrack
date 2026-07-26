import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api
      .get("/patient")
      .then((res) => {
        setPatients(res.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleDelete(patientId) {
    const confirmed = window.confirm("Voulez-vous supprimer ce patient ?");

    if (!confirmed) {
      return;
    }

    api
      .delete(`/patient/${patientId}`)
      .then(() => {
        setPatients((currentPatients) =>
          currentPatients.filter((patient) => patient.id !== patientId)
        );
      })
      .catch((error) => {
        console.error(error);
        alert("La suppression a échoué.");
      });
  }

return (

<div className="page">

    <div className="page-header">

        <h1>Liste des Patients</h1>

        <Link className="btn-primary" to="/add-patient">
            + Ajouter
        </Link>

    </div>

    <div className="table-container">

        <table className="table">

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {patients.length > 0 ? (

                    patients.map((patient) => (

                        <tr key={patient.id}>

                            <td>{patient.id}</td>

                            <td>{patient.nom}</td>

                            <td>{patient.prenom}</td>

                            <td>{patient.email}</td>

                            <td>{patient.telephone}</td>

                            <td className="table-actions">

                                <Link
                                    className="btn-view"
                                    to={`/consulter-patient/${patient.id}`}
                                >
                                    Consulter
                                </Link>

                                <Link
                                    className="btn-edit"
                                    to={`/update-patient/${patient.id}`}
                                >
                                    Modifier
                                </Link>

                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(patient.id)}
                                >
                                    Supprimer
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan="6">
                            Aucun patient trouvé.
                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>

);
}

export default PatientsList;