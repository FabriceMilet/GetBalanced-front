import './Profile.scss'
import avatar from "./avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editUser, deleteUser } from "../../feature/users.slice";
import ValidModal from './ValidModal/validModal';
import ColorsModal from './ColorsModal/ColorsModal';


export default function Profile() {

  // Je récupère les données de l'utilisateur et les mets en value
  const userConnected = useSelector((state) => state.user.userConnected);
  // State de gestion du choix de couleur
  const [chosenColor, setChosenColor] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State de gestion d'ouverture de la modal de validation
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State de gestion d'ouverture de la modal de choix de couleur
  const [isColorsModalOpen, setIsColorsModalOpen] = useState(false);

  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputBirthdate = useRef();

  // Fonction appelé au submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const editFormData = {
      firstname: inputFirstName.current.value,
      lastname: inputLastName.current.value,
      email: inputEmail.current.value,
      color: chosenColor,
      birthdate: inputBirthdate.current.value,
    }
    const id = userConnected.user.id
    // je cherche à créer un nouvel objet avec seulement les paires clé-valeurs modifiées
    const updatedFormData = {}
    for (const [key, value] of Object.entries(editFormData)) {
      if (value !== userConnected.user[key] && value !== '') {
        updatedFormData[key] = value;
      }
    }
    dispatch(editUser({ updatedFormData, id }))
  }

  const handleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser(userConnected.user.id))
    navigate('/')
  }

  const handleColors = () => {
    if (isColorsModalOpen) {
      setIsColorsModalOpen(false);
    } else {
      setIsColorsModalOpen(true);
    }
  }

  const colorFunc = (color) => {
    setChosenColor(color)
    setIsColorsModalOpen(false);
  }

  return (
    <>
      <div className='profile_container'>

        <header className="profile_header">
          <img src={avatar} alt="logo avatar" className="profile_avatar" />
          {userConnected.user && <h3 className="profile_username">{userConnected.user.firstname} {userConnected.user.lastname}</h3>}
        </header>
        {userConnected.user &&
          <form className='profile_form' onSubmit={handleSubmit}>

            <div className='profile_input_container'>
              <label htmlFor="firstName">Prénom : </label>
              <input className='profile_input'
                type="text"
                id="firstName"
                defaultValue={userConnected.user.firstname}
                ref={inputFirstName}
              />
            </div>

            <div className='profile_input_container'>
              <label htmlFor="lastName">Nom : </label>
              <input className='profile_input'
                type="text"
                id="lastName"
                defaultValue={userConnected.user.lastname}
                ref={inputLastName}
              />
            </div>

            <div className='profile_input_container'>
              <label htmlFor="email">E-mail : </label>
              <input className='profile_input'
                type="email"
                id="email"
                defaultValue={userConnected.user.email}
                ref={inputEmail}
              />
            </div>

            <div className='profile_input_container'>
              <label htmlFor="color">Couleur : </label>
              <button
                style={{ backgroundColor: `` }}
                type="button" onClick={handleColors} id='color'
                className='profile_input colors_button'>
                changer sa couleur</button>
              {isColorsModalOpen && <ColorsModal colorFunc={colorFunc} />}
            </div>

            <div className='profile_input_container'>
              <label className='' htmlFor="birthdate">Date de <br /> naissance : </label>
              <input className='profile_input'
                type="date"
                id="birthdate"
                ref={inputBirthdate}
              />
            </div>
            <button className='profile_button_submit' type="submit">Enregistrer</button>
          </form>
        }
        <h4 onClick={handleModal} className='logout_button'>Supprimer son compte</h4>

      </div>
      {isModalOpen && <ValidModal handleModal={handleModal} handleDelete={handleDelete} />}
    </>
  )
}