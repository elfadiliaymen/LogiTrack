import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Dashboard from "./pages/Dashboard";
import PatientsActions from "./pages/Patients/PatientsActions";
import PatientsList from "./pages/Patients/PatientsList";
import AddPatient from "./pages/Patients/AddPatient";
import ModifiePatient from "./pages/Patients/ModifiePatient";
import ConsulterPatient from "./pages/Patients/ConsulterPatient";
import MedecinActions from "./pages/Medecins/MedecinActions";
import MedecinsList from "./pages/Medecins/MedecinsList";
import AddMedecin from "./pages/Medecins/AddMedecin";
import ModifieMedecin from "./pages/Medecins/ModifieMedecin";
import ConsulterMedecin from "./pages/Medecins/ConsulterMedecin";
import DossierActions from "./pages/Dossiers/DossierActions";
import DossierList from "./pages/Dossiers/DossiersList";
import AddDossier from "./pages/Dossiers/AddDossier";
import ModifieDossier from "./pages/Dossiers/ModifieDossier";
import ConsulterDossier from "./pages/Dossiers/ConsulterDossier";
import RendezvousActions from "./pages/RendezVous/RendezvousActions";
import RendesVousList from "./pages/RendezVous/RendesVousList";
import AddRendezVous from "./pages/RendezVous/AddRendezVous";
import ModifieRendezVous from "./pages/RendezVous/ModifieRendezVous";
import ConsulterRendezVous from "./pages/RendezVous/ConsulterRendezVous";
import { formToJSON } from "axios";

function App() {
  return (
    <div className="app">

      <Header />

      <Routes>

       
        <Route path="/" element={<Dashboard />} />

     
        <Route path="/dashboard" element={<Dashboard />} />

       
        <Route path="/patients-actions" element={<PatientsActions />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route
          path="/consulter-patient/:patientId"
          element={<ConsulterPatient />}
        />
        <Route
          path="/update-patient/:patientId"
          element={<ModifiePatient />}
        />

       
        <Route path="/medecins-actions" element={<MedecinActions />} />
        <Route path="/medecins" element={<MedecinsList />} />
        <Route path="/add-medecin" element={<AddMedecin />} />
        <Route
          path="/consulter-medecin/:medecinId"
          element={<ConsulterMedecin />}
        />
        <Route
          path="/update-medecin/:medecinId"
          element={<ModifieMedecin />}
        />

      
        <Route path="/dossiers-actions" element={<DossierActions />} />
        <Route path="/dossiers" element={<DossierList />} />
        <Route path="/add-dossier" element={<AddDossier />} />
        <Route
          path="/consulter-dossier/:dossierId"
          element={<ConsulterDossier />}
        />
        <Route
          path="/update-dossier/:dossierId"
          element={<ModifieDossier />}
        />

      
        <Route path="/rendez-vous-actions" element={<RendezvousActions />} />
        <Route path="/rendez-vous" element={<RendesVousList />} />
        <Route path="/add-rendez-vous" element={<AddRendezVous />} />
        <Route
          path="/consulter-rendez-vous/:rendezVousId"
          element={<ConsulterRendezVous />}
        />
        <Route
          path="/update-rendez-vous/:rendezVousId"
          element={<ModifieRendezVous />}
        />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;