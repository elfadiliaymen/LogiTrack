import { Link } from "react-router-dom";

function DossierActions() {

    const role = localStorage.getItem("role");

    return (

        <div className="page">

            <h1>
                {role === "ADMIN"
                    ? "Gestion des Dossiers Médicaux"
                    : "Mes Dossiers Médicaux"}
            </h1>

            <div className="cards-actions">

                <Link
                    className="action-card"
                    to="/dossiers"
                >

                    <h2>
                        {role === "ADMIN"
                            ? "Liste des Dossiers"
                            : "Mes Dossiers"}
                    </h2>

                    <p>
                        {role === "ADMIN"
                            ? "Consulter tous les dossiers médicaux."
                            : "Consulter vos dossiers médicaux."}
                    </p>

                </Link>

                {role === "ADMIN" && (

                    <Link
                        className="action-card"
                        to="/add-dossier"
                    >

                        <h2>Ajouter un Dossier</h2>

                        <p>
                            Créer un nouveau dossier médical.
                        </p>

                    </Link>

                )}

            </div>

        </div>

    );

}

export default DossierActions;