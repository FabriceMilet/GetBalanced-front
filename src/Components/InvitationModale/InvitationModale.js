import "./InvitationModale.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openInvitModal,
} from "../../feature/planner.slice";
import { useRef } from "react";
import { inviteUser, setSucces } from "../../feature/user.slice";

export default function InvitationModale({ plannerId }) {


  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userConnected.user.id); // UserID

  const inputInviteEmail = useRef();

  const handleCancel = () => {
    dispatch(openInvitModal())
  }

  // on envoie l'email d'invit
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = inputInviteEmail.current.value;

    if (email) {
      //console.log("email", email, "userId", userId, "plannerId", plannerId);
      dispatch(inviteUser({ email, userId, plannerId }))
      // console.log("test", inviteEmail, "UserId", userConnectedId) //OK
      dispatch(openInvitModal());
    }
    dispatch(setSucces(""))
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
