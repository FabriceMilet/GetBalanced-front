import "./Dashboard.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, deletePlanner } from "../../feature/parametre.slice";
import Parametres from "../Parametres/Parametres";
import { Link } from "react-router-dom";
import { setFormData } from "../../feature/parametre.slice";

function Dashboard() {
  // const { id } = useSelector((state) => state.user.userConnected);
  // const userConnected = useSelector((state) => state.user.userConnected);
  //console.log('from dashboard :', userConnected);
  const isOpen = useSelector((state) => state.parametre.isOpen);
  const planners = useSelector((state) => state.parametre.planners);
  const formData = useSelector((state) => state.parametre.formData);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLarge(false)
  };
  const [isLarge, setIsLarge] = useState(
    false
  );
  const clickToOpen = () => {
    setIsLarge(true)
  }
  const handleDelete = (event) => {
    const plannerId = event.target.dataset.delete;
    // récupérer le planner qui a pour id event.target.dataset.delete
    const planner = planners.find((planner) => planner.id == plannerId);
    dispatch(deletePlanner(planner))
  }

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
      {isOpen && <Parametres />}
      <div className="Dashboard-planners">
        {planners.map((planner) => (
          // ici il faudra changer le /1 en une route paramétré avec l'id
          <div
            className={
              isOpen
                ? "Dashboard-planner Dashboard-planner--hidden"
                : "Dashboard-planner"
            }
            key={planner.title}
          >
            {/* il va falloir ici récupérer l'id de la table  */}
            {/* <Link to={`/table/${id}`}> */}
            <Link to="/table/1">
              <h1>{planner.title}</h1> <p>{planner.description}</p>
              {/* <button className="Dashboard-button" onClick={handleClick}>
              Modifier
            </button> */}
            </Link>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
            >
              <path
                className="Dashboard-arrow"
                fill="#0A0A30"
                fillRule="evenodd"
                stroke="#0A0A30"
                strokeWidth="3"
                d="M17.358 12.632a.714.714 0 01-.092 1.006l-4.276 3.564a.712.712 0 01-.933 0L7.78 13.638a.714.714 0 11.915-1.097l3.078 2.565V7.375a.75.75 0 011.5 0v7.73l3.079-2.564a.714.714 0 011.006.091z"
                clipRule="evenodd"
                onClick={clickToOpen}
              />
            </svg>
            {isLarge &&
            <>
              <form className="Parametres-form" onSubmit={handleSubmit}>
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
                <button type="submit" className="Parametres-button">
                  Valider
                </button>
              </form>
              {/* ici, avec les vrais routes back, changer .title par.id, de même pour la key */}
              <button onClick={handleDelete} data-delete={planner.title}> Supprimer ce planning </button>
              </>
            }
          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;
