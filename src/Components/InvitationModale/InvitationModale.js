import "./InvitationModale.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openInvitModal,
} from "../../feature/parametre.slice";
import { useRef } from "react";

export default function InvitationModale({ plannerId }) {

  console.log("PlannerId", plannerId)

  const dispatch = useDispatch();

  const userConnectedId = useSelector((state) => state.user.userConnected.user.id);
  const userConnected = useSelector((state) => state.user.userConnected.user.id);

  const inputInviteEmail = useRef();

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

  // on envoie l'email d'invit
  const handleSubmit = (event) => {
    event.preventDefault();

    const inviteEmail = inputInviteEmail.current.value;

    if (inviteEmail) {
      // console.log("test", inviteEmail, "UserId", userConnectedId) //OK
      dispatch(openInvitModal());
    }

  };

  return (
    <div className="InvitationModale">
      <h1 className="InvitationModale-title">Envoyez un mail au membre que vous souhaitez inviter à votre planning</h1>
      <form className="InvitationModale-form" onSubmit={handleSubmit}>
        <label
          htmlFor="Envoyer un mail d'invitation"
          className="InvitationModale-input"
        >

          <input
            type="email"
            name="invitation"
            placeholder="p.martin@gmail.com"
            ref={inputInviteEmail}
          />
        </label>

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
