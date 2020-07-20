import React from "react";
import "./sideMenu.css";
import firebase from "./firebase";
import { withRouter } from "react-router-dom";

const sideDrawer = (props) => {
  let invitation = "";
  let loggedClass = "logged";
  let displayLogin = "";
  if (firebase.getCurrentUserName()) {
    invitation = "Cześć, " + firebase.getCurrentUserName();
    loggedClass = "";
    displayLogin = "logged";
  }
  return (
    <nav className="side-drawer">
      <ul>
        <li className={loggedClass}>
          <p>{invitation}</p>
        </li>
        <li>
          <a href="/">Moje ogłoszenia</a>
        </li>
        <li>
          <a href="/add-post">Dodaj ogłoszenie</a>
        </li>
        <li className={displayLogin}>
          <a href="/login">Zaloguj się</a>
        </li>
        <li className={loggedClass} onClick={logout}>
          <p>Wyloguj się</p>
        </li>
      </ul>
    </nav>
  );
  async function logout() {
    await firebase.logout();
    props.history.replace("/");
  }
};

export default withRouter(sideDrawer);
