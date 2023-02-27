import "./TaskModifyModale.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  openModifyModal,
  modifyTask,
} from "../../feature/task.slice";

export default function TaskModifyModale() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.task.formData);
  const tasks = useSelector((state) => state.task.tasks);
  // const hoy = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date())
  // console.log("hoy", hoy);
  // const planners = useSelector((state) => state.parametre.planners);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  // on va chercher ici à faire apparaitre la tache dans le planning et l'enregitrer en BDD
  const handleSubmit = (event) => {
    event.preventDefault();
    // je vais devoir récupérer la tâche à modifier
    // peut-être faire un useRef ? TODO !!
    // const taskId = event.target.dataset.checkbox;
    // en attendant je mets ca seulement pour tester
    const task = tasks[0]
    dispatch(modifyTask(task)).then(() => {
      dispatch(setFormData({ title: "", description: "", date: "" }));
    });
    dispatch(openModifyModal());
  };

  return (
    <div className="TaskModale">
      <h1 className="TaskModale-title">Modifier une tâche</h1>
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

        {/* on ajoutera ce champ quand on fera un bouton supplémentaire non lié à la date
        où on pourra choisir la date */}

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
          {" "}
          Thème de la tâche</label>
          <select className="TaskModale-select" name="category">
            <option value="">Choississez un thème</option>
            <option value="Ménage ">Ménage </option>
            <option value="Cuisine">Cuisine</option>
            <option value="Travaux extérieurs">Travaux extérieurs</option>
            <option value="Bricolage">Bricolage</option>
            <option value="Animaux">Animaux</option>
            <option value="Enfants">Enfants</option>
            <option value="Administratif">Administratif</option>
            <option value="Courses ">Courses </option>
            <option value="Autre">Autre</option>
          </select>
        

        <button type="submit" className="TaskModale-button">
          Valider
        </button>
      </form>
    </div>
  );
}
