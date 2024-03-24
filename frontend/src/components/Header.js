import { useNavigate, Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("https://bloguetown-api.vercel.app/profile", { // http://localhost:4000/profile
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("https://bloguetown-api.vercel.app/logout", { // http://localhost:4000/logout
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo">
          {/* <img src="/blogue_final.svg" alt="Bloguetown Logo"/> */}
          Bloguetown
        </Link>
        <nav>
          {/* <Profile/>
          <LoginButton/>
          <LogoutButton/> */}
          {username && (
            <>
              <Link className="button-4" to="/create">
                Create new post
              </Link>
              <a className="button-4" onClick={logout}>
                Logout
              </a>
            </>
          )}
          {!username && (
            <>
              <Link className="button-4" to="/login">
                Login
              </Link>
              <Link className="button-4" to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;