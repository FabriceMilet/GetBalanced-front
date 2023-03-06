import "./Dashboard.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  deletePlanner,
  getPlanners,
} from "../../feature/parametre.slice";
import Parametres from "../Parametres/Parametres";
import { Link } from "react-router-dom";
import { setFormData } from "../../feature/parametre.slice";

function Dashboard() {
  // const { id } = useSelector((state) => state.user.userConnected);
  // const userConnected = useSelector((state) => state.user.userConnected);
  // console.log('from dashboard :', userConnected);
  const isOpen = useSelector((state) => state.parametre.isOpen);
  const planners = useSelector((state) => state.parametre.planners);
  const formData = useSelector((state) => state.parametre.formData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlanners());
  }, []);
  console.log(planners);

  const handleClick = () => {
    dispatch(openModal());
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLarge(false);
  };
  //on gère ici l'ouverture du planning pour voir apparaitre le formulaire d'invit et bouton supprimer
  // j'essaie de gérer indifféremment le clique sur un planning par rapport à un autre
  const [openPlannerId, setOpenPlannerId] = useState(null);
  const [isLarge, setIsLarge] = useState(false);
  // on cherche également à savoir si la tache est déjà ouverte pour pouvoir la refermer
  const clickToOpen = (event) => {
    const plannerId = event.target.dataset.id;
    console.log(plannerId);
    if (isLarge && plannerId === openPlannerId) {
      // Le planning est déjà ouvert et on clique sur le même , donc on le ferme
      setIsLarge(false);
      setOpenPlannerId(null);
    } else {
      // Le planning est fermé ou on clique sur un autre, donc on l'ouvre
      setIsLarge(true);
      setOpenPlannerId(plannerId);
    }
  };

  const handleDelete = (event) => {
    const plannerId = event.target.dataset.delete;
    // récupérer le planner qui a pour id event.target.dataset.delete
    // const planner = planners.find((planner) => planner.id == plannerId);
    dispatch(deletePlanner(plannerId));
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
            key={planner.id}
          >
            {/* il va falloir ici récupérer l'id de la table  */}
            {/* <Link to={`/table/${id}`}> */}
            <Link to="/table/1">
              <h1>{planner.name}</h1> <p>{planner.description}</p>
              {/* <button className="Dashboard-button" onClick={handleClick}>
              Modifier
            </button> */}
            </Link>
            {(planner.id == openPlannerId) && (
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
                <button
                  onClick={handleDelete}
                  data-delete={planner.id}
                  className="Parametres-button"
                >
                  {" "}
                  Supprimer ce planning{" "}
                </button>
              </>
            )}
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              className={(planner.id == openPlannerId) ? "Dashboard-arrow-top" : "Dashboard-arrow"}
            >
              <path
                fill="#0A0A30"
                fillRule="evenodd"
                stroke="#0A0A30"
                strokeWidth="3"
                d="M17.358 12.632a.714.714 0 01-.092 1.006l-4.276 3.564a.712.712 0 01-.933 0L7.78 13.638a.714.714 0 11.915-1.097l3.078 2.565V7.375a.75.75 0 011.5 0v7.73l3.079-2.564a.714.714 0 011.006.091z"
                clipRule="evenodd"
                data-id={planner.id}
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
                {/* ici, avec les vrais routes back, changer .name par.id, de même pour la key */}
                <button onClick={handleDelete} data-delete={planner.name}> Supprimer ce planning </button>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
