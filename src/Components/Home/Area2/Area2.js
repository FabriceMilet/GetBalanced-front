import './Area2.scss';
import équité from './équité.png'

export default function Area2() {

    return (
        <div className="area2_container">
            <div className="area2_top_container">
                <h2 className='area2_top_title'><span className='area2_title_anim'>Get Balanced</span> pour une répartition équitable des tâches</h2>
            </div>
            <div className="area2_bottom_container">
                <img className='area2_logo' src={équité} alt="logo d'illustration" />
                <p className='area2_bottom_paragraphe'>Get Balanced est votre allié pour une répartition équitable des tâches dans votre foyer. Vous êtes conscient de l'importance de partager les tâches ménagères équitablement pour éviter la surcharge mentale et les tensions inutiles. Avec notre application web, vous pouvez facilement partager les tâches ménagères de manière juste entre les membres de votre foyer.</p>
            </div>
        </div>
    );
};