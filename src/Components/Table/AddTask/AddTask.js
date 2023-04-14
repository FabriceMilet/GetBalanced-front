import "./AddTask.scss";
import { useDispatch } from "react-redux";
import { openModal } from "../../../feature/task.slice";

export default function AddTask() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal());
  };
  return (
    <div className="AddTask">
      <button onClick={handleClick} className="AddTask-button">
        Ajouter une tâche
      </button>
    </div>
  );
};
