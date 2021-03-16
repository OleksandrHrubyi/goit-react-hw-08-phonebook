import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import PhonebookForm from "../PhonebookForm/PhonebookForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";

import filterStyles from "./main.module.css";
import { getAllContacts } from "../../redux/Contacts/contacts-selectors";

function Main({ contacts }) {
  return (
    <>
      <PhonebookForm />

      <CSSTransition
        in={contacts.length > 0}
        classNames={filterStyles}
        timeout={250}
        unmountOnExit
      >
        <div>
          {" "}
          <h2>Contacts</h2>
          <Filter />
        </div>
      </CSSTransition>

      <ContactList />
    </>
  );
}
const mapStateToProps = (state) => ({
  contacts: getAllContacts(state),
});

export default connect(mapStateToProps, null)(Main);
