import { uploadContacts, getContacts, removeContacts } from "../../service";
import {
  addContactsRequest,
  addContactsSucces,
  addContactsError,
  getContactsRequest,
  getContactsSucces,
  getContactsError,
  deleteContactRequest,
  deleteContactSucces,
  deleteContactError,
} from "./contactAction";

const { v4: uuidv4 } = require("uuid");

export const addContactsOperation = (value) => (dispatch) => {
  const user = {
    id: uuidv4(),
    name: value.name,
    number: value.number,
  };

  dispatch(addContactsRequest());
  uploadContacts(user)
    .then((response) => dispatch(addContactsSucces(response)))
    .catch((error) => dispatch(addContactsError(error)));
};

export const getContactsOperation = (_) => (dispatch) => {
  dispatch(getContactsRequest());
  getContacts()
    .then((response) => dispatch(getContactsSucces(response)))
    .catch((error) => dispatch(getContactsError(error)));
};

export const deleteContactOperation = (id) => (dispatch) => {
  dispatch(deleteContactRequest());
  removeContacts(id)
    .then(() => dispatch(deleteContactSucces(id)))
    .catch((error) => dispatch(deleteContactError(error)));
};
