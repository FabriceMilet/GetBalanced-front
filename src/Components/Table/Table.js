import "./Table.scss";
import Week from "./Week/Week";
import WeekScroll from "./WeekScroll/WeekScroll";
import { useSelector } from "react-redux";
import AddTask from "./AddTask/AddTask";
import Day from "./Day/Day";

function Table() {
  // pour test
  const userConnected = useSelector((state) => state.user.userConnected);
  console.log("userConnected from dashboard :", userConnected);
  return (
    <div className="Table">
      <div className="Table-header">
        <WeekScroll />
        <AddTask />
      </div>
      <div className="Table-container">
      <Week />
      <Day />
      </div>
    </div>
  );
}

export default Table;
