import './Area2.scss';
import équité from './équité.png'

function Area2() {

    return (
        <div className="area2_container">
            <div className="top_container">
                <h2>Get Balanced pour une répartition équitable des tâches</h2>
            </div>
            <div className="bottom_container">
                <img className='logoArea1' src={équité} alt="logo d'illustration" />
                <p className='area2_paragraphe'>Get Balanced est votre allié pour une répartition équitable des tâches dans votre foyer. Vous êtes conscient de l'importance de partager les tâches ménagères équitablement pour éviter la surcharge mentale et les tensions inutiles. Avec notre application web, vous pouvez facilement partager les tâches ménagères de manière juste entre les membres de votre foyer.</p>
            </div>
        </div>
    );
}

export default Area2;