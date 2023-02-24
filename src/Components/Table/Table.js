import "./Table.scss";
import Week from "./Week/Week";
import WeekScroll from "./WeekScroll/WeekScroll";
import { useSelector } from "react-redux";

function Table() {
  // pour test
  const userConnected = useSelector((state) => state.user.userConnected);
  console.log('from dashboard :', userConnected);
  return (
    <div className="Table">
      <WeekScroll />
      <Week />
    </div>
  );
}

export default Table;
