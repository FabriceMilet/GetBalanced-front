import "./SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../feature/user.slice";
import { Link, Navigate } from 'react-router-dom';
import { setFormData } from '../../feature/user.slice';

export default function SignUp() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const formData = useSelector((state) => state.user.formData);
 
  const dispatch = useDispatch();
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété 
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  // formData est envoyé en paramètre de createUser au slice userSlice
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
    } else {
      
      dispatch(createUser(formData)).then(() => {
        dispatch(setFormData({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }))
      });
    }
  }
  // on vide les input au cas où on clique sur la redirection vers login
  const handleClear = () => {
    dispatch(setFormData({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }))
  }

  //console.log("isLogged", isLogged);
  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      {!isLogged && (
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
          <Link onClick={handleClear} to="/login">
            <p className="SignUp-link">Vous avez déjà un compte ?</p>
          </Link>
        </div>
      )}
      {/* on veut renvoyer vers la page de profil si l'utilisateur est logué*/}
      {isLogged && (<Navigate to="/user" replace />)}
    </form>
  );
};
