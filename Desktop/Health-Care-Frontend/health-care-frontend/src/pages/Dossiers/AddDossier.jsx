import { useState } from "react";
import api from "../../api/api";

function AddDossier(){

    const [newDossier, setNewDossier] = useState({
    diagnostic: "",
    observations: "",
    dateCreation: "",
    patientId: ""
});

function handleSubmit(e) {
  e.preventDefault();

  api.post("/DossierMedical", newDossier)
    .then((res) => {
      console.log(res.data);
      setNewDossier({
        diagnostic: "",
        observations: "",
        dateCreation: "",
        patientId: ""
      });
    })
    .catch((err) => {
      console.log(err);
    });
}


return(

    <form onSubmit={handleSubmit}>
        diagno
    <input
    type="text"
    value={newDossier.diagnostic}
    onChange={(e) =>
        setNewDossier({
            ...newDossier,
            diagnostic: e.target.value
        })
    }
/>

observa
<textarea
    value={newDossier.observations}
    onChange={(e) =>
        setNewDossier({
            ...newDossier,
            observations: e.target.value
        })
    }
/>

date de cre

<input
    type="datetime-local"
    value={newDossier.dateCreation}
    onChange={(e) =>
        setNewDossier({
            ...newDossier,
            dateCreation: e.target.value
        })
    }
/>

patient id
<input
    type="number"
    value={newDossier.patientId}
    onChange={(e) =>
        setNewDossier({
            ...newDossier,
            patientId: e.target.value
        })
    }
/>

<button type="submit">add </button>

</form>
)

}
export default AddDossier;