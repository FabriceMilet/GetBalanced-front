import "./Dashboard.scss";
import { FaTrash, FaMailBulk } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  openInvitModal,
  deletePlanner,
  getPlanners,
} from "../../feature/parametre.slice";
import Parametres from "../Parametres/Parametres";
import { Link } from "react-router-dom";
import InvitationModale from "../InvitationModale/InvitationModale";
// import { setFormData } from "../../feature/parametre.slice";

function Dashboard() {
  const isOpen = useSelector((state) => state.parametre.isOpen);
  const isInvitOpen = useSelector((state) => state.parametre.isInvitOpen);
  const planners = useSelector((state) => state.parametre.planners);
  // const formData = useSelector((state) => state.parametre.formData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlanners());
  }, []);

  const handleClick = () => {
    dispatch(openModal());
  };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   dispatch(setFormData({ ...formData, [name]: value }));
  // };

  //on gère ici l'ouverture du planning pour voir apparaitre le formulaire d'invit et bouton supprimer
  // j'essaie de gérer indifféremment le clique sur un planning par rapport à un autre
  // const [openPlannerId, setOpenPlannerId] = useState(null);
  // const [isLarge, setIsLarge] = useState(false);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // ici, il va falloir gérer l'envoie de l'invitation et mettre la ligne suivante dans un .then
  //   dispatch(setFormData({ name: "", description: "", date: "" }));
  //   // setIsLarge(false);
  // };
  // on cherche également à savoir si la tache est déjà ouverte pour pouvoir la refermer
  // const clickToOpen = (event) => {
  //   const plannerId = event.target.dataset.id;
  //   console.log(plannerId);
  //   if (isLarge && plannerId === openPlannerId) {
  //     // Le planning est déjà ouvert et on clique sur le même , donc on le ferme
  //     setIsLarge(false);
  //     setOpenPlannerId(null);
  //   } else {
  //     // Le planning est fermé ou on clique sur un autre, donc on l'ouvre
  //     setIsLarge(true);
  //     setOpenPlannerId(plannerId);
  //   }
  // };

  const handleDelete = (event) => {
    const plannerId = event.target.dataset.delete;
    // récupérer le planner qui a pour id event.target.dataset.delete
    // const planner = planners.find((planner) => planner.id == plannerId);
    dispatch(deletePlanner(plannerId));
  };

  const handleInvit = () => {
    dispatch(openInvitModal());
  };

  return (
    <div className="Dashboard">
      <button
        className={
          (isOpen || isInvitOpen)
            ? "Dashboard-button Dashboard-button--hidden"
            : "Dashboard-button"
        }
        onClick={handleClick}
      >
        Créer un planning
      </button>
      {isOpen && <Parametres />}
      {isInvitOpen && <InvitationModale />}
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
                    className="Parametres-button"
                  >
                    <FaMailBulk />
                  </button>
                </div>

                <div className="Dashboard-planner__block">
                  <p>Supprimer votre planning</p>
                  <button
                    onClick={handleDelete}
                    data-delete={planner.id}
                    className="Parametres-button"
                  >
                    <FaTrash />
                  </button>
                </div>
                </div>

              {/* <form className="Parametres-form" onSubmit={handleSubmit}>
                    <label
                      htmlFor="Envoyer un mail d'invitation"
                      className="Parametres-input"
                    >
                     Inviter un membre à votre planning
                      <input
                        type="email"
                        name="invitation"
                        placeholder="p.martin@gmail.com"
                        value={formData.invitation}
                        onChange={handleChange}
                      />
                    </label>
                    <button type="submit" className="Parametres-button">
                      invit
                    </button>
                  </form> */}

              {/* <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className={
                  planner.id == openPlannerId
                    ? "Dashboard-arrow-top"
                    : "Dashboard-arrow"
                }
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
              </svg> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
