import "./SignUp.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../feature/users.slice";
import { Link } from 'react-router-dom';

function SignUp() {

const dispatch = useDispatch();
// gestion des données du formulaire en local dans ce même composant
const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  if (formData.password !== formData.confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
  } else {
    dispatch(createUser(formData));
    console.log(formData);
    // on va devoir prévoir l'envoie vers la page profil ou dashboard 
  }}

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
    <div className="SignUp-container">
    <h1 className="SignUp-title"> Créez votre compte </h1>
      <label htmlFor="prénom" className="SignUp-input">
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          value={formData.firstname}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="nom" className="SignUp-input">
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          value={formData.lastname}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email" className="SignUp-input">
        <input
          type="email"
          name="email"
          placeholder="Adresse Email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Saisissez un mot de passe" className="SignUp-input">
        <input
          type="password"
          name="password"
          placeholder="Saisissez un mot de passe"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Confirmez le mot de passe" className="SignUp-input">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmez le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="SignUp-button">S'inscrire</button>
      <Link to="/login">
      <p className="SignUp-link">Vous avez déjà un compte ?</p>
      </Link>
      </div>
    </form>
  );
};

export default SignUp;
