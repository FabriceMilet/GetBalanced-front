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
    <div className="ValidModalDashboard">
      <div className="ValidModalDashboard-container">
        <h1 className="ValidModalDashboard-title">
          Êtes-vous certain de vouloir supprimer ce planning ?
        </h1>
        <div className="ValidModalDashboard-buttons">
          <button onClick={handleModal} className="ValidModalDashboard-buttons__cancel">
            ANNULER
          </button>
          <button onClick={handleDelete} className="ValidModalDashboard-buttons__valid">
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
