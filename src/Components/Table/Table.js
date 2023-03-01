import "./Table.scss";
import Week from "./Week/Week";
import WeekScroll from "./WeekScroll/WeekScroll";
import { useSelector } from "react-redux";
import AddTask from "./AddTask/AddTask";

function Table() {
  // pour test
  const userConnected = useSelector((state) => state.user.userConnected);
  console.log("from dashboard :", userConnected);
  return (
    <div className="Table">
      <div className="Table-header">
        <WeekScroll />
        <AddTask />
      </div>
      <Week />
    </div>
  );
}

export default Table;
