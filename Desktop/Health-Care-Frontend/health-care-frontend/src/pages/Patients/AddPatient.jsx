import api from "../../api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({

  nom: yup
    .string()
    .required("Le nom est obligatoire"),

  prenom: yup
    .string()
    .required("Le prénom est obligatoire"),

  email: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),

  username: yup
    .string()
    .min(3, "Le username doit contenir au moins 3 caractères")
    .required("Le username est obligatoire"),

  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est obligatoire"),

  telephone: yup
    .string()
    .required("Le téléphone est obligatoire"),

  dateNaissance: yup
    .date()
    .required("La date de naissance est obligatoire")

});

function AddPatient() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function onSubmit(data) {

    api.post("/patient", data)
      .then((res) => {
        console.log(res.data);

        alert("Patient ajouté avec succès !");

        reset();
      })
      .catch((err) => {
        console.log(err);
      });

  }

 return (

<div className="page">

    <div className="form-card">

        <h1>Ajouter un Patient</h1>

        <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
        >

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
                <label>Mot de passe</label>
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

export default AddPatient;