import React, {useState} from 'react';
import './login.css';
import firebase from './firebase';
import {withRouter} from 'react-router-dom';
import Navbar from './navbar';
import Backdrop from './backdrop';
import SideDrawer from './sideMenu';
import {TextField, Button} from '@material-ui/core';

const LoginPage = props => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  const [isMenuOpen, setIsMenuOpen] = useState (false);

  let sideDrawer;
  let backdrop;

  if (isMenuOpen) {
    sideDrawer = <SideDrawer />;
    backdrop = <Backdrop click={() => setIsMenuOpen (!isMenuOpen)} />;
  }
  const register = () => {
    props.history.push ('/register');
  };
  return (
    <div className="flex-container-login">
      <Navbar drawerClickHandler={() => setIsMenuOpen (!isMenuOpen)} />
      {sideDrawer}
      {backdrop}
      <div className="container-login">
        <h1>Zaloguj się do swojego konta</h1>
        <br />
        <TextField
          id="outlined-password-input"
          label="Podaj email"
          type="email"
          autoComplete="current-password"
          variant="outlined"
          value={email}
          onChange={e => setEmail (e.target.value)}
        />
        <br />
        <TextField
          id="outlined-password-input"
          label="Hasło"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={e => setPassword (e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={login}
        >
          Zaloguj się
        </Button>
        <br />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={register}
        >
          Zarejestruj się
        </Button>
      </div>
    </div>
  );

  async function login () {
    try {
      await firebase.login (email, password);
      props.history.replace ('/');
    } catch (error) {
      alert (error.message);
    }
  }
};

export default withRouter (LoginPage);
