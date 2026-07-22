import api from "../../api/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const schema = yup.object({
  dateRendezVous: yup
    .string()
    .required("La date est obligatoire"),

  statut: yup
    .string()
    .required("Le statut est obligatoire"),
});

function ModifieRendezVous() {

  const { rendezVousId } = useParams();

  const role = localStorage.getItem("role");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      dateRendezVous: "",
      statut: "",
    },
  });

  useEffect(() => {

    if (role === "ADMIN") {

      api
        .get(`/RendezVous/${rendezVousId}/consulter`)
        .then((res) => {
          reset({
            dateRendezVous: res.data.dateRendezVous,
            statut: res.data.statut,
          });
        })
        .catch((err) => console.log(err));

    } else {

      api
        .get("/RendezVous/me")
        .then((res) => {
          reset({
            dateRendezVous: res.data.dateRendezVous,
            statut: res.data.statut,
          });
        })
        .catch((err) => console.log(err));

    }

  }, [rendezVousId, role, reset]);

  function onSubmit(data) {

    if (role === "ADMIN") {

      api
        .put(`/RendezVous/${rendezVousId}`, data)
        .then(() => {
          alert("Rendez-vous modifié avec succès !");
        })
        .catch((err) => console.log(err));

    } else {

      api
        .put("/RendezVous/me", data)
        .then(() => {
          alert("Rendez-vous modifié avec succès !");
        })
        .catch((err) => console.log(err));

    }

  }

  return (

    <div className="page">

      <h1>Modifier un Rendez-vous</h1>

      <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >

        <div className="form-group">

          <label>Date</label>

          <input
            type="datetime-local"
            {...register("dateRendezVous")}
          />

          <p className="error">
            {errors.dateRendezVous?.message}
          </p>

        </div>

        <div className="form-group">

          <label>Statut</label>

          <select {...register("statut")}>

            <option value="PLANIFIE">
              PLANIFIÉ
            </option>

            <option value="TERMINE">
              TERMINÉ
            </option>

            <option value="ANNULE">
              ANNULÉ
            </option>

          </select>

          <p className="error">
            {errors.statut?.message}
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

export default ModifieRendezVous;