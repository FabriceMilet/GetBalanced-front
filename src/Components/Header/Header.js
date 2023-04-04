import "./Header.scss";
import logoGetBalanced from "./test.svg";
import avatar from "./avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../feature/user.slice";
<<<<<<< HEAD
import Cookies from 'js-cookie';
=======
>>>>>>> dev

export default function Header() {
  const dispatch = useDispatch();
  // On récupère les données sur l'utilisateur :
  const isLogged = useSelector((state) => state.user.isLogged);
  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(userLogout());
  };

  return (
    <header className="header-container">
      <Link to="/">
        <img className="logoGetBalanced" src={logoGetBalanced} alt="" />
      </Link>
      {/* vérifie si l'utilisateur est connecté, et affiche une nav ou une autre */}
      {!isLogged ? (
        <nav className="header_nav">
          <Link to="/signup">
            <h4 className="header_nav-link animate">Créer un compte</h4>
          </Link>
          <Link to="/login">
            <h4 className="header_nav-link animate">Me connecter</h4>
          </Link>
        </nav>
      ) : (
        <nav className="header_nav">
          <Link to="/user">
            <img className="header_nav_logo" src={avatar} alt="logo profile" />
          </Link>
          <Link to="/dashboard">
            <h4 className="header_nav-link animate dc">Mes plannings</h4>
          </Link>
          <Link to="/">
            <h4 onClick={handleLogout} className="header_nav-link animate dc">
              Me déconnecter
            </h4>
          </Link>
        </nav>
      )}
    </header>
  );
}
