import React, { useState } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { registerUser } from "../../redux/User/userOperation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import styles from "./registr.module.css";

function Registr({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const errorPopup = (time) => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, time);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("No such type of data");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password) {
      onSubmit({ name, email, password });
      reset();
      return;
    }
    errorPopup(2000);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
        <ErrorPopup text="Please enter name, email, password!" />
      </CSSTransition>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const mapDispatchToProps = {
  onSubmit: registerUser,
};

export default connect(null, mapDispatchToProps)(Registr);
