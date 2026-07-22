import { useState, useEffect } from "react";
import api from "../../api/api";
import { Link } from "react-router-dom";

function RendesVousList() {

    const [rendesVous, setRendezVous] = useState([]);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {

            api.get("/RendezVous")
                .then((res) => {
                    setRendezVous(res.data.content);
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {

            api.get("/RendezVous/mine")
                .then((res) => {

                    if (Array.isArray(res.data)) {
                        setRendezVous(res.data);
                    } else {
                        setRendezVous([res.data]);
                    }

                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }, [role]);

    function handleDelete(rendezVousId) {

        const confirmed = window.confirm("Voulez-vous annuler ce rendez-vous ?");

        if (!confirmed) return;

        api.put(`/RendezVous/${rendezVousId}/annuler`)
            .then(() => {

                setRendezVous((current) =>
                    current.filter((r) => r.id !== rendezVousId)
                );

            })
            .catch((error) => {

                console.log(error);
                alert("L'annulation a échoué.");

            });

    }

    return (

        <div className="page">

            <div className="page-header">

                <h1>

                    {role === "ADMIN"
                        ? "Liste des Rendez-vous"
                        : "Mes Rendez-vous"}

                </h1>

                {role === "ADMIN" && (

                    <Link
                        className="btn-primary"
                        to="/add-rendez-vous"
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
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Patient</th>
                            <th>Médecin</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {rendesVous.length > 0 ? (

                            rendesVous.map((r) => (

                                <tr key={r.id}>

                                    <td>{r.id}</td>

                                    <td>{r.dateRendezVous}</td>

                                    <td>{r.statut}</td>

                                    <td>{r.patientId}</td>

                                    <td>{r.medecinId}</td>

                                    <td className="table-actions">

                                        <Link
                                            className="btn-view"
                                            to={`/consulter-rendez-vous/${r.id}`}
                                        >
                                            Consulter
                                        </Link>

                                        <Link
                                            className="btn-edit"
                                            to={`/update-rendez-vous/${r.id}`}
                                        >
                                            Modifier
                                        </Link>

                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(r.id)}
                                        >
                                            Annuler
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="6">

                                    Aucun rendez-vous trouvé.

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default RendesVousList;