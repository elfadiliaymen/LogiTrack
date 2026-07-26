import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <main className="dashboard">

      <div className="dashboard-header">

        <h1>Tableau de Bord</h1>

        <p>
          Sélectionnez un module pour gérer les données de la clinique.
        </p>

      </div>

      <div className="dashboard-grid">

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
            Gérer les médecins et leurs informations.
          </p>

        </Link>

        <Link
          className="dashboard-card"
          to="/dossiers-actions"
        >

          <h2>Dossiers Médicaux</h2>

          <p>
            Consulter et gérer les dossiers médicaux.
          </p>

        </Link>

        <Link
          className="dashboard-card"
          to="/rendez-vous-actions"
        >

          <h2>Rendez-vous</h2>

          <p>
            Planifier, modifier et annuler les rendez-vous.
          </p>

        </Link>

      </div>

    </main>

  );

}

export default Dashboard;