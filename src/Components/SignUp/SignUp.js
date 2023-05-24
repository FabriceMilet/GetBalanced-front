import "./SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../feature/user.slice";
import { Link, Navigate } from 'react-router-dom';
import { setFormData } from '../../feature/user.slice';
import tutoGetBalanced1 from '../../img/tutoGetBalanced1.png';
import tutoGetBalanced2 from '../../img/tutoGetBalanced2.png';
import tutoGetBalanced3 from '../../img/tutoGetBalanced3.png';
import tutoGetBalanced4 from '../../img/tutoGetBalanced4.png';
import tutoGetBalanced5 from '../../img/tutoGetBalanced5.png';
import { useState } from "react";

export default function SignUp() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const formData = useSelector((state) => state.user.formData);
  const tutorialImages = [
    tutoGetBalanced1,
    tutoGetBalanced2,
    tutoGetBalanced3,
    tutoGetBalanced4,
    tutoGetBalanced5
  ];
  // j'ajoute un état  état pour gérer l'affichage du tutoriel et la position actuelle de l'image dans le tableau
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // je définis des gestionnaires d'événements pour passer à l'image suivante ou précédente dans le tutoriel 
  const nextImage = () => {
    if (currentImageIndex < tutorialImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    if (currentImageIndex === tutorialImages.length - 1) {
      setShowTutorial(false);
    }
  };
  
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

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
      setShowTutorial(true);
      dispatch(createUser(formData)).then(() => {
        dispatch(setFormData({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }))
      });
    }
  }
  // on vide les input au cas où on clique sur la redirection vers login
  const handleClear = () => {
    dispatch(setFormData({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" }))
  }

  return (
    <div>
      {showTutorial ? (
         <div>
         <img src={tutorialImages[currentImageIndex]} alt="Tutorial Step" />
         <button onClick={prevImage}>Précédent</button>
           <button onClick={nextImage}>Suivant</button>
           </div>
         ) : (
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
    </form>)}
    </div>
  );
};
