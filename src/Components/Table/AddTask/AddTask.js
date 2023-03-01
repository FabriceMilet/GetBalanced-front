import "./AddTask.scss";
import { useDispatch } from "react-redux";
import { openModal } from "../../../feature/task.slice";

function AddTask() {
  const dispatch = useDispatch();
  const handleClick = (event) => {
    dispatch(openModal());
  };
  return (
    <div className="AddTask">
      <button onClick={handleClick} className="AddTask-button">
        Ajouter une tâche
      </button>
    </div>
  );
}

export default AddTask;
