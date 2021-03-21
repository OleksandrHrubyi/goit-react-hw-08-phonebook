import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/User/userOperation";
import { getTokenState, getUserName } from "../../redux/User/userSelectors";
import styles from "./header.module.css";

function Header({ islogin, name, onLogout }) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <NavLink className={styles.link} to="/">
          Phonebook
        </NavLink>

        {islogin ? (
          <div className={styles.authname}>
            <span className={styles.name}>Welcome, {name}</span>
            <button
              type="button"
              onClick={onLogout}
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className={styles.nav}>
              <NavLink className={styles.login} to="/login">
                Login
              </NavLink>
              <NavLink className={styles.registration} to="/registr">
                Registration
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  islogin: getTokenState(state),
  name: getUserName(state),
});

const mapDispatchToProps = {
  onLogout: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
