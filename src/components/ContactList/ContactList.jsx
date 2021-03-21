import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "../ContactList/contactList.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { deleteContactOperation } from "../../redux/Contacts/contactsOperations";
import { getVisibleContacts } from "../../redux/Contacts/contactsSelectors";

function Card({ arr, onDel }) {
  return (
    <div className={styles.container}>
      <TransitionGroup component="ul">
        {arr.map(({ id, name, number }) => {
          return (
            <CSSTransition key={id} timeout={3000} classNames={styles}>
              <li className={styles.item}>
                <h3 className={styles.name}>{name} </h3>
                <a className={styles.number} href="tel:{number}">
                  {number}
                </a>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onDel(id);
                  }}
                  type="button"
                >
                  delite
                </button>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}

Card.propTypes = {
  arr: PropTypes.array.isRequired,
  onDel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  arr: getVisibleContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDel: (id) => dispatch(deleteContactOperation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
