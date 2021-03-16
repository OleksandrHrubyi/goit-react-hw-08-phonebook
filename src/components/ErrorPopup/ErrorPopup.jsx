import styles from "./errorPopup.module.css";
import PropTypes from "prop-types";

function ErrorPopup({ text }) {
  return (
    <div className={styles.popup}>
      <h1>{text}</h1>
    </div>
  );
}

ErrorPopup.propTypes = {
  text: PropTypes.string,
};

export default ErrorPopup;
