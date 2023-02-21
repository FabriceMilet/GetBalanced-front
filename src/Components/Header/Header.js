import './Header.scss';
import logoGetBalanced from "./test.svg"

function Header() {

  return (
    <div className='header_container'>
      <header className='header'>
      <img className='logoGetBalanced' src={logoGetBalanced} alt="" />
        <nav className='header_nav'>
          <h4 className='header_nav-link animate'>Créer un compte</h4>
          <h4 className='header_nav-link animate'>Me connecter</h4>
        </nav>
      </header>
    </div>

  );
}

export default Header;