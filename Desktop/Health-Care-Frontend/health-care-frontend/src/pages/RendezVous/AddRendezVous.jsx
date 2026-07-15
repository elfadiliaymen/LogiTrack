import { useState } from "react";
import api from "../../api/api";

function AddRendezVous() {

  const [newRendezVous, setNewRendezVous] = useState({
    dateRendezVous: "",
    statut: "",
    patientId: "",
    medecinId: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setNewRendezVous({
      ...newRendezVous,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    api.post("/RendezVous", newRendezVous)
      .then((res) => {
        console.log(res.data);

        setNewRendezVous({
          dateRendezVous: "",
          statut: "",
          patientId: "",
          medecinId: ""
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>

      <label>Date du rendez-vous</label>
      <input
        type="datetime-local"
        name="dateRendezVous"
        value={newRendezVous.dateRendezVous}
        onChange={handleChange}
      />

     <label>Statut</label>
<select
  name="statut"
  value={newRendezVous.statut}
  onChange={handleChange}
>
  <option value="">-- Choisir un statut --</option>
  <option value="PLANIFIE">Planifié</option>
  <option value="CONFIRME">Confirmé</option>
</select>

      <label>Patient ID</label>
      <input
        type="number"
        name="patientId"
        value={newRendezVous.patientId}
        onChange={handleChange}
      />

      <label>Médecin ID</label>
      <input
        type="number"
        name="medecinId"
        value={newRendezVous.medecinId}
        onChange={handleChange}
      />

      <button type="submit">
        Ajouter
      </button>

    </form>
  );
}

export default AddRendezVous;