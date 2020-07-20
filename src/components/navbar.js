import React from "react";
import ToggleButton from "../components/toggleButton";
import firebase from "./firebase";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  let loggedClass = "logged";
  let loggedClass2 = "hide-items";

  return (
    <header className="navbar">
      <nav className="navbar_navigation">
        <div className="toggle">
          <ToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="navbar_logo">
          <a href="/">THE LOGO</a>
        </div>
        <div className="spacer"></div>
        <div className="navbar_navigation-items">
          <ul>
            <li
              className={firebase.getCurrentUserName() ? loggedClass : "hide"}
            >
              <a href="/login">Zaloguj się</a>
            </li>
            <li
              className={firebase.getCurrentUserName() ? loggedClass2 : "hide"}
            >
              <p>Witaj, {firebase.getCurrentUserName()}!</p>
            </li>
            <li
              className={firebase.getCurrentUserName() ? loggedClass2 : "show"}
            >
              <a href="/add-post">Dodaj ogłoszenie</a>
            </li>
            <li
              className={firebase.getCurrentUserName() ? loggedClass2 : "hide"}
            >
              <a href="/my-posts">Moje ogłoszenia</a>
            </li>
            <li
              className={firebase.getCurrentUserName() ? loggedClass2 : "hide"}
              onClick={logout}
            >
              <button>Wyloguj</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );

  async function logout() {
    await firebase.logout();
    props.history.replace("/");
  }
};

export default withRouter(Navbar);
