import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { registerUser } from "../../redux/Contacts/contactsOperations";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { CSSTransition } from "react-transition-group";
import styles from "./registr.module.css";

class Registr extends React.Component {
  state = {
    name: "",
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
   
    if (this.state.name && this.state.email && this.state.password) {
      this.props.onSubmit(this.state);
      console.log(this.state);
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
      name: "",
      email: "",
      password: "",
    });
  };

  render() {
    const { name, email, password, error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
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
          <ErrorPopup text="Please enter name, email, password!" />
        </CSSTransition>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

// const mapStateToProps = (state) => ({

// })

const mapDispatchToProps = {
  onSubmit: registerUser,
};

export default connect(null, mapDispatchToProps)(Registr);
