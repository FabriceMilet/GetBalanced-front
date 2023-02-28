import './Profile.scss'
import avatar from "./avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { editUser, deleteUser } from "../../feature/users.slice";
import ValidModal from './ValidModal/validModal';


export default function Profile() {

  const dispatch = useDispatch();
  // State de gestion d'ouverture de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Je récupère les données de l'utilisateur et les mets en value
  const userConnected = useSelector((state) => state.user.userConnected);
  const { firstname, lastname, email } = userConnected;

  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputColor = useRef();
  const inputBirthdate = useRef();

  const color = "#EE5622";

  // Fonction appelé au submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const editFormData = {
      id: userConnected.id,
      firstname: inputFirstName.current.value,
      lastname: inputLastName.current.value,
      email: inputEmail.current.value,
      color: inputColor.current.value,
      birth: inputBirthdate.current.value
    }
    dispatch(editUser(editFormData))
  }


  const handleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser({}))
  }


  return (
    <>
      <div className='profile_container'>

        <header className="profile_header">
          <img src={avatar} alt="logo avatar" className="profile_avatar" />
          <h3 className="profile_username">{firstname} {lastname}</h3>
        </header>

        <form className='profile_form' onSubmit={handleSubmit}>

          <div className='profile_input_container'>
            <label htmlFor="firstName">Prénom:</label>
            <input className='profile_input'
              type="text"
              id="firstName"
              defaultValue={firstname}
              ref={inputFirstName}
            />
          </div>

          <div className='profile_input_container'>
            <label htmlFor="lastName">Nom:</label>
            <input className='profile_input'
              type="text"
              id="lastName"
              defaultValue={lastname}
              ref={inputLastName}
            />
          </div>

          <div className='profile_input_container'>
            <label htmlFor="email">E-mail:</label>
            <input className='profile_input'
              type="email"
              id="email"
              defaultValue={email}
              ref={inputEmail}
            />
          </div>

          <div className='profile_input_container'>
            <label htmlFor="color">Couleur préférée:</label>
            <input className='profile_input'
              type="color"
              id="color"
              defaultValue={color}
              ref={inputColor}
            />
          </div>

          <div className='profile_input_container'>
            <label htmlFor="birthdate">Date de naissance:</label>
            <input className='profile_input'
              type="date"
              id="birthdate"
              ref={inputBirthdate}
            />
          </div>
          <button className='profile_button_submit' type="submit">Enregistrer</button>
        </form>
        <h4 onClick={handleModal} className='logout_button'>Supprimer son compte</h4>
      </div>
      {isModalOpen && <ValidModal handleModal={handleModal} handleDelete={handleDelete} />}
    </>
  )
}