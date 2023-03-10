import "./TaskModale.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, openModal, addTask } from "../../feature/task.slice";
import { useParams } from 'react-router-dom';

export default function TaskModale() {
  const { id } = useParams()
  // on va récup l'id en local
  // const [id, setId] = useState(null)

  // const id = useSelector((state) => state.parametre.id);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.task.formData);
  //on récupère la date du jour sur lequel on a cliqué pour ajouter une tâche
  const dateOfNewTask = useSelector((state) => state.task.dateOfNewTask);
  // console.log(dateOfNewTask);
  // const planners = useSelector((state) => state.parametre.planners);
  // on veut créer ici une nouvelle copie de l'objet formData avec la propriété
  // correspondant à la variable name et sa valeur associée
  const handleChange = (event) => {
    const { name, value } = event.target;
    // si la date n'est pas définie, on met la date sur laquelle on a cliqué (dateOfNewTask)
    dispatch(
      setFormData({
        ...formData,
        date: formData.date === "" ? dateOfNewTask : formData.date,
        [name]: value,
      })
    );
  };
  // on va chercher ici à faire apparaitre la tache dans le planning et l'enregitrer en BDD
  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log('formData', formData);
    dispatch(addTask({ formData, id })).then(() => {
      dispatch(setFormData({ name: "", description: "", date: "" }));
    });
    dispatch(openModal());
  };
  const handleCancel = () => {
    dispatch(openModal())
  }

  return (
    <div className="TaskModale-background">
      <div className="TaskModale">
        <h1 className="TaskModale-title">Ajouter une tâche</h1>
        <form className="TaskModale-form" onSubmit={handleSubmit}>
          <label htmlFor="titre" className="TaskModale-input">
            Titre
            <input
              type="text"
              name="name"
              placeholder="Faire la vaisselle"
              value={formData.name}
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

          <label htmlFor="date" className="TaskModale-input">
            Date
            <input
              type="date"
              name="date"
              // on gère ici le fait d'afficher la date du jour sur lequel on a cliqué
              value={!formData.date ? dateOfNewTask : formData.date}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="categorie" className="TaskModale-select">
            Thème de la tâche
          </label>
          <select
            className="TaskModale-select"
            name="category"
            onChange={handleChange}
          >
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
