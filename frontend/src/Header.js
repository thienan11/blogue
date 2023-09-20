import { useNavigate, Link} from 'react-router-dom';

export default function Header(){
  // const navigate = useNavigate(); // Get the navigate function

  // const handleLoginClick = () => {
  //   // Navigate to the "/login" route when the "Login" button is clicked
  //   navigate('/login');
  // };

  return(
    <header>
      <div className="header-container">
        <Link to="/" className="logo">Bloguetown</Link>
        <nav>
          <Link className="button-4" to="/login">Login</Link>
          <Link className="button-4">Register</Link>
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