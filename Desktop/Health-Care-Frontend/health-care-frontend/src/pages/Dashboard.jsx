import { Link } from "react-router-dom";

function Dashboard() {

    const role = localStorage.getItem("role");

    return (

        <main className="dashboard">

            <div className="dashboard-header">

                <h1>Tableau de Bord</h1>

                <p>
                    Bienvenue sur MediFlow.
                </p>

            </div>

            <div className="dashboard-grid">

                {role === "ADMIN" && (
                    <>
                        <Link
                            className="dashboard-card"
                            to="/patients-actions"
                        >
                            <h2>Patients</h2>

                            <p>
                                Ajouter, modifier, consulter et supprimer les patients.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/medecins-actions"
                        >
                            <h2>Médecins</h2>

                            <p>
                                Gérer les médecins.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/dossiers-actions"
                        >
                            <h2>Dossiers Médicaux</h2>

                            <p>
                                Gérer tous les dossiers médicaux.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/rendez-vous-actions"
                        >
                            <h2>Rendez-vous</h2>

                            <p>
                                Gérer tous les rendez-vous.
                            </p>
                        </Link>
                    </>
                )}

                {role === "PATIENT" && (
                    <>
                        <Link
                            className="dashboard-card"
                            to="/my-profile"
                        >
                            <h2>Mon Profil</h2>

                            <p>
                                Consulter et modifier vos informations.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/dossiers-actions"
                        >
                            <h2>Mes Dossiers</h2>

                            <p>
                                Consulter vos dossiers médicaux.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/rendez-vous-actions"
                        >
                            <h2>Mes Rendez-vous</h2>

                            <p>
                                Consulter vos rendez-vous.
                            </p>
                        </Link>
                    </>
                )}

                {role === "MEDECIN" && (
                    <>
                        <Link
                            className="dashboard-card"
                            to="/my-profile"
                        >
                            <h2>Mon Profil</h2>

                            <p>
                                Consulter et modifier vos informations.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/dossiers-actions"
                        >
                            <h2>Dossiers Médicaux</h2>

                            <p>
                                Consulter les dossiers de vos patients.
                            </p>
                        </Link>

                        <Link
                            className="dashboard-card"
                            to="/rendez-vous-actions"
                        >
                            <h2>Mes Rendez-vous</h2>

                            <p>
                                Consulter vos rendez-vous.
                            </p>
                        </Link>
                    </>
                )}

            </div>

        </main>

    );

}

export default Dashboard;