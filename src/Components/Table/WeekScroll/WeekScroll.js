import "./WeekScroll.scss";
import { startOfWeek, format, addWeeks, subWeeks } from "date-fns";
import { fr } from "date-fns/locale";
import { setDateToMore, setDateToLess } from "../../../feature/date.slice";
import { useDispatch, useSelector } from "react-redux";

function WeekScroll() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.date.date);
  const handleDateChangeToMore = () => {
    dispatch(setDateToMore(addWeeks(selectedDate, 1).getTime()));
  };
  const handleDateChangeToless = () => {
    dispatch(setDateToLess(subWeeks(selectedDate, 1).getTime()));
  };

  return (
    <div className="WeekScroll">
      <span
        className="WeekScroll-less"
        onClick={handleDateChangeToless}
        value={selectedDate}
      >
      <svg viewBox="0 0 32 32" width="24" height="24">
          <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
        </svg>
       
      </span>
      <div className="WeekScroll-week">
        <span>Semaine du</span>
        {format(
          startOfWeek(selectedDate, { weekStartsOn: 1, locale: fr }),
          "PPPP",
          { locale: fr }
        )}
      </div>
      <span
        className="WeekScroll-more"
        onClick={handleDateChangeToMore}
        value={selectedDate}
      >
        <svg viewBox="0 0 32 32" width="24" height="24">
          <path
            d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
          ></path>
        </svg>
        
      </span>
    </div>
  );
}

export default WeekScroll;
