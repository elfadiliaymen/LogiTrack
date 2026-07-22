import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function DossierList() {

    const [dossiers, setDossiers] = useState([]);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {

            api.get("/DossierMedical")
                .then((res) => {
                    setDossiers(res.data.content);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            api.get("/DossierMedical/me")
                .then((res) => {

                    if (Array.isArray(res.data)) {
                        setDossiers(res.data);
                    } else {
                        setDossiers([res.data]);
                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }, [role]);

    function handleDelete(dossierId) {

        const confirmed = window.confirm("Voulez-vous supprimer ce dossier ?");

        if (!confirmed) return;

        api.delete(`/DossierMedical/${dossierId}`)
            .then(() => {

                setDossiers((current) =>
                    current.filter((dossier) => dossier.id !== dossierId)
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
                        ? "Liste des Dossiers Médicaux"
                        : "Mes Dossiers Médicaux"}

                </h1>

                {role === "ADMIN" && (

                    <Link
                        className="btn-primary"
                        to="/add-dossier"
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
                            <th>Diagnostic</th>
                            <th>Observations</th>
                            <th>Patient</th>
                            <th>Date de création</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dossiers.length > 0 ? (

                            dossiers.map((dossier) => (

                                <tr key={dossier.id}>

                                    <td>{dossier.id}</td>

                                    <td>{dossier.diagnostic}</td>

                                    <td>{dossier.observations}</td>

                                    <td>{dossier.patientId}</td>

                                    <td>{dossier.dateCreation}</td>

                                    <td className="table-actions">

                                        <Link
                                            className="btn-view"
                                            to={`/consulter-dossier/${dossier.id}`}
                                        >
                                            Consulter
                                        </Link>

                                        <Link
                                            className="btn-edit"
                                            to={`/update-dossier/${dossier.id}`}
                                        >
                                            Modifier
                                        </Link>

                                        {role === "ADMIN" && (

                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(dossier.id)}
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