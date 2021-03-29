import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { loginUser } from "../../redux/User/userOperation";
import { getErrorMessage } from "../../redux/User/userSelectors";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./login.module.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const errorPopup = (time) => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, time);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        return console.log("No such type of data");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      onLogin({ email, password, error });
      reset();
      return;
    }
    errorPopup(2000);
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
      </Form.Group>
      <CSSTransition
        in={error}
        unmountOnExit
        timeout={3000}
        classNames={styles}
      >
        <ErrorPopup text={"Please enter email or password!"} />
      </CSSTransition>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  error: getErrorMessage(state),
});

const mapDispatchToProps = {
  onLogin: loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
