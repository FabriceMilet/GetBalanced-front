import "./Week.scss";
import { startOfWeek, addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { useSelector, useDispatch } from "react-redux";
import { openModal, setDayOfWeek } from "../../../feature/task.slice";
import TaskModale from "../../TaskModale/TaskModale";


function Week() {

// faire une fonction qui indique le jour exacte où on a cliqué

// const hoy = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())
// console.log("hoy",hoy);

const dayOfWeek = useSelector((state) => state.task.dayOfWeek);
  const selectedDate = useSelector((state) => state.date.date);
  const tasks = useSelector((state) => state.task.tasks);
  console.log("tasks",tasks);

  //je veux récupérer la dernière tache ajoutée
  const lastTask = tasks[tasks.length-1]
  //je cherche à comparer la date obtenu dans l'input avec selectedDate
  lastTask ? 
  console.log("lastTask.date", lastTask.date.split('-').toString()) : console.log("")
const dateenformatyyymmdd = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(selectedDate)

console.log("dateenformatyyymmdd", dateenformatyyymmdd.split('/').toString());



  // console.log("selectedDate",selectedDate);
  const isOpen = useSelector((state) => state.task.isOpen);
  const dispatch = useDispatch();
  //on va gérer ici l'apparition de la modale des taches
  const handleClick = (event) => {
    dispatch(setDayOfWeek(Number(event.target.parentElement.parentElement.lastChild.getAttribute("datatype"))))
    dispatch(openModal());
  };
  
  console.log(`j'ai cliqué sur le ${dayOfWeek} jour de la semaine ${selectedDate}`);
  const startOfweek = startOfWeek(selectedDate, {
    weekStartsOn: 1,
    locale: fr,
  });
  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
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
        
        <div datatype={i} className={dayContainerClasses}>{i===dayOfWeek && lastTask ? lastTask.title : ''}</div>
        
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
