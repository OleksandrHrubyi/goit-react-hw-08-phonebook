import styles from "./header.module.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/Contacts/contactsOperations";

import {
  getTokenState,
  getUserName,
} from "../../redux/Contacts/contacts-selectors";

function Header({ children, token, name, onLogout }) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <NavLink className={styles.link} to="/">
          Phonebook
        </NavLink>

        {token ? (
          <div className={styles.authname}>
            <span className={styles.name}>Welcome, {name}</span>
            <button type="button" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className={styles.nav}>
              <NavLink className={styles.login} to="/login">
                Login
              </NavLink>
              <NavLink to="/registr">Registration</NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: getTokenState(state),
  name: getUserName(state),
});

const mapDispatchToProps = {
  onLogout: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
