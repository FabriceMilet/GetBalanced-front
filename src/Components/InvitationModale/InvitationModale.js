import "./InvitationModale.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  openInvitModal,
} from "../../feature/parametre.slice";

export default function InvitationModale() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.parametre.formData);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  // on va chercher ici à faire apparaitre le tableau dans le dashboard et l'enregitrer en BDD
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(addPlanner(formData)).then(() => {
  //     dispatch(setFormData({ name: "", description: "", invitation: "" }));
  //   });
  //   dispatch(openModal());
  // };
  const handleCancel = () => {
    dispatch(openInvitModal())
  }

  return (
    <div className="InvitationModale">
      <h1 className="InvitationModale-title">Envoyez un mail au membre que vous souhaitez inviter à votre planning</h1>
     <form className="InvitationModale-form">
        <label
          htmlFor="Envoyer un mail d'invitation"
          className="InvitationModale-input"
        >
          
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
<div className="InvitationModale-buttons">
        <button type="submit" className="InvitationModale-button">
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
