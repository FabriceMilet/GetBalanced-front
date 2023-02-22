import "./Table.scss";
import Week from "./Week/Week";
import WeekScroll from "./WeekScroll/WeekScroll";

function Table() {

  return (
    <div className="Table">
      <WeekScroll />
      <Week />
    </div>
  );
}

export default Table;
