import './Login.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from "../../feature/users.slice";

function Login() {
const isLogged = useSelector((state) => state.user.isLogged);
const dispatch = useDispatch();
// gestion des données du formulaire en local dans ce même composant
const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
// on veut créer ici une nouvelle copie de l'objet formData avec la propriété 
// correspondant à la variable name et sa valeur associée
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};
// formData est envoyé en paramètre de createUser au slice userSlice
const handleSubmit = (event) => {
  event.preventDefault();
    dispatch(loginUser(formData));
    console.log(formData);
  }
  return (
    <form className="Login" onSubmit={handleSubmit}>
    {!isLogged && (
    <div className="Login-container">
    <h1 className="Login-title"> Se connecter à votre compte </h1>
      <label htmlFor="email" className="Login-input">
        <input
          type="email"
          name="email"
          placeholder="Saisissez votre email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Saisissez votre mot de passe" className="Login-input">
        <input
          type="password"
          name="password"
          placeholder="Saisissez votre mot de passe"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="SignUp-button">Se connecter</button>
      <Link to="/signup">
      <p className="SignUp-link">Vous n'avez pas de compte ?</p>
      </Link>
      </div>)}
       {/* on veut renvoyer vers le dashboard si l'utilisateur est logué
 il va falloir ici récupérer son id */}
      {isLogged && (<Navigate to="/dashboard/:id" replace />)}
    </form>
  );
}

export default Login;