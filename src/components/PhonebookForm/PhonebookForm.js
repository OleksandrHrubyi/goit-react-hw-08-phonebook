import React from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import {
  addContactsOperation,
  getContactsOperation,
} from "../../redux/Contacts/contactsOperations";
import { getAllContacts } from "../../redux/Contacts/contactsSelectors";
import styles from "../PhonebookForm/phonebookForm.module.css";

const { v4: uuidv4 } = require("uuid");

class PhonebookForm extends React.Component {
  state = {
    name: "",
    number: "",
    errorSameName: false,
    errorName: false,
    errorNumber: false,
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  componentDidMount() {
    this.props.getContacts();
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name.length === 0) {
      this.setState({ errorName: true });
      setTimeout(() => {
        this.setState({ errorName: false });
      }, 3000);
      return;
    }

    if (this.state.number.length === 0) {
      this.setState({ errorNumber: true });
      setTimeout(() => {
        this.setState({ errorNumber: false });
      }, 3000);
      return;
    }

    const result = this.props.sameContact.find(
      (el) => el.name === this.state.name
    );

    if (result) {
      this.setState({ errorSameName: true });
      setTimeout(() => {
        this.setState({ errorSameName: false });
      }, 3000);
      return;
    }

    this.props.onSubmit(this.state);
    return this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            {" "}
            <span className={styles.name}>Name</span>
            <input
              className={styles.input}
              name="name"
              type="text"
              value={name}
              placeholder="enter name"
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.label}>
            {" "}
            <span className={styles.number}>Number</span>
            <input
              className={styles.input}
              name="number"
              type="number"
              value={number}
              placeholder="enter number"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className="btn btn-success">
            Add contact
          </button>
        </form>
        <CSSTransition
          in={this.state.errorName}
          unmountOnExit
          timeout={3000}
          classNames={styles}
        >
          <ErrorPopup text="Please enter name" />
        </CSSTransition>
        <CSSTransition
          in={this.state.errorNumber}
          unmountOnExit
          timeout={3000}
          classNames={styles}
        >
          <ErrorPopup text="Please enter number" />
        </CSSTransition>

        <CSSTransition
          in={this.state.errorSameName}
          timeout={250}
          classNames={styles}
          unmountOnExit
        >
          <ErrorPopup text="this contact already exists " />
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sameContact: getAllContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value) => dispatch(addContactsOperation(value)),
  getContacts: () => dispatch(getContactsOperation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookForm);
