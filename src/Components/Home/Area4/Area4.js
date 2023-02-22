import './Area4.scss';
import collaboration from './collaboration.png'

function Area4() {

    return (
        <div className="area4_container">
            <div className="area4_top_container">
                <h2 className='top_container_title'>Une collaboration facile grâce à <span className='animation'>Get Balanced</span></h2>
            </div>
            <div className="bottom_container">
                <img className='logoArea1' src={collaboration} alt="logo d'illustration" />
                <p className='area2_paragraphe'>Collaborer avec les membres de votre foyer est facile avec Get Balanced. Notre fonctionnalité de choix de tâche et de validation permet à chaque utilisateur de choisir une tâche et de la valider une fois terminée. Grâce à un système de couleur, vous pouvez rapidement visualiser la répartition des tâches déjà effectuées. La collaboration est une clé pour un foyer harmonieux et notre application vous aide à y parvenir.</p>
            </div>
        </div>
    );
}

export default Area4;

