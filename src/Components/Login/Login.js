import './Login.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, } from "../../feature/user.slice";
import { setFormData } from '../../feature/user.slice';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Login() {
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.user.isLogged);
  const formData = useSelector((state) => state.user.formData);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété 
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  useEffect(() => {
    if (isLogged && token) {
      navigate("/dashboard")
    }
  }, [isLogged, token, navigate]);

  // formData est envoyé en paramètre de createUser au slice userSlice
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then(() => {
      dispatch(setFormData({ email: "", password: "" }))
    });
    //console.log("formData", formData);
  }
  // on vide les input au cas où on clique sur la redirection vers login
  const handleClear = () => {
    dispatch(setFormData({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }))
  }
  // console.log("isLogged", isLogged);
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
          <Link onClick={handleClear} to="/signup">
            <p className="SignUp-link">Vous n'avez pas de compte ?</p>
          </Link>
        </div>)}
      {/* on veut renvoyer vers le dashboard si l'utilisateur est logué
 il va falloir ici récupérer son id */}
      {/*  {isLogged && (<Navigate to="/dashboard" replace />)} */}
    </form>
  );
};