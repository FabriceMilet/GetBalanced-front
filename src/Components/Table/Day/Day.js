import "./Day.scss";
import {
  startOfWeek,
  addDays,
  format,
  isWithinInterval,
  getISODay,
} from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  openModifyModal,
  deleteTask,
  modifyTask,
} from "../../../feature/task.slice";
import TaskModale from "../../TaskModale/TaskModale";
import TaskModifyModale from "../../TaskModifyModale/TaskModifyModale";
import { useState } from "react";

function Day() {
  const dispatch = useDispatch();
  // on récupère les données de l'utilisateur connecté
  const userConnected = useSelector((state) => state.user.userConnected);
  console.log('userConnected from week', userConnected);
  // on récupère la valeur de isOpen pour savoir si la modale d'ajout de tâche est ouverte
  const isOpen = useSelector((state) => state.task.isOpen);
  // on récupère la valeur de isModifyOpen pour savoir si la modale de modification de tâche est ouverte
  const isModifyOpen = useSelector((state) => state.task.isModifyOpen);
  // on récupère la date du jour
  const selectedDate = useSelector((state) => state.date.date);
  // on récupère les tâches liées au planning

  const tasks = useSelector((state) => state.task.tasks);

  // const tasks = useSelector((state) =>
  //   state.task.tasks.map((task) => ({ ...task }))
  // );
  console.log('tasks from week', tasks);

  //on va gérer ici l'apparition de la modale des taches
  const handleClick = (event) => {
    // on récupère la date du jour où on veut ajouter une tâche
    const date = event.target.dataset.date;
    dispatch(openModal(date));
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
  // store à quel utilisateur est attribuée la tâche et visuellement encadrer la tâche
  // avec la couleur de l'user
  const handleClickOnCheckbox = (event) => {
    console.log('id de luser', userConnected.user.id);
    console.log('couleur de luser', userConnected.user.color);

    const taskId = event.target.dataset.checkbox;
    // récupérer la tache qui a pour id event.target.dataset.checkbox
    let task = tasks.find((task) => task.id == taskId);
    let newTask = { ...task };
    // console.log('taskToModify', taskToModify);
    // on récup la couleur de l'user et on associe la tache à cet user
    // de même pour l'id, on gère les différents cas,
    // si la tâche est déjà attribuée ou non et si elle est attribuée à quelqu'un d'autre
    if (!newTask.user_id) {
      newTask.user_id = userConnected.user.id;
      newTask.border_color = userConnected.user.color;
      console.log('newTask', newTask);
    } else if (newTask.user_id && newTask.user_id !== userConnected.user.id) {
      newTask.user_id = userConnected.user.id;
      newTask.border_color = userConnected.user.color;
    } else {
      newTask.user_id = null;
      newTask.border_color = null;
    }
    // je cherche à créer un nouvel objet avec seulement les paires clé-valeurs modifiées
    const updatedTask = {}
    for (const [key, value] of Object.entries(newTask)) {
      if (value !== task[key] && value !== '') {
        updatedTask[key] = value;
      }
    }
    const id = task.id
    // on fait la modif dans le store
    dispatch(modifyTask({ updatedTask, id }));
  };
  // on cherche à gérer ici la supression de la tâche. TODO !
  const handleDelete = (event) => {
    const taskId = event.target.dataset.delete;
    dispatch(deleteTask(taskId));
  };
  // on veut gérer le fait de concidérer une tâche comme faite
  const handleDone = (event) => {
    const taskId = event.target.dataset.done;
    // récupérer la tache qui a pour id event.target.dataset.done
    const task = tasks.find((task) => task.id == taskId);
    let newTask = { ...task };

    if (task.user_id === null) {
      alert(
        "Vous devez vous assigner la tâche avant de la considérer comme terminée"
      );
    } else {

      newTask.done = true;
      // je cherche à créer un nouvel objet avec seulement les paires clé-valeurs modifiées
      const updatedTask = {}
      for (const [key, value] of Object.entries(newTask)) {
        if (value !== task[key] && value !== '') {
          updatedTask[key] = value;
        }
      }
      const id = task.id
      // on fait la modif dans le store
      dispatch(modifyTask({ updatedTask, id }));
    }

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
    const dateOftheday = format(day, "yyyy-MM-dd");
    days.push(
      <div className="Day-day" key={i} >
        <div className="Day-dayName">
          <span>{daysOfWeek[i]}</span>
          {formattedDay}
          <button
            onClick={handleClick}
            className="Day-button"
            data-date={dateOftheday}
          >
            +
          </button>
        </div>
        {/* ici, on fait apparaitre la tâche ajoutée sur le jour correspndant */}
        <div datatype={i} className="Day-dayContainer">
          {tasks.map((task) => {
            const taskDate = new Date(task.date);
            // console.log(taskDate.getDay())
            const taskIsWithinWeek = isWithinInterval(taskDate, {
              start: startOfweek,
              end: addDays(startOfweek, daysInWeek),
            });
            if (taskIsWithinWeek && i === getISODay(taskDate) - 1) {
              // on regarde si l'id de la tâche correspond à l'evenement cliqué avec clickToOpen
              const isTaskOpen = task.id == openTaskId;
              return (
                <div
                  className={
                    task.done ? "Day-task Day-task__done" : "Day-task"
                  }
                  key={task.id}
                  style={{
                    borderColor: task.border_color,
                    borderTopWidth: task.border_color ? "5px" : "1px",
                  }}
                >
                  <div className="Day-task__closed">
                    <h1>{task.name}</h1>
                    <input
                      type="checkbox"
                      data-checkbox={task.id}
                      onClick={handleClickOnCheckbox}
                    ></input>
                  </div>
                  {isTaskOpen && (
                    <div className="Day-task__open">
                      <p className="Day-task__description">
                        {task.description}
                      </p>
                      <p className="Day-task__category">{task.category}</p>
                      <div className="Day-task__buttons">
                        <button
                          className="Day-task__button"
                          onClick={handleModify}
                          data-modify={task.id}
                        >
                          Modifier
                        </button>
                        <button
                          className="Day-task__button"
                          onClick={handleDone}
                          data-done={task.id}
                        >
                          Terminer
                        </button>
                        <button
                          className="Day-task__button"
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
                      isTaskOpen ? "Day-task__arrow-top" : "Day-task__arrow"
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
    <div className="Day" >
      {isOpen && <TaskModale />}
      {isModifyOpen && <TaskModifyModale />}
      {!isOpen && !isModifyOpen &&
        <div className="Day-days">
          {days}
        </div>
      }
    </div>
  );
}

export default Day;

