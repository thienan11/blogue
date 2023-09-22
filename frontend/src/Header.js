import { useNavigate, Link} from 'react-router-dom';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

const Header = () => {

  return(
    <header>
      <div className="header-container">
        <Link to="/" className="logo">Bloguetown</Link>
        <nav>
          <Profile/>
          <LoginButton/>
          <LogoutButton/>
        </nav>
      </div>

      {/* <Link to="/" className="logo">Bloguetown</Link>
      <nav>
        <Link className="button-4" to="/login">Login</Link>
        <Link className="button-4">Register</Link>
      </nav> */}

    </header>
  );
}

export default Header;