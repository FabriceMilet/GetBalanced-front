import "./Week.scss";
import { startOfWeek, addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../feature/task.slice";
import TaskModale from "../../TaskModale/TaskModale";

function Week() {
  const selectedDate = useSelector((state) => state.date.date);
  const isOpen = useSelector((state) => state.task.isOpen);
  const dispatch = useDispatch();
  //on va gérer ici l'apparition de la modale des taches
  const handleClick = () => {
    dispatch(openModal());
  };

  const startOfweek = startOfWeek(selectedDate, {
    weekStartsOn: 1,
    locale: fr,
  });
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const daysInWeek = 7;
  const days = [];

  for (let i = 0; i < daysInWeek; i++) {
    const day = addDays(startOfweek, i);
    const formattedDay = format(day, "d");

 // J'ajoute la classe 'Week-dayContainer-last' pour le dernier élément de la boucle pour lui enlever sa bordure
 const isLast = i === daysInWeek - 1;
 const dayContainerClasses = `Week-dayContainer ${isLast ? 'Week-dayContainer-last' : ''}`;


    days.push(
      <div className="Week-day" key={i}>
        <div className="Week-dayName">
          <span>{daysOfWeek[i]}</span>
          {formattedDay}
          <button onClick={handleClick} className="Week-button"> + </button>
        </div>
        
        <div className={dayContainerClasses}></div>
        
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
