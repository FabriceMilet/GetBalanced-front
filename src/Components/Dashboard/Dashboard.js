import "./Dashboard.scss";
import { FaTrash, FaMailBulk } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  openInvitModal,
  openConfirmModal,
  getPlanners
} from "../../feature/planner.slice";
import Parametres from "./Parametres/Parametres";
import { Link } from "react-router-dom";
import InvitationModale from "./InvitationModale/InvitationModale";
import ValidModalDashboard from "./ValidModalDashboard/ValidModalDashboard"


export default function Dashboard() {
  const isOpen = useSelector((state) => state.planner.isOpen);
  const isInvitOpen = useSelector((state) => state.planner.isInvitOpen);
  const isConfirmOpen = useSelector((state) => state.planner.isConfirmOpen);
  const planners = useSelector((state) => state.planner.planners);
  const dispatch = useDispatch();
  // State de l'id du planner sur lequel on clique
  const [plannerId, setPlannerId] = useState(null);

  useEffect(() => {
    dispatch(getPlanners());
  }, [plannerId, dispatch]);

  const handleClick = () => {
    dispatch(openModal());
  };

  const handleDelete = (event) => {

    // récupérer le planner qui a pour id event.target.dataset.delete
    const plannerIdToDelete = event.currentTarget.dataset.delete;
    console.log('plannerIdToDelete', plannerIdToDelete);
    setPlannerId(plannerIdToDelete);
    dispatch(openConfirmModal());
  };

  const handleInvit = (event) => {
    // récupérer le planner qui a pour id event.target.dataset.delete
    const plannerIdToInvit = event.currentTarget.dataset.delete;
    //console.log('plannerIdToinvit', plannerIdToInvit);
    setPlannerId(plannerIdToInvit);
    dispatch(openInvitModal());
  };

  return (
    <div className="Dashboard">
      <button
        className={
          (isOpen || isInvitOpen || isConfirmOpen)
            ? "Dashboard-button Dashboard-button--hidden"
            : "Dashboard-button"
        }
        onClick={handleClick}
      >
        Créer un planning
      </button>
      {isOpen && <Parametres />}
      {isInvitOpen && <InvitationModale plannerId={plannerId} />}
      {isConfirmOpen && <ValidModalDashboard plannerId={plannerId} />}
      <div className="Dashboard-planners">
        {planners &&
          planners.map((planner) => (
            <div
              className={
                (isOpen || isInvitOpen)
                  ? "Dashboard-planner Dashboard-planner--hidden"
                  : "Dashboard-planner"
              }
              key={planner.id}
            >
              <Link to={`/table/${planner.id}`}>
                <h1 className="Dashboard-planner__title">{planner.name}</h1>
                <p className="Dashboard-planner__description">{planner.description}</p>
              </Link>
              <div>
                <div className="Dashboard-planner__block">
                  <p>Inviter un membre </p>
                  <button
                    onClick={handleInvit}
                    data-delete={planner.id}
                    className="Dashboard-planner__button"
                  >
                    <FaMailBulk />
                  </button>
                </div>

                <div className="Dashboard-planner__block">
                  <p>Supprimer votre planning</p>
                  <button
                    onClick={handleDelete}
                    data-delete={planner.id}
                    className="Dashboard-planner__button"
                  >
                    <FaTrash />
                  </button>
                </div>

              </div>

            </div>
          ))}
      </div>
    </div>
  );
}

