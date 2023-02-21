import './Area1.scss';
import laundryLogo from './laundry.png'

function Area1() {
  return (
    <div className="area1_container">
      <div className="left_container">
        <div className='title_container'>
          <h1 className="area1_title">Get</h1>
          <h1 className="area1_title">Balanced.</h1>
        </div>
        <p className='left_container_paragraphe'>Le nouvel outil pour diviser
          équitablement les tâches du
          quotidien entre les membres de
          votre foyer</p>
      </div>
      <div className="right_container">
        <img className='laundry_logo' src={laundryLogo} alt="machine à laver" />
      </div>
    </div>
  );
}

export default Area1;
