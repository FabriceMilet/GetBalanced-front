import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../feature/parametre.slice";
import Parametres from '../Parametres/Parametres'

function Dashboard() {
  const isOpen = useSelector((state) => state.parametre.isOpen);
  const planners = useSelector((state) => state.parametre.planners);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="Dashboard">
      <button
        className={
          isOpen
            ? "Dashboard-button Dashboard-button--hidden"
            : "Dashboard-button"
        }
        onClick={handleClick}
      >
        Créer un planning
      </button>
      {isOpen && (<Parametres />)}
      <div className="Dashboard-planners">
      {planners.map((planner) => (
        <div className={
          isOpen
            ? "Dashboard-planner Dashboard-planner--hidden"
            : "Dashboard-planner"
        } key={planner.title}><h1>{planner.title}</h1> <p>{planner.description}</p> </div>
      ))}
      </div>

    </div>
  );
}

export default Dashboard;
