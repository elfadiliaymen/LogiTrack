import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function ConsulterPatient() {

    const { patientId } = useParams();

    const [patient, setPatient] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (role === "ADMIN") {

            api.get(`/patient/${patientId}/consulter`)
                .then((res) => {

                    setPatient(res.data);

                })
                .catch((err) => {

                    console.log(err);

                });

        } else {

            api.get("/patient/me")
                .then((res) => {

                    setPatient(res.data);

                })
                .catch((err) => {

                    console.log(err);

                });

        }

    }, [patientId, role]);

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

                        <h1>Profil Patient</h1>

                        <p>Informations personnelles</p>

                    </div>

                    <Link
                        to={role === "ADMIN"
                            ? `/update-patient/${patient.id}`
                            : "/update-patient"}
                        className="btn-edit"
                    >
                        Modifier
                    </Link>

                </div>

                <div className="patient-profile">

                    <div>

                        <h2>

                            {patient.nom} {patient.prenom}

                        </h2>

                        <p>

                            {patient.email}

                        </p>

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

                    <div className="info-box">

                        <span>Rôle</span>

                        <strong>{patient.role}</strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ConsulterPatient;