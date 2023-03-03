import "./Parametres.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, openModal, addPlanner} from "../../feature/parametre.slice";

export default function Parametres() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.parametre.formData);
  // const planners = useSelector((state) => state.parametre.planners);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
// on va chercher ici à faire apparaitre le tableau dans le dashboard et l'enregitrer en BDD
const handleSubmit = (event) => {
  event.preventDefault();
  // console.log(formData);
  // console.log(planners);
  dispatch(addPlanner(formData)).then(() => {
    dispatch(setFormData({ name: "", description: "", invitation: "" }))});
  dispatch(openModal());
};

  // on va chercher ici à ajouter autant d'input pour invitation de membres que de clique sur le bouton plus mais
  // pas vraiment réussi pour le moment donc je vais commenter cela et commencer par envoyer un seul lien
  // et donner la possibilité d'en envoyer d'autres depuis le tableau
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   const newInvitations = [...formData.invitations, formData.newInvitation];
  //   setFormData({ ...formData, invitations: newInvitations, newInvitation: "" });
  //   console.log(formData.invitations);
  // };

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
          Envoyez un mail au membre que vous souhaitez inviter à votre
          planning
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

        <button type="submit" className="Parametres-button">
          Valider
        </button>
      </form>
    </div>
  );
}


