import { useDispatch } from "react-redux";
import { deletePlanner } from "../../../feature/parametre.slice";
import "./ValidModal.scss";
import { openConfirmModal } from "../../../feature/parametre.slice";
import { useSelector } from "react-redux";

export default function ValidModalDashboard() {
  const plannerIdToDelete = useSelector((state) => state.parametre.plannerIdToDelete);
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(openConfirmModal());
  };
  const handleDelete = () => {
    console.log('plannerIdToDelete', plannerIdToDelete);
    dispatch(deletePlanner(plannerIdToDelete));
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
