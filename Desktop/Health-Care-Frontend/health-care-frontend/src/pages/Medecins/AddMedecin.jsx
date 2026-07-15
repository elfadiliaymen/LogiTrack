import { useState } from "react";
import api from "../../api/api";

function AddMedecin() {

  const [newMedecin, setNewMedecin] = useState({
    nom: "",
    specialite: "",
    email: "",
    username: "",
    password: "",
    role: "MEDECIN",
    telephone: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setNewMedecin({
      ...newMedecin,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    api.post("/medecin", newMedecin)
      .then((res) => {
        console.log(res.data);

        setNewMedecin({
          nom: "",
          specialite: "",
          email: "",
          username: "",
          password: "",
          role: "MEDECIN",
          telephone: ""
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>

      <label>Nom</label>
      <input
        type="text"
        name="nom"
        value={newMedecin.nom}
        onChange={handleChange}
      />

      <label>Spécialité</label>
      <input
        type="text"
        name="specialite"
        value={newMedecin.specialite}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={newMedecin.email}
        onChange={handleChange}
      />

      <label>Username</label>
      <input
        type="text"
        name="username"
        value={newMedecin.username}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={newMedecin.password}
        onChange={handleChange}
      />

      <label>Role</label>
      <input
        type="text"
        name="role"
        value={newMedecin.role}
        onChange={handleChange}
      />

      <label>Téléphone</label>
      <input
        type="text"
        name="telephone"
        value={newMedecin.telephone}
        onChange={handleChange}
      />

      <button type="submit">
        Ajouter
      </button>

    </form>
  );
}

export default AddMedecin;