import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function ConsulterDossier() {

    const [dossier, setDossier] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {
            return;
        }

        api.get("/DossierMedical/me")
            .then((res) => {
                setDossier(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [role]);

    if (!dossier) {
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

                        <h1>Mon Dossier Médical</h1>

                    </div>

                    <Link
                        className="btn-edit"
                        to={`/update-dossier/${dossier.id}`}
                    >
                        Modifier
                    </Link>

                </div>

                <div className="patient-profile">

                    <div>

                        <h2>
                            Dossier N° {dossier.id}
                        </h2>

                        <p>
                            Créé le {dossier.dateCreation}
                        </p>

                    </div>

                </div>

                <div className="patient-infos">

                    <div className="info-box">

                        <span>ID</span>

                        <strong>{dossier.id}</strong>

                    </div>

                    <div className="info-box">

                        <span>Diagnostic</span>

                        <strong>{dossier.diagnostic}</strong>

                    </div>

                    <div className="info-box">

                        <span>Patient</span>

                        <strong>{dossier.patientId}</strong>

                    </div>

                    <div className="info-box">

                        <span>Date de création</span>

                        <strong>{dossier.dateCreation}</strong>

                    </div>

                    <div
                        className="info-box"
                        style={{ gridColumn: "1 / span 2" }}
                    >

                        <span>Observations</span>

                        <strong
                            style={{
                                whiteSpace: "pre-wrap",
                                lineHeight: "1.8",
                                fontWeight: "normal"
                            }}
                        >
                            {dossier.observations}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ConsulterDossier;