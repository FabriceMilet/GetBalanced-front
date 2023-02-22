import "./TaskModale.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, openModal, addTask} from "../../feature/task.slice";

export default function TaskModale() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.task.formData);
  // const planners = useSelector((state) => state.parametre.planners);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
// on va chercher ici à faire apparaitre le tableau dans le dashboard et l'enregitrer en BDD
const handleSubmit = (event) => {
  event.preventDefault();
//   dispatch(addPlanner(formData)).then(() => {
//     dispatch(setFormData({ title: "", description: "", invitation: "" }))});
dispatch(setFormData({ title: "", description: ""}))
  dispatch(openModal());
};

  return (
    <div className="TaskModale">
      <h1 className="TaskModale-title">Ajouter une tâche</h1>
      <form className="TaskModale-form" onSubmit={handleSubmit}>
        <label htmlFor="titre" className="TaskModale-input">
          Titre
          <input
            type="text"
            name="title"
            placeholder="Faire la vaisselle"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description" className="TaskModale-input">
          Description
          <input
            type="text"
            name="description"
            placeholder="Prévoir de racheter du liquide vaisselle"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="TaskModale-button">
          Valider
        </button>
      </form>
    </div>
  );
}


