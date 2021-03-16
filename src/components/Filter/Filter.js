import PropTypes from "prop-types";
import styles from "../Filter/filter.module.css";
import { connect } from "react-redux";
import { filterContact } from "../../redux/Contacts/contactAction";
import { getFilterState } from "../../redux/Contacts/contacts-selectors";

const Filter = ({ value, onChange }) => {
  return (
    <label>
      <span className={styles.label}>Find contacts by name</span>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder="find name"
        onChange={onChange}
      ></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  value: getFilterState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) => dispatch(filterContact(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
