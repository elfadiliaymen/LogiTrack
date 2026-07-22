import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function ConsulterMedecin() {

    const { medecinId } = useParams();

    const [medecin, setMedecin] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {

            api.get(`/medecin/${medecinId}/consulter`)
                .then((res) => {

                    setMedecin(res.data);

                })
                .catch((err) => {

                    console.log(err);

                });

        } else {

            api.get("/medecin/me")
                .then((res) => {

                    setMedecin(res.data);

                })
                .catch((err) => {

                    console.log(err);

                });

        }

    }, [medecinId, role]);

    if (!medecin) {

        return (

            <div className="page">

                <h2>Chargement...</h2>

            </div>

        );

    }

    return (

        <div className="page">

            <div className="patient-sheet">

                <div className="sheet-header">

                    <div>

                        <h1>Fiche du Médecin</h1>

                        <p>
                            Informations professionnelles
                        </p>

                    </div>

                    <Link
                        to={`/update-medecin/${medecin.id}`}
                        className="btn-edit"
                    >
                        Modifier
                    </Link>

                </div>

                <div className="patient-profile">

                    <div className="patient-avatar">

                        {medecin.nom?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <h2>

                            Dr. {medecin.nom}

                        </h2>

                        <p>

                            {medecin.specialite}

                        </p>

                    </div>

                </div>

                <div className="patient-infos">

                    <div className="info-box">

                        <span>ID</span>

                        <strong>{medecin.id}</strong>

                    </div>

                    <div className="info-box">

                        <span>Nom</span>

                        <strong>{medecin.nom}</strong>

                    </div>

                    <div className="info-box">

                        <span>Spécialité</span>

                        <strong>{medecin.specialite}</strong>

                    </div>

                    <div className="info-box">

                        <span>Email</span>

                        <strong>{medecin.email}</strong>

                    </div>

                    <div className="info-box">

                        <span>Username</span>

                        <strong>{medecin.username}</strong>

                    </div>

                    <div className="info-box">

                        <span>Téléphone</span>

                        <strong>{medecin.telephone}</strong>

                    </div>

                    <div className="info-box">

                        <span>Rôle</span>

                        <strong>{medecin.role}</strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ConsulterMedecin;