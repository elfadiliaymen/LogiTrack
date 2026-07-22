import { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


const schema = yup.object({
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

  role: yup
    .string()
    .required("L'id du patient est obligatoire"),
});


function Register(){

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema)
    });

    const navigate = useNavigate();


    function handleRegister(data){
        api.post("/auth/register" , data).then((res) => {
           
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("id", res.data.id);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("user", JSON.stringify(res.data));
            reset();
                 alert("Inscription réussie !");
                 navigate("/")
                 

        }).catch((err) => {
            console.log(err);
        })
    }


    return(
        <div>
            
    <div className="page">

      <div className="form-card">
         <h1>Inscription</h1>

         <form
            className="form"
            onSubmit={handleSubmit(handleRegister)}
        >

    
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    {...register("username")}
                />
                <p className="error">{errors.username?.message}</p>
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
                <label>Mot de passe</label>
                <input
                    type="password"
                    {...register("password")}
                />
                <p className="error">{errors.password?.message}</p>
            </div>

              
          <div className="form-group">
            <label>Identité</label>

            <select {...register("role")}>

              <option value="">
                Choisir un rôle
              </option>

              <option value="MEDECIN">
                Médecin
              </option>

              <option value="PATIENT">
                Patient
              </option>

            </select>

            <p className="error">
              {errors.role?.message}
            </p>
          </div>


            <button
                className="btn-primary"
                type="submit"
            >
                s'inscrire
            </button>

            <button
            className="btn-primary"
            onClick={() => {navigate("/login")}}
          >
            Se connecter
          </button>

        </form>
        </div>
         </div>
          </div>
    )

}

export default Register;