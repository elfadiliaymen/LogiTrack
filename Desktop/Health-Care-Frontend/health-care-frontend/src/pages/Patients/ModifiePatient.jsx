import api from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),

  prenom: yup.string().required("Le prénom est obligatoire"),

  email: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),

  username: yup
    .string()
    .required("Le username est obligatoire"),

  password: yup
    .string()
    .min(6, "Minimum 6 caractères")
    .required("Le mot de passe est obligatoire"),

  telephone: yup
    .string()
    .required("Le téléphone est obligatoire"),

  dateNaissance: yup
    .string()
    .required("La date de naissance est obligatoire"),
});

function ModifiePatient() {
  const {patientId} = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function getPatient() {
    api.get(`/patient/${patientId}/consulter`)
      .then((res) => {

        const patient = res.data;

        reset({
          ...patient,
          dateNaissance: patient?.dateNaissance
            ? String(patient.dateNaissance).split("T")[0]
            : "",
        });

      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (patientId) {
      getPatient();
    }
  }, [patientId]);

  function onSubmit(data) {

    api.put(`/patient/${patientId}`, data)
      .then((res) => {

        console.log(res.data);

        alert("Patient modifié avec succès");

      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <div className="page">

  <h1>Modifier un Patient</h1>

    <form className="form" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
            <label>Nom</label>
            <input
                type="text"
                {...register("nom")}
            />
            <p className="error">{errors.nom?.message}</p>
        </div>

        <div className="form-group">
            <label>Prénom</label>
            <input
                type="text"
                {...register("prenom")}
            />
            <p className="error">{errors.prenom?.message}</p>
        </div>

        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                {...register("email")}
            />
            <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
            <label>Username</label>
            <input
                type="text"
                {...register("username")}
            />
            <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input
                type="password"
                {...register("password")}
            />
            <p className="error">{errors.password?.message}</p>
        </div>

        <div className="form-group">
            <label>Téléphone</label>
            <input
                type="text"
                {...register("telephone")}
            />
            <p className="error">{errors.telephone?.message}</p>
        </div>

        <div className="form-group">
            <label>Date de naissance</label>
            <input
                type="date"
                {...register("dateNaissance")}
            />
            <p className="error">{errors.dateNaissance?.message}</p>
        </div>

      <button className="btn-primary">

    Modifier

</button>

    </form>

</div>
  );
}

export default ModifiePatient;