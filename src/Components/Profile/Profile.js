import './Profile.scss'

export default function Profile() {
  return (
    <div className='profile_container'>
      <header className="profile_header">
        <img src="" alt="" />
        <h3></h3>
      </header>
      <form className='form_container'>
        <div>
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            value="prenom"
          />
        </div>
        <div>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            value="nom"
          />
        </div>
        <div>
          <label htmlFor="dateNaissance">Date de naissance :</label>
          <input
            type="date"
            id="dateNaissance"
            value="dateDeNaissance"
          />
        </div>
        <div>
          <label htmlFor="email">E-mail :</label>
          <input
            type="email"
            id="email"
            value="email"
          />
        </div>
        <div>
          <label htmlFor="motDePasse">Mot de passe :</label>
          <input
            type="password"
            id="motDePasse"
            value="motdepasse"
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  )
}
