import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function ConsulterDossier() {

    const { dossierId } = useParams();

    const [dossier, setDossier] = useState(null);

    useEffect(() => {

        api.get(`/DossierMedical/${dossierId}/consulter`)
            .then((res) => setDossier(res.data))
            .catch((err) => console.log(err));

    }, [dossierId]);

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

                        <h1>Dossier Médical</h1>

                        <p>
                            Informations du dossier médical
                        </p>

                    </div>

                    <Link
                        to={`/update-dossier/${dossier.id}`}
                        className="btn-edit"
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
                            Patient #{dossier.patientId}
                        </p>

                    </div>

                </div>


                <div className="patient-infos">

                    <div className="info-box">

                        <span>ID du dossier</span>

                        <strong>
                            {dossier.id}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Patient</span>

                        <strong>
                            #{dossier.patientId}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Date de création</span>

                        <strong>
                            {dossier.dateCreation}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Diagnostic</span>

                        <strong>
                            {dossier.diagnostic}
                        </strong>

                    </div>


                    <div
                        className="info-box"
                        style={{
                            gridColumn: "1 / span 2"
                        }}
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