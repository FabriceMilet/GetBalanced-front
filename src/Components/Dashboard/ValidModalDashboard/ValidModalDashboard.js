import { useDispatch } from "react-redux";
import { deletePlanner } from "../../../feature/planner.slice";
import "./ValidModal.scss";
import { openConfirmModal } from "../../../feature/planner.slice";


export default function ValidModalDashboard({plannerId}) {
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(openConfirmModal());
  };
  const handleDelete = () => {
    console.log('plannerIdToDelete', plannerId);
    dispatch(deletePlanner(plannerId));
    dispatch(openConfirmModal());
  };
  return (
    <div className="modal_fond">
      <div className="modal_container">
        <h1 className="modal_title">
          Êtes-vous certain de vouloir supprimer ce planning ?
        </h1>
        <div className="modal_button_container">
          <button onClick={handleModal} className="Button_annuler">
            ANNULER
          </button>
          <button onClick={handleDelete} className="Button_Valider">
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
