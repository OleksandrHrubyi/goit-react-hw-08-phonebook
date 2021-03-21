import styles from "./home.module.css";
import Login from "../Login/Login";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Add your contacts</h1>
        <Login />
      </div>
    </div>
  );
}

export default Home;
