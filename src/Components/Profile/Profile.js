import './Profile.scss'
import avatar from "./avatar.png"

export default function Profile() {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit OK")
  }

  return (
    <div className='profile_container'>

      <header className="profile_header">
        <img src={avatar} alt="logo avatar" className="profile_avatar" />
        <h3 className="profile_username">Killian Mbappé</h3>
      </header>

      <form className='profile_form' onSubmit={handleSubmit}>

        <div className='profile_input_container'>
          <label htmlFor="firstName">Prénom:</label>
          <input className='profile_input'
            type="text"
            id="firstName"
            value="prenom"
          />
        </div>

        <div className='profile_input_container'>
          <label htmlFor="lastName">Nom:</label>
          <input className='profile_input'
            type="text"
            id="lastName"
            value="nom"
          />
        </div>

        <div className='profile_input_container'>
          <label htmlFor="dateOfBirth">Date de naissance:</label>
          <input className='profile_input'
            type="date"
            id="dateOfBirth"
            value="date de naissance"
          />
        </div>

        <div className='profile_input_container'>
          <label htmlFor="email">E-mail:</label>
          <input className='profile_input'
            type="email"
            id="email"
            value="email"
          />
        </div>

        <div className='profile_input_container'>
          <label htmlFor="password">Mot de passe:</label>
          <input className='profile_input'
            type="password"
            id="password"
            value="mot de passe"
          />
        </div>

        <button className='profile_button_submit' type="submit">Enregistrer</button>

      </form>

    </div>
  )
}
