import { Link, useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    function logout() {

        localStorage.clear();

        navigate("/login");

    }

    return (

        <header className="header">

            <div className="logo">

                <h1>MediFlow</h1>

                <span>Clinic Management System</span>

            </div>

            <nav className="header-nav">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                {(role === "PATIENT" || role === "MEDECIN") && (
                    <Link to="/my-profile">
                        Mon Profil
                    </Link>
                )}

                {role === "ADMIN" && (
                    <>
                        <Link to="/patients-actions">
                            Patients
                        </Link>

                        <Link to="/medecins-actions">
                            Médecins
                        </Link>
                    </>
                )}

                <Link to="/dossiers-actions">
                    Dossiers
                </Link>

                <Link to="/rendez-vous-actions">
                    Rendez-vous
                </Link>

                <button
                    className="btn-primary"
                    onClick={logout}
                >
                    Déconnexion
                </button>

            </nav>

        </header>

    );

}

export default Header;