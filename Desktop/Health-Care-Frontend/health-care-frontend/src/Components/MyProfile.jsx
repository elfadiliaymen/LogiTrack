import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function MyProfile() {

    const [profile, setProfile] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {

        if (!role) return;

        if (role === "PATIENT") {

            api.get("/patient/me")
                .then((res) => {

                    setProfile(res.data);

                })
                .catch((err) => {

                    console.log(err);

                });

        } else if (role === "MEDECIN") {

            api.get("/medecin/me")
                .then((res) => {

                    setProfile(res.data);

                })
                .catch((err) => {

                    console.log(err);

                });

        }

    }, [role]);

    if (!profile) {

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

                        <h1>Mon Profil</h1>

                    </div>

                    <Link
                        className="btn-edit"
                        to={
                            role === "PATIENT"
                                ? `/update-patient/${profile.id}`
                                : `/update-medecin/${profile.id}`
                        }
                    >
                        Modifier
                    </Link>

                </div>

                <div className="patient-profile">

                    <div className="patient-avatar">

                        {profile.prenom?.charAt(0)}
                        {profile.nom?.charAt(0)}

                    </div>

                    <div className="patient-title">

                        <h2>

                            {profile.prenom} {profile.nom}

                        </h2>

                        <span>

                            N° {profile.id}

                        </span>

                    </div>

                </div>

                <div className="patient-infos">

                    <div className="info-box">

                        <span>ID</span>

                        <strong>{profile.id}</strong>

                    </div>

                    <div className="info-box">

                        <span>Nom</span>

                        <strong>{profile.nom}</strong>

                    </div>

                    <div className="info-box">

                        <span>Prénom</span>

                        <strong>{profile.prenom}</strong>

                    </div>

                    <div className="info-box">

                        <span>Email</span>

                        <strong>{profile.email}</strong>

                    </div>

                    <div className="info-box">

                        <span>Nom d'utilisateur</span>

                        <strong>{profile.username}</strong>

                    </div>

                    <div className="info-box">

                        <span>Téléphone</span>

                        <strong>{profile.telephone || "-"}</strong>

                    </div>

                    {role === "PATIENT" && (

                        <div className="info-box">

                            <span>Date de naissance</span>

                            <strong>{profile.dateNaissance || "-"}</strong>

                        </div>

                    )}

                    {role === "MEDECIN" && (

                        <div className="info-box">

                            <span>Spécialité</span>

                            <strong>{profile.specialite || "-"}</strong>

                        </div>

                    )}

                    <div className="info-box">

                        <span>Rôle</span>

                        <strong>{profile.role}</strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default MyProfile;