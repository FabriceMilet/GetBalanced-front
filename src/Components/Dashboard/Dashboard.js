import "./Dashboard.scss";
import { useState } from "react";
import Parametres from '../Parametres/Parametres'

function Dashboard() {
  // etat local d'ouverture de modale
  const [isOpen, openModal] = useState(false);

  const handleClick = () => {
    openModal(!isOpen);
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
    </div>
  );
}

export default Dashboard;
