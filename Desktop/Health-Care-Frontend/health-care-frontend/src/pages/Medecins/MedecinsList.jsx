import { useEffect, useState } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function MedecinsList() {

    const [medecins, setMedecins] = useState([]);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {

            api.get("/medecin")
                .then((res) => {
                    setMedecins(res.data.content);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            api.get("/medecin/me")
                .then((res) => {

                    if (Array.isArray(res.data)) {
                        setMedecins(res.data);
                    } else {
                        setMedecins([res.data]);
                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }, [role]);

    function handleDelete(medecinId) {

        const confirmed = window.confirm("Voulez-vous supprimer ce médecin ?");

        if (!confirmed) return;

        api.delete(`/medecin/${medecinId}`)
            .then(() => {

                setMedecins((current) =>
                    current.filter((medecin) => medecin.id !== medecinId)
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
                        ? "Liste des Médecins"
                        : "Mon Profil Médecin"}

                </h1>

                {role === "ADMIN" && (

                    <Link
                        className="btn-primary"
                        to="/add-medecin"
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

                                        {role === "ADMIN" && (

                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(medecin.id)}
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