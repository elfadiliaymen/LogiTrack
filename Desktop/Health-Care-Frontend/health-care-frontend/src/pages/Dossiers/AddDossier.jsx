import api from "../../api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  diagnostic: yup
    .string()
    .required("Le diagnostic est obligatoire"),

  observations: yup
    .string()
    .required("Les observations sont obligatoires"),

  dateCreation: yup
    .string()
    .required("La date de création est obligatoire"),

  patientId: yup
    .number()
    .typeError("L'id du patient doit être un nombre")
    .positive("L'id doit être supérieur à 0")
    .integer("L'id doit être un entier")
    .required("L'id du patient est obligatoire"),
});

function AddDossier() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      diagnostic: "",
      observations: "",
      dateCreation: "",
      patientId: "",
    },
  });

  function onSubmit(data) {

    api.post("/DossierMedical", data)
      .then((res) => {
        console.log(res.data);

        reset();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (

<div className="page">

    <div className="form-card">

        <h1>Ajouter un Dossier Médical</h1>

        <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="form-group">

                <label>Diagnostic</label>

                <input
                    type="text"
                    {...register("diagnostic")}
                />

                <p className="error">
                    {errors.diagnostic?.message}
                </p>

            </div>

            <div className="form-group">

                <label>Observations</label>

                <textarea
                    {...register("observations")}
                />

                <p className="error">
                    {errors.observations?.message}
                </p>

            </div>

            <div className="form-group">

                <label>Date de création</label>

                <input
                    type="datetime-local"
                    {...register("dateCreation")}
                />

                <p className="error">
                    {errors.dateCreation?.message}
                </p>

            </div>

            <div className="form-group">

                <label>Patient ID</label>

                <input
                    type="number"
                    {...register("patientId")}
                />

                <p className="error">
                    {errors.patientId?.message}
                </p>

            </div>

            <button
                className="btn-primary"
                type="submit"
            >
                Ajouter
            </button>

        </form>

    </div>

</div>

);
}

export default AddDossier;