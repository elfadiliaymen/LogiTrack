import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function PatientsList() {

    const [patients, setPatients] = useState([]);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {

            api.get("/patient")
                .then((res) => {
                    setPatients(res.data.content);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            api.get("/patient/me")
                .then((res) => {
                    setPatients([res.data]);
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }, [role]);

    function handleDelete(patientId) {

        const confirmed = window.confirm("Voulez-vous supprimer ce patient ?");

        if (!confirmed) return;

        api.delete(`/patient/${patientId}`)
            .then(() => {

                setPatients((currentPatients) =>
                    currentPatients.filter((patient) => patient.id !== patientId)
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

                <h1>
                    {role === "ADMIN"
                        ? "Liste des Patients"
                        : "Mon Profil Patient"}
                </h1>

                {role === "ADMIN" && (

                    <Link
                        className="btn-primary"
                        to="/add-patient"
                    >
                        + Ajouter
                    </Link>

                )}

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

                                        {role === "ADMIN" && (

                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(patient.id)}
                                            >
                                                Supprimer
                                            </button>

                                        )}

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