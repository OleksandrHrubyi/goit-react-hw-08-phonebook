import React, { useState, useEffect } from "react";
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

function PhonebookForm({ getContacts, onSubmit, sameContact }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [errorSameName, setErrorSameName] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorNumber, setErrorNumber] = useState(false);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const reset = () => {
    setName("");
    setNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setErrorName(true);
      setTimeout(() => {
        setErrorName(false);
      }, 3000);
      return;
    }

    if (number.length === 0) {
      setErrorNumber(true);
      setTimeout(() => {
        setErrorNumber(false);
      }, 3000);
      return;
    }

    const result = sameContact.find((el) => el.name === name);

    if (result) {
      setErrorSameName(true);
      setTimeout(() => {
        setErrorSameName(false);
      }, 3000);
      return;
    }

    onSubmit({ name, number });
    return reset();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;

      default:
        console.log("No such type of data");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          {" "}
          <span className={styles.name}>Name</span>
          <input
            className={styles.input}
            name="name"
            type="text"
            value={name}
            placeholder="enter name"
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn btn-success">
          Add contact
        </button>
      </form>
      <CSSTransition
        in={errorName}
        unmountOnExit
        timeout={3000}
        classNames={styles}
      >
        <ErrorPopup text="Please enter name" />
      </CSSTransition>
      <CSSTransition
        in={errorNumber}
        unmountOnExit
        timeout={3000}
        classNames={styles}
      >
        <ErrorPopup text="Please enter number" />
      </CSSTransition>

      <CSSTransition
        in={errorSameName}
        timeout={250}
        classNames={styles}
        unmountOnExit
      >
        <ErrorPopup text="this contact already exists " />
      </CSSTransition>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sameContact: getAllContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value) => dispatch(addContactsOperation(value)),
  getContacts: () => dispatch(getContactsOperation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookForm);
