import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function ConsulterPatient() {

    const { patientId } = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {

        api.get(`/patient/${patientId}/consulter`)
            .then((res) => {

                setPatient(res.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, [patientId]);

    if (!patient) {

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

                        <h1>Fiche Patient</h1>

                        <p>
                            Consultation des informations du patient
                        </p>

                    </div>

                    <Link
                        className="btn-edit"
                        to={`/update-patient/${patient.id}`}
                    >
                        Modifier
                    </Link>

                </div>

                <div className="patient-profile">

                    <div className="patient-avatar">

                        {patient.prenom?.charAt(0)}
                        {patient.nom?.charAt(0)}

                    </div>

                    <div className="patient-title">

                        <h2>

                            {patient.prenom} {patient.nom}

                        </h2>

                        <span>

                            Patient N° {patient.id}

                        </span>

                    </div>

                </div>

                <div className="patient-infos">

                    <div className="info-box">

                        <span>ID</span>

                        <strong>{patient.id}</strong>

                    </div>

                    <div className="info-box">

                        <span>Nom</span>

                        <strong>{patient.nom}</strong>

                    </div>

                    <div className="info-box">

                        <span>Prénom</span>

                        <strong>{patient.prenom}</strong>

                    </div>

                    <div className="info-box">

                        <span>Email</span>

                        <strong>{patient.email}</strong>

                    </div>

                    <div className="info-box">

                        <span>Nom d'utilisateur</span>

                        <strong>{patient.username}</strong>

                    </div>

                    <div className="info-box">

                        <span>Téléphone</span>

                        <strong>{patient.telephone}</strong>

                    </div>

                    <div className="info-box">

                        <span>Date de naissance</span>

                        <strong>{patient.dateNaissance}</strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ConsulterPatient;