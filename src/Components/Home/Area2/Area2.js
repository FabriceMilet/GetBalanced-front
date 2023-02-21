import './Area2.scss';
import area1Logo from './logoArea1.svg'

function Area2() {

    return (
        <div className="area2_container">
            <div className="top_container">
                <h2>blablabla blablabla blablablabla... blabla</h2>
            </div>
            <div className="bottom_container">
                <img className='logoArea1' src={area1Logo} alt="logo d'illustration" />
                <p className='area2_paragraphe'>lorem jdgonfobn dog jtoigh og idog oird dgiog do jrdoi jdfog
                    gdl gndro gjdo rdgogi gjdiog dijog doig jrdio gdl gdogdr ogdr
                    vjiod vrdoi jdfio jgird</p>
            </div>
        </div>
    );
}

export default Area2;