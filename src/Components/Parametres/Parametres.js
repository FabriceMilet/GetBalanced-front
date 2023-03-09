import "./Parametres.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  openModal,
  addPlanner,
} from "../../feature/parametre.slice";

export default function Parametres() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.parametre.formData);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  // on va chercher ici à faire apparaitre le tableau dans le dashboard et l'enregitrer en BDD
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPlanner(formData)).then(() => {
      dispatch(setFormData({ name: "", description: "", invitation: "" }));
    });
    dispatch(openModal());
  };
  const handleCancel = () => {
    dispatch(openModal())
  }

  return (
    <div className="Parametres">
      <h1 className="Parametres-title">Paramètres du tableau</h1>
      <form className="Parametres-form" onSubmit={handleSubmit}>
        <label htmlFor="titre" className="Parametres-input">
          Titre
          <input
            type="text"
            name="name"
            placeholder="Famille Belier"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description" className="Parametres-input">
          Description
          <input
            type="text"
            name="description"
            placeholder="Gestion des tâches quotidiennes"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="Envoyer un mail d'invitation"
          className="Parametres-input"
        >
          Envoyez un mail au membre que vous souhaitez inviter à votre planning
          <input
            type="email"
            name="invitation"
            placeholder="p.martin@gmail.com"
            value={formData.invitation}
            onChange={handleChange}
          />
        </label>
        {/*  cette partie sera à revoir si on souhaite par la suite ajouter plusieurs membres à la fois
        <div>
  <p className="Parametres-add">
  Envoyer une invitation à un membre supplémentaire
</p>
<button className="Parametres-add__button" onClick={handleClick}>
  +
</button>
</div>
{formData.invitations.map((invitation, index) => (
  <label
htmlFor="Envoyer un mail d'invitation"
className="Parametres-input"
key={`invitation-${index}`}
>
  <input
  type="email"
  name="invitation"
  placeholder="p.martin@gmail.com"
  value={formData.invitation}
  onChange={handleChange}
/></label>
))}  */}
<div className="Parametres-buttons">
        <button type="submit" className="Parametres-button">
          Valider
        </button>
        <button onClick={handleCancel} className="Parametres-button">
          X
        </button>
        </div>
      </form>
    </div>
  );
}
