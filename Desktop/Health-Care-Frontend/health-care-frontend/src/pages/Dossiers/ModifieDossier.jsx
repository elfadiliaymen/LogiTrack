import api from "../../api/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const schema = yup.object({
  diagnostic: yup
    .string()
    .required("Le diagnostic est obligatoire"),

  observations: yup
    .string()
    .required("Les observations sont obligatoires"),
});

function ModifieDossier() {

  const { dossierId } = useParams();

  const role = localStorage.getItem("role");

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
    },
  });

  useEffect(() => {

    if (role === "ADMIN") {

      api
        .get(`/DossierMedical/${dossierId}/consulter`)
        .then((res) => {

          reset({
            diagnostic: res.data.diagnostic,
            observations: res.data.observations,
          });

        })
        .catch((err) => {

          console.log(err);

        });

    } else {

      api
        .get("/DossierMedical/me")
        .then((res) => {

          reset({
            diagnostic: res.data.diagnostic,
            observations: res.data.observations,
          });

        })
        .catch((err) => {

          console.log(err);

        });

    }

  }, [dossierId, role, reset]);

  function onSubmit(data) {

    if (role === "ADMIN") {

      api
        .put(`/DossierMedical/${dossierId}`, data)
        .then(() => {

          alert("Dossier modifié avec succès !");

        })
        .catch((err) => {

          console.log(err);

        });

    } else {

      api
        .put("/DossierMedical/me", data)
        .then(() => {

          alert("Dossier modifié avec succès !");

        })
        .catch((err) => {

          console.log(err);

        });

    }

  }

  return (

    <div className="page">

      <h1>Modifier le Dossier Médical</h1>

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
            rows="6"
            {...register("observations")}
          />

          <p className="error">
            {errors.observations?.message}
          </p>

        </div>

        <button
          className="btn-primary"
          type="submit"
        >
          Modifier
        </button>

      </form>

    </div>

  );

}

export default ModifieDossier;