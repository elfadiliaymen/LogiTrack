import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function ConsulterRendezVous() {

    const { rendezVousId } = useParams();

    const [rendezVous, setRendezVous] = useState(null);

    useEffect(() => {

        api.get(`/RendezVous/${rendezVousId}/consulter`)
            .then((res) => setRendezVous(res.data))
            .catch((err) => console.log(err));

    }, [rendezVousId]);

    if (!rendezVous) {

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

                        <h1>Rendez-vous Médical</h1>

                        <p>
                            Informations du rendez-vous
                        </p>

                    </div>

                    <Link
                        to={`/update-rendez-vous/${rendezVous.id}`}
                        className="btn-edit"
                    >
                        Modifier
                    </Link>

                </div>


                <div className="patient-profile">

        

                    <div>

                        <h2>
                            Rendez-vous N° {rendezVous.id}
                        </h2>

                        <p>
                            {rendezVous.dateRendezVous}
                        </p>

                    </div>

                </div>


                <div className="patient-infos">

                    <div className="info-box">

                        <span>ID du rendez-vous</span>

                        <strong>
                            {rendezVous.id}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Statut</span>

                        <strong>
                            {rendezVous.statut}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Date du rendez-vous</span>

                        <strong>
                            {rendezVous.dateRendezVous}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Patient</span>

                        <strong>
                            #{rendezVous.patientId}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Médecin</span>

                        <strong>
                            #{rendezVous.medecinId}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Résumé</span>

                        <strong>

                            Rendez-vous

                            {" "}

                        <span
    className={
        rendezVous.statut === "PLANIFIE"
            ? "status-planifie"
            : rendezVous.statut === "TERMINE"
            ? "status-termine"
            : "status-annule"
    }
>
    {rendezVous.statut}
</span>

                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ConsulterRendezVous;