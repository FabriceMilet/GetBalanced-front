import './Area3.scss';
import organisation from './organisation.png'

export default function Area3() {

    return (
        <div className="area3_container">
            <div className="area3_top_container">
                <h2 className='area3_top_title'>Organisez votre foyer avec <span className='area3_title_anim'>Get Balanced</span></h2>
            </div>
            <div className="area3_bottom_container">
                <p className='area3_bottom_paragraphe'>Get Balanced est une application web conçue pour vous aider à mieux organiser les tâches ménagères de votre foyer. Avec notre interface conviviale, vous pouvez facilement organiser les tâches de chaque jour de la semaine, les assigner aux membres du foyer et les modifier à tout moment. Chaque utilisateur peut créer un foyer et inviter d'autres membres pour une organisation optimale. La planification des tâches ménagères n'a jamais été aussi simple.</p>
                <img className='area3_logo' src={organisation} alt="logo d'illustration" />
            </div>
        </div>
    );
};