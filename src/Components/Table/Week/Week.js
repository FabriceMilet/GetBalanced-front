import "./Week.scss";
// import { useState } from "react";
import { startOfWeek, addDays, format, isWithinInterval } from "date-fns";
import { fr } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  openModifyModal,
  getTasks,
  deleteTask,
  modifyTask,
} from "../../../feature/task.slice";
import TaskModale from "../../TaskModale/TaskModale";
import TaskModifyModale from "../../TaskModifyModale/TaskModifyModale";
import { useState, useEffect } from "react";

function Week() {
  // on commence par récupérer les taches du planning
  useEffect(() => {
    dispatch(getTasks());
    // console.log('tasks récupées :', tasks);
  }, []);
  const dispatch = useDispatch();
  // on récupère les données de l'utilisateur connecté
  const userConnected = useSelector((state) => state.user.userConnected);
  // on récupère la valeur de isOpen pour savoir si la modale d'ajout de tâche est ouverte
  const isOpen = useSelector((state) => state.task.isOpen);
  // on récupère la valeur de isModifyOpen pour savoir si la modale de modification de tâche est ouverte
  const isModifyOpen = useSelector((state) => state.task.isModifyOpen);
  // on récupère la date du jour
  const selectedDate = useSelector((state) => state.date.date);
  // const tasks = useSelector((state) => state.task.tasks);
  // on récupère les tâches liées au planning auxquels on ajoute l'id de l'user
  const tasks = useSelector((state) =>
    state.task.tasks.map((task) => ({ ...task, userId: userConnected.id }))
  );
  console.log(tasks);
  // on récupère l'id de la tâche, à voir comment exactement lier le bon id à l'id qui nous intéresse
  // dans le but de supprimer une tâche
  // faire quelque chose comme cela mais cela reste en TODO, ce sera plus facile à tester avec les
  // routes back
  // const {id} = useSelector((state) => state.task.tasks);
  // console.log(tasks);
  //on va gérer ici l'apparition de la modale des taches
  const handleClick = () => {
    dispatch(openModal());
  };
  //on va gérer ici l'apparition de la modale de modification des taches
  const handleModify = (event) => {
    const taskId = event.target.dataset.modify;
    // récupérer la tache qui a pour id event.target.dataset.modify
    const task = tasks.find((task) => task.id == taskId);
    dispatch(openModifyModal(task));
  };

  //on gère ici l'ouverture de la tache pour voir apparaitre description et bouton modifier
  // j'essaie de gérer indifféremment le clique sur une tâche par rapport à une autre
  // on fait ca en local, il y aura peut-etre besoin de le passer dans le store
  const [openTaskId, setOpenTaskId] = useState(null);
  // on cherche également à savoir si la tache est déjà ouverte pour pouvoir la refermer
  const [isLarge, setIsLarge] = useState(false);
  const clickToOpen = (event) => {
    const taskId = event.target.dataset.id;
    if (isLarge && taskId === openTaskId) {
      // La tâche est déjà ouverte et on clique sur la même tâche, donc on la ferme
      setIsLarge(false);
      setOpenTaskId(null);
    } else {
      // La tâche est fermée ou on clique sur une autre tâche, donc on l'ouvre
      setIsLarge(true);
      setOpenTaskId(taskId);
    }
  };

  // on cherche à gérer ici l'attribution d'une tâche, c'est à dire indiquer dans le
  // store à qu'elle utilisateur est attribuée la tâche et visuellement encadrer la tâche
  // avec la couleur de l'user

  const handleClickOnCheckbox = (event) => {
    const taskId = event.target.dataset.checkbox;
    // récupérer la tache qui a pour titre event.target.dataset.checkbox
    // on changera cela avec l'id quand on aura les données du back
    const task = tasks.find((task) => task.id == taskId);
    
    // on récup la couleur de l'user et on associe la tache à cet user
    task.borderColor = userConnected.color;
    // de même pour l'id, on gère les différents cas, 
    // si la tâche est déjà attribuée ou non et si elle est attribuée à quelqu'un d'autres
    if (!task.userId) {
      task.userId = userConnected.id;
    } else if (task.userId && task.userId !== userConnected.id) {
      task.userId = userConnected.id;
    } else {
      task.userId = null;
    }
    // on fait la modif dans le store
    dispatch(modifyTask(task));
    // console.log("toutes les tasks", tasks);
    // console.log("la task que je veux m'affecter :", task);
    // au click, associer la bordure de la tâche à cette couleur
  };

  // on cherche à gérer ici la supression de la tâche. TODO !
  const handleDelete = (event) => {
    const taskId = event.target.dataset.delete;
    // const task = tasks.find((task) => task.title === taskTitle);
    dispatch(deleteTask(taskId));
    // console.log("j'ai cliqué sur supprimer");
  };

  // on gère ici la mise en place de l'agenda avec la librairie date-fns
  const startOfweek = startOfWeek(selectedDate, {
    weekStartsOn: 1,
    // locale: fr,
  });
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const daysInWeek = 7;
  const days = [];

  for (let i = 0; i < daysInWeek; i++) {
    const day = addDays(startOfweek, i);
    const formattedDay = format(day, "d");

    // J'ajoute la classe 'Week-dayContainer-last' pour le dernier élément de la boucle pour lui enlever sa bordure
    const isLast = i === daysInWeek - 1;
    const dayContainerClasses = `Week-dayContainer ${
      isLast ? "Week-dayContainer-last" : ""
    }`;

    days.push(
      <div className="Week-day" key={i}>
        <div className="Week-dayName">
          <span>{daysOfWeek[i]}</span>
          {formattedDay}
          <button onClick={handleClick} className="Week-button">
            +
          </button>
        </div>
{/* ici, on fait apparaitre la tâche ajoutée sur le jour correspndant */}
        <div datatype={i} className={dayContainerClasses}>
          {tasks.map((task) => {
            const taskDate = (new Date(task.date));
          // console.log(taskDate.getDay())
            const taskIsWithinWeek = isWithinInterval(taskDate, {
              start: startOfweek,
              end: addDays(startOfweek, daysInWeek),
            });
            if (taskIsWithinWeek && i  === taskDate.getDay()-1) {
              // on regarde si l'id de la tâche correspond à l'evenement cliqué avec clickToOpen
              const isTaskOpen = task.id == openTaskId;
              return (
                <div
                  className="Week-task"
                  key={task.id}
                  style={{ borderColor: task.borderColor }}
                >
                  <div className="Week-task__closed">
                    <h1>{task.title}</h1>
                    <input
                      type="checkbox"
                      data-checkbox={task.id}
                      onClick={handleClickOnCheckbox}
                    ></input>
                  </div>
                  {isTaskOpen && (
                    <div className="Week-task__open">
                      <p className="Week-task__description">
                        {task.description}
                      </p>
                      <div className="Week-task__buttons">
                        <button
                          className="Week-task__button"
                          onClick={handleModify}
                          data-modify={task.id}
                        >
                          Modifier
                        </button>
                        <button
                          className="Week-task__button"
                          onClick={handleDelete}
                          data-delete={task.id}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                  <svg
                    className={
                      isTaskOpen ? "Week-task__arrow-top" : "Week-task__arrow"
                    }
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      fill="#0A0A30"
                      fillRule="evenodd"
                      stroke="#0A0A30"
                      strokeWidth="3"
                      d="M17.358 12.632a.714.714 0 01-.092 1.006l-4.276 3.564a.712.712 0 01-.933 0L7.78 13.638a.714.714 0 11.915-1.097l3.078 2.565V7.375a.75.75 0 011.5 0v7.73l3.079-2.564a.714.714 0 011.006.091z"
                      clipRule="evenodd"
                      data-id={task.id}
                      onClick={clickToOpen}
                    />
                  </svg>
                </div>
              );
            } else {
              return "";
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="Week">
      {isOpen && <TaskModale />}
      {isModifyOpen && <TaskModifyModale />}
      {!isOpen && !isModifyOpen && <div className="Week-days">{days}</div>}
    </div>
  );
}

export default Week;
