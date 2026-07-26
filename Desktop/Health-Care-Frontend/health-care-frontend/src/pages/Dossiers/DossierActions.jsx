 import { Link } from "react-router-dom";


function DossierActions(){
return (

<div className="page">

    <h1>Gestion des Dossiers Médicaux</h1>

    <div className="cards-actions">

        <Link
            className="action-card"
            to="/dossiers"
        >
            <h2>Liste des Dossiers</h2>

            <p>
                Consulter tous les dossiers médicaux.
            </p>

        </Link>

        <Link
            className="action-card"
            to="/add-dossier"
        >
            <h2>Ajouter un Dossier</h2>

            <p>
                Créer un nouveau dossier médical.
            </p>

        </Link>

    </div>

</div>

);

}

export default DossierActions;