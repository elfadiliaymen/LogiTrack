import api from "../../api/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const schema = yup.object({
  nom: yup
    .string()
    .required("Le nom est obligatoire"),

  specialite: yup
    .string()
    .required("La spécialité est obligatoire"),

  email: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),

  telephone: yup
    .string()
    .required("Le téléphone est obligatoire")
    .matches(/^[0-9]+$/, "Le téléphone doit contenir uniquement des chiffres"),
});

function ModifieMedecin() {

  const { medecinId } = useParams();

  const role = localStorage.getItem("role");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: "",
      specialite: "",
      email: "",
      telephone: "",
    },
  });

  useEffect(() => {

    if (role === "ADMIN") {

      api
        .get(`/medecin/${medecinId}/consulter`)
        .then((res) => {

          reset({
            nom: res.data.nom,
            specialite: res.data.specialite,
            email: res.data.email,
            telephone: res.data.telephone,
          });

        })
        .catch((err) => {

          console.log(err);

        });

    } else {

      api
        .get("/medecin/me")
        .then((res) => {

          reset({
            nom: res.data.nom,
            specialite: res.data.specialite,
            email: res.data.email,
            telephone: res.data.telephone,
          });

        })
        .catch((err) => {

          console.log(err);

        });

    }

  }, [medecinId, role, reset]);

  function onSubmit(data) {

    if (role === "ADMIN") {

      api
        .put(`/medecin/${medecinId}`, data)
        .then(() => {

          alert("Médecin modifié avec succès !");

        })
        .catch((err) => {

          console.log(err);

        });

    } else {

      api
        .put("/medecin/me", data)
        .then(() => {

          alert("Profil modifié avec succès !");

        })
        .catch((err) => {

          console.log(err);

        });

    }

  }

  return (

    <div className="page">

      <h1>Modifier un Médecin</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">

          <label>Nom</label>

          <input
            type="text"
            {...register("nom")}
          />

          <p className="error">
            {errors.nom?.message}
          </p>

        </div>

        <div className="form-group">

          <label>Spécialité</label>

          <input
            type="text"
            {...register("specialite")}
          />

          <p className="error">
            {errors.specialite?.message}
          </p>

        </div>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            {...register("email")}
          />

          <p className="error">
            {errors.email?.message}
          </p>

        </div>

        <div className="form-group">

          <label>Téléphone</label>

          <input
            type="text"
            {...register("telephone")}
          />

          <p className="error">
            {errors.telephone?.message}
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

export default ModifieMedecin;