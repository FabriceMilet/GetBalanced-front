import "./Week.scss";
import { startOfWeek, addDays, format, isWithinInterval } from "date-fns";
import { fr } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../feature/task.slice";
import TaskModale from "../../TaskModale/TaskModale";

function Week() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.task.isOpen);
  const selectedDate = useSelector((state) => state.date.date);
  const tasks = useSelector((state) => state.task.tasks);

  const startOfweek = startOfWeek(selectedDate, {
    weekStartsOn: 1,
    locale: fr,
  });

  //on va gérer ici l'apparition de la modale des taches
  const handleClick = () => {
    dispatch(openModal());
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
            if (taskIsWithinWeek && i === taskDate.getDay()-1) {
              return <div className="Week-task" key={task.title}><h1>{task.title}</h1><p>{task.description}</p></div>;
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
