import "./Table.scss";
import Week from "./Week/Week";
import WeekScroll from "./WeekScroll/WeekScroll";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./AddTask/AddTask";
import Day from "./Day/Day";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setId } from "../../feature/parametre.slice";
import { getTasks } from "../../feature/task.slice";

function Table() {
  const dispatch = useDispatch();
  // const tasks = useSelector((state) => state.task.tasks);
   // on récupère les tâches liées au planning
//    const tasks = useSelector((state) =>
//    state.task.tasks.map((task) => ({ ...task }))
//  );
  // je récupère l'id du planning
  const { id } = useParams();
  useEffect(() => {
    dispatch(setId(id));
    dispatch(getTasks(id));
  }, []);

  // const userConnected = useSelector((state) => state.user.userConnected);
  // console.log("userConnected from table :", userConnected);
  
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
