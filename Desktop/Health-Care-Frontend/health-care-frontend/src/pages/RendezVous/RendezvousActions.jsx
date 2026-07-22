import { Link } from "react-router-dom";

function RendezvousActions() {

    const role = localStorage.getItem("role");

    return (

        <div className="page">

            <h1>
                {role === "ADMIN"
                    ? "Gestion des Rendez-vous"
                    : "Mes Rendez-vous"}
            </h1>

            <div className="cards-actions">

                <Link
                    className="action-card"
                    to="/rendez-vous"
                >

                    <h2>
                        {role === "ADMIN"
                            ? "Liste des Rendez-vous"
                            : "Mes Rendez-vous"}
                    </h2>

                    <p>
                        {role === "ADMIN"
                            ? "Consulter tous les rendez-vous."
                            : "Consulter vos rendez-vous."}
                    </p>

                </Link>

                {role === "ADMIN" && (

                    <Link
                        className="action-card"
                        to="/add-rendez-vous"
                    >

                        <h2>Ajouter un Rendez-vous</h2>

                        <p>
                            Programmer un nouveau rendez-vous.
                        </p>

                    </Link>

                )}

            </div>

        </div>

    );

}

export default RendezvousActions;