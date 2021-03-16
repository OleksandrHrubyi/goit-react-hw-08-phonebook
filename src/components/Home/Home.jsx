import { NavLink, withRouter } from "react-router-dom";
import styles from "./home.module.css";
import Login from "../Login/Login";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* <NavLink to="/login" className={styles.nav}>
        Login
      </NavLink> */}
        <h1 className={styles.title}>Add your contacts</h1>
        <Login />

        {/* <NavLink to="/registr" className={styles.nav}>
        Registration
      </NavLink> */}
      </div>
    </div>
  );
}

export default withRouter(Home);
