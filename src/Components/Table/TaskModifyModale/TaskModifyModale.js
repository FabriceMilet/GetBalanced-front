import "./TaskModifyModale.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  openModifyModal,
  modifyTask,
} from "../../../feature/task.slice";

export default function TaskModifyModale() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.task.formData);
  const task = useSelector((state) => state.task.taskToModify);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  // on va chercher ici à faire apparaitre la tache dans le planning et l'enregitrer en BDD
  const handleSubmit = (event) => {
    event.preventDefault();
    // je cherche à créer un nouvel objet avec seulement les paires clé-valeurs modifiées
    const updatedTask ={}
    for (const [key, value] of Object.entries(formData)) {
      if (value !== task[key] && value !== '') {
        updatedTask[key] = value;
      }
    }
    const id = task.id
    console.log('updatedTask',updatedTask);
    // j'envoie un objet avec deux propriétés car j'en aurai besoin dans mon createAsyncThunk
    dispatch(modifyTask({updatedTask, id})).then(() => {
      dispatch(setFormData({ name: "", description: "", date: "" }))});
    dispatch(openModifyModal());
  };
  const handleCancel = () => {
    dispatch(openModifyModal())
  }

  return (
    <div className="TaskModale-background">
    <div className="TaskModale">
      <h1 className="TaskModale-title">Modifier une tâche</h1>
      <form className="TaskModale-form" onSubmit={handleSubmit}>
        <label htmlFor="titre" className="TaskModale-input">
          Titre
          <input
            type="text"
            name="name"
            placeholder="Faire la vaisselle"
            value={formData.name}
            onChange={handleChange}
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

        <label htmlFor="date" className="TaskModale-input">
          Date
          <input
            type="date"
            name="date"
            placeholder="23/02/2023"
            value={formData.date}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="categorie" className="TaskModale-select">
          Thème de la tâche</label>
          <select className="TaskModale-select" name="category" onChange={handleChange}>
            <option value="">Choississez un thème</option>
            <option value="Ménage">Ménage </option>
            <option value="Cuisine">Cuisine</option>
            <option value="Travaux extérieurs">Travaux extérieurs</option>
            <option value="Bricolage">Bricolage</option>
            <option value="Animaux">Animaux</option>
            <option value="Enfants">Enfants</option>
            <option value="Administratif">Administratif</option>
            <option value="Courses">Courses </option>
            <option value="Autre">Autre</option>
          </select>
          <div className="TaskModale-buttons">
        <button type="submit" className="TaskModale-button">
          Valider
        </button>
        <button onClick={handleCancel} className="TaskModale-button">
          X
        </button>
        </div>
      </form>
    </div>
    </div>
  );
}
