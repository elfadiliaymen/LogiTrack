import PatientsList from "./pages/Patients/PatientsList";
import MedecinsList from "./pages/Medecins/MedecinsList";
import DossierList from "./pages/Dossiers/DossiersList";
import RendesVousList from "./pages/RendezVous/RendesVousList";
import AddDossier from "./pages/Dossiers/AddDossier";
import AddPatient from "./pages/Patients/addPatient";
import AddMedecin from "./pages/Medecins/AddMedecin";
import AddRendezVous from "./pages/RendezVous/AddRendezVous";
import ModifiePatient from "./pages/Patients/ModifiePatient";


function App() {
  

  return (
    <>
      <PatientsList />
      <MedecinsList />
      <DossierList />
        <RendesVousList />
        <hr />
        <AddDossier />
        <hr />
        <AddPatient />
        <br />
        <hr />
        <br />
        <AddMedecin />
        <br />
        <hr />
        <br />
        <AddRendezVous />
      <br />
        <hr />
        <br />
        <ModifiePatient />
    
    </>
  )
}

export default App
