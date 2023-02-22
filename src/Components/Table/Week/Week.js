import "./Week.scss";
import { startOfWeek, addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { useSelector } from "react-redux";

function Week() {
  const selectedDate = useSelector((state) => state.date.date);
  
  const startOfweek = startOfWeek(selectedDate, {
    weekStartsOn: 1,
    locale: fr,
  });
  console.log(startOfweek);
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const daysInWeek = 7;
  const days = [];

  for (let i = 0; i < daysInWeek; i++) {
    const day = addDays(startOfweek, i);
    const formattedDay = format(day, "d");
    days.push(
      <div className="Week-day" key={i}>
        <div className="Week-dayName">
          <span>{daysOfWeek[i]}</span>
          {formattedDay}
          <button className="Week-button"> + </button>
        </div>
      </div>
    );
  }

  return (
    <div className="Week">
      <div className="Week-days">{days}</div>
    </div>
  );
}

export default Week;
