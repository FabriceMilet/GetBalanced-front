import "./Table.scss";
import Week from "./Week/Week";
import WeekScroll from "./WeekScroll/WeekScroll";
import { useDispatch } from "react-redux";
import AddTask from "./AddTask/AddTask";
import Day from "./Day/Day";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setId } from "../../feature/planner.slice";
import { getTasks } from "../../feature/task.slice";

export default function Table() {
  const dispatch = useDispatch();
  // je récupère l'id du planning
  const { id } = useParams();
  useEffect(() => {
    dispatch(setId(id));
    dispatch(getTasks(id));
  }, [dispatch, id]);

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
};
