 import { Link } from "react-router-dom";


function MedecinActions(){

   return (
    <div className="page">

        <h1>Gestion des Médecins</h1>

        <div className="cards-actions">

            <Link className="action-card" to="/medecins">

                <h2>Liste des Médecins</h2>

                <p>Afficher tous les médecins.</p>

            </Link>

            <Link className="action-card" to="/add-medecin">

                <h2>Ajouter un Médecin</h2>

                <p>Créer un nouveau médecin.</p>

            </Link>

        </div>

    </div>
);


}

export default MedecinActions;