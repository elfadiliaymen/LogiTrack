 import { Link } from "react-router-dom";


function RendezvousActions(){

   return (

<div className="page">

    <h1>Gestion des Rendez-vous</h1>

    <div className="cards-actions">

        <Link
            className="action-card"
            to="/rendez-vous"
        >

            <h2>Liste des Rendez-vous</h2>

            <p>
                Consulter tous les rendez-vous.
            </p>

        </Link>

        <Link
            className="action-card"
            to="/add-rendez-vous"
        >

            <h2>Ajouter un Rendez-vous</h2>

            <p>
                Programmer un nouveau rendez-vous.
            </p>

        </Link>

    </div>

</div>

);


}

export default RendezvousActions;