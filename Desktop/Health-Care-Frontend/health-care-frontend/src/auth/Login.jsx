import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const schema = yup.object({

  username: yup
    .string()
    .required("Le username est obligatoire"),

  password: yup
    .string()
    .required("Le mot de passe est obligatoire")

});

function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleLogin(data) {

    api.post("/auth/login", data)
      .then((res) => {

        const token = res.data;

          localStorage.setItem("token", res.data.token);
    localStorage.setItem("id", res.data.id);
    localStorage.setItem("username", res.data.username);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("user", JSON.stringify(res.data));

        alert("Connexion réussie !");

        reset();

        navigate("/");

      })
      .catch((err) => {

        console.log(err);

        alert("Username ou mot de passe incorrect.");

      });

  }

  return (

    <div className="page">

      <div className="form-card">

        <h1>Connexion</h1>

        <form
          className="form"
          onSubmit={handleSubmit(handleLogin)}
        >

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              {...register("username")}
            />

            <p className="error">
              {errors.username?.message}
            </p>

          </div>

          <div className="form-group">

            <label>Mot de passe</label>

            <input
              type="password"
              {...register("password")}
            />

            <p className="error">
              {errors.password?.message}
            </p>

          </div>

          <button
            className="btn-primary"
            type="submit"
          >
            Se connecter
          </button>
           <button
                className="btn-primary"
                onClick={() => {navigate("/register")}}
            >
                s'inscrire
            </button>

        </form>

      </div>

    </div>

  );

}

export default Login;