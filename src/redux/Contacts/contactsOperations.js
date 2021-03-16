import axios from "axios";
import { alert, defaultModules } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import { defaults } from "@pnotify/core";

import {
  uploadContacts,
  getContacts,
  removeContacts,
  signupUser,
  loginUserService,
  logOutUserService,
  refreshUserService,
} from "../../service";
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
  signupUserRequest,
  signupUserSucces,
  signupUserError,
  loginUserRequest,
  loginUserSucces,
  loginUserError,
  logoutUserRequest,
  logoutUserSucces,
  logoutUserError,
  refreshUserRequest,
  refreshUserSucces,
  refreshUserError,
} from "./contactAction";
defaultModules.set(PNotifyMobile, {});

const { v4: uuidv4 } = require("uuid");

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const registerUser = (value) => async (dispatch) => {
  dispatch(signupUserRequest());

  try {
    const response = await signupUser(value);

    token.set(response.token);
    dispatch(signupUserSucces(response));
  } catch (error) {
    dispatch(signupUserError(error.message));

    alert({
      text: error,
    });
  }
};

export const loginUser = (value) => async (dispatch) => {
  dispatch(loginUserRequest());

  try {
    const response = await loginUserService(value);
    token.set(response.token);

    dispatch(loginUserSucces(response));
  } catch (error) {
    dispatch(loginUserError(error.message));

    alert({
      text: error,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutUserRequest());

  try {
    await logOutUserService();
    token.unset();
    dispatch(logoutUserSucces());
  } catch (error) {
    dispatch(logoutUserError(error.message));
    alert({
      text: error,
    });
  }
};

export const refreshUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(refreshUserRequest());

  try {
    const response = await refreshUserService();
    dispatch(refreshUserSucces(response.data));
  } catch (error) {
    dispatch(refreshUserError(error.message));
    alert({
      text: error,
    });
  }
};

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

export const getContactsOperation = (value) => (dispatch) => {
  dispatch(getContactsRequest());
  getContacts()
    .then((response) => dispatch(getContactsSucces(response)))
    .catch((error) => dispatch(getContactsError(error)));
};

export const deleteContactOperation = (id) => (dispatch) => {
  dispatch(deleteContactRequest());
  removeContacts(id)
    .then((response) => dispatch(deleteContactSucces(id)))
    .catch((error) => dispatch(deleteContactError(error)));
};
