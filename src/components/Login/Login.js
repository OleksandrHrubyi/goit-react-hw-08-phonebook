import React from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { loginUser } from "../../redux/User/userOperation";
import { getErrorMessage } from "../../redux/User/userSelectors";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./login.module.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    if (email && password) {
      this.props.onLogin(this.state);

      this.reset();

      return;
    }
    this.errorPopup(2000);
  };

  errorPopup = (time) => {
    this.setState({
      error: true,
    });
    setTimeout(() => {
      this.setState({
        error: false,
      });
    }, time);
  };

  reset = () => {
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    const { email, error, password } = this.state;
    return (
      <Form className={styles.form} onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <CSSTransition
          in={error}
          unmountOnExit
          timeout={3000}
          classNames={styles}
        >
          <ErrorPopup text={"Please enter email, password!"} />
        </CSSTransition>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getErrorMessage(state),
});

const mapDispatchToProps = {
  onLogin: loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
