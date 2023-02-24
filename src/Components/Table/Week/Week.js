import "./Week.scss";
// import { useState } from "react";
import { startOfWeek, addDays, format, isWithinInterval } from "date-fns";
import { fr } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../feature/task.slice";
import TaskModale from "../../TaskModale/TaskModale";
import { setTasks } from "../../../feature/task.slice";

function Week() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.task.isOpen);
  const selectedDate = useSelector((state) => state.date.date);
  // const tasks = useSelector((state) => state.task.tasks);

  // je cherche à avoir une fleche indépendante pour ouvrir une tache ou une autre
  const tasks = useSelector((state) =>
  state.task.tasks.map((task) => ({ ...task, isLarge: false }))
);

  const startOfweek = startOfWeek(selectedDate, {
    weekStartsOn: 1,
    locale: fr,
  });

  //on va gérer ici l'apparition de la modale des taches
  const handleClick = () => {
    dispatch(openModal());
  };
  //on gère ici l'ouverture de la tache pour voir apparaitre description et bouton modifier

  // const [isLarge, setIsLarge] = useState(false);
  // const clickToOpen = (event) => {
  //   setIsLarge(true);
  // };
// j'essaie de gérer indifféremment le clique sur une tâche par rapport à une autre
// mais reste en todo !
  const clickToOpen = (taskTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.title === taskTitle ? { ...task, isLarge: true } : task
    );
    setTasks(updatedTasks);
  };


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

        <div datatype={i} className={dayContainerClasses}>
          {tasks.map((task) => {
            const taskDate = new Date(task.date);
            const taskIsWithinWeek = isWithinInterval(taskDate, {
              start: startOfweek,
              end: addDays(startOfweek, daysInWeek - 1),
            });
            if (taskIsWithinWeek && i === taskDate.getDay() - 1) {
              return (
                <div className="Week-task" key={task.title}>
                  <h1>{task.title}</h1>
                  {task.isLarge && 
                  <p className="Week-task__description">{task.description}</p>}
                  <svg className={task.isLarge ? "Week-task__arrow" : "Week-task__arrow-top"}  viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <path
                      
                      fill="#0A0A30"
                      fillRule="evenodd"
                      stroke="#0A0A30"
                      strokeWidth="3"
                      d="M17.358 12.632a.714.714 0 01-.092 1.006l-4.276 3.564a.712.712 0 01-.933 0L7.78 13.638a.714.714 0 11.915-1.097l3.078 2.565V7.375a.75.75 0 011.5 0v7.73l3.079-2.564a.714.714 0 011.006.091z"
                      clipRule="evenodd"
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
      {!isOpen && <div className="Week-days">{days}</div>}
    </div>
  );
}

export default Week;
