import api from "../../api/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  username: yup
    .string()
    .required("Le username est obligatoire")
    .min(4, "Minimum 4 caractères"),

  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Minimum 6 caractères"),

  role: yup
    .string()
    .required(),

  telephone: yup
    .string()
    .required("Le téléphone est obligatoire")
    .matches(/^[0-9]+$/, "Le téléphone doit contenir uniquement des chiffres")
    .min(10, "Numéro invalide"),
});

function AddMedecin() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: "",
      specialite: "",
      email: "",
      username: "",
      password: "",
      role: "MEDECIN",
      telephone: "",
    },
  });

  function onSubmit(data) {
    api.post("/medecin", data)
      .then((res) => {
        console.log(res.data);
        reset({
          nom: "",
          specialite: "",
          email: "",
          username: "",
          password: "",
          role: "MEDECIN",
          telephone: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

 return (

<div className="page">

    <div className="form-card">

        <h1>Ajouter un Médecin</h1>

        <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="form-group">
                <label>Nom</label>
                <input type="text" {...register("nom")} />
                <p className="error">{errors.nom?.message}</p>
            </div>

            <div className="form-group">
                <label>Spécialité</label>
                <input type="text" {...register("specialite")} />
                <p className="error">{errors.specialite?.message}</p>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" {...register("email")} />
                <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="text" {...register("username")} />
                <p className="error">{errors.username?.message}</p>
            </div>

            <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" {...register("password")} />
                <p className="error">{errors.password?.message}</p>
            </div>

            <div className="form-group">
                <label>Rôle</label>
                <input
                    type="text"
                    value="MEDECIN"
                    readOnly
                    {...register("role")}
                />
            </div>

            <div className="form-group">
                <label>Téléphone</label>
                <input type="text" {...register("telephone")} />
                <p className="error">{errors.telephone?.message}</p>
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

export default AddMedecin;