import './Parametres.scss';
import { useState } from "react";

export default function Parametres() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    invitation: ""
  });
// on veut créer ici une nouvelle copie de l'objet formData avec la propriété 
// correspondant à la variable name et sa valeur associée
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};
// on va chercher ici à ajouter autant d'input pour invitation de membres que de clique sur le bouton plus
const [counter, setCounter] = useState(1);
const handleClick = (event) => {
  event.preventDefault();
  setCounter(counter + 1)
  console.log(counter);
};

  return (
    <div className="Parametres">
    <h1 className="Parametres-title">Paramètres du tableau</h1>
    <form className='Parametres-form'>
    <label htmlFor="titre" className="Parametres-input"> Titre
        <input
          type="text"
          name="title"
          placeholder="Famille Belier"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description" className="Parametres-input"> Description
        <input
          type="text"
          name="description"
          placeholder="Gestion des tâches quotidiennes"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Envoyer un mail d'invitation" className="Parametres-input"> Envoyez un mail aux membres que vous souhaitez inviter à votre planning
       <input
          type="email"
          name="invitation"
          placeholder="p.martin@gmail.com"
          value={formData.invitation}
          onChange={handleChange}
        />
      </label>
      <div>
      <p className='Parametres-add'>Envoyer une invitation à un membre supplémentaire</p>
      <button className='Parametres-add__button' onClick={handleClick}> + </button> 
      </div>

      <button type='submit' className='Parametres-button'> Valider </button>
    </form>
  </div>
  )
}
