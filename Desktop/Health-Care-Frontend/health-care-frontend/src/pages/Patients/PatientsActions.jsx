import { Link, Navigate } from "react-router-dom";

function PatientsActions() {

    const role = localStorage.getItem("role");

    if (role === "PATIENT") {
        return <Navigate to="/my-profile" replace />;
    }

    if (role === "MEDECIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return (

        <div className="page">

            <h1>Gestion des Patients</h1>

            <div className="cards-actions">

                <Link
                    className="action-card"
                    to="/patients"
                >

                    <h2>Liste des Patients</h2>

                    <p>
                        Afficher tous les patients enregistrés.
                    </p>

                </Link>

                <Link
                    className="action-card"
                    to="/add-patient"
                >

                    <h2>Ajouter un Patient</h2>

                    <p>
                        Créer un nouveau patient.
                    </p>

                </Link>

            </div>

        </div>

    );

}

export default PatientsActions;