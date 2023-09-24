import { useNavigate, Link} from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useEffect, useState, useContext} from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [])

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return(
    <header>
      <div className="header-container">
        <Link to="/" className="logo">Bloguetown</Link>
        <nav>
          {/* <Profile/>
          <LoginButton/>
          <LogoutButton/> */}
          {username && (
            <>
              <Link className='button-4' to="/create">Create new post</Link>
              <a className='button-4' onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link className="button-4" to="/login">Login</Link>
            </>
          )}
          {/* <Link className="button-4">Register</Link> */}
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