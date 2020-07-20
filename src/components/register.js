import React, { useState } from "react";
import "./register.css";
import firebase from "./firebase";
import { TextField, Button } from "@material-ui/core";

const Register = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const back = () => {
    props.history.push("/login");
  };
  return (
    <div className="flex-container-register">
      <div className="container-register">
        <div>
          <h1>Rejestracja</h1>
          <br />
        </div>

        <TextField
          id="outlined-password-input"
          label="Podaj imię"
          type="text"
          autoComplete="current-password"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <TextField
          id="outlined-password-input"
          label="Podaj email"
          type="email"
          autoComplete="current-password"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <TextField
          id="outlined-password-input"
          label="Podaj hasło"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={onRegister}
        >
          Zarejestruj
        </Button>
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={back}
        >
          Wróć
        </Button>
      </div>
    </div>
  );

  async function onRegister() {
    try {
      await firebase.register(name, email, password);
      props.history.replace("/login");
      alert("Pomyślnie założono użytkownika");
    } catch (error) {
      alert(error.message);
    }
  }
};

export default Register;
