import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  signupUserSucces,
  signupUserError,
  loginUserSucces,
  loginUserError,
  logoutUserSucces,
  logoutUserError,
  refreshUserSucces,
  refreshUserError,
  refreshUserRequest,
} from "./userAction";
import {
  addContactsSucces,
  getContactsSucces,
} from "../Contacts/contactAction";

const initialUserState = {
  name: null,
  email: null,
};

const user = createReducer(initialUserState, {
  [signupUserSucces]: (_, { payload }) => payload.user,
  [loginUserSucces]: (_, { payload }) => payload.user,
  [logoutUserSucces]: () => initialUserState,
  [refreshUserSucces]: (_, { payload }) => payload,
});

const token = createReducer(null, {
  [signupUserSucces]: (_, { payload }) => payload.token,
  [loginUserSucces]: (_, { payload }) => payload.token,
  [logoutUserSucces]: () => null,
});

const error = createReducer(null, {
  [signupUserError]: (_, { payload }) => payload,
  [loginUserError]: (_, { payload }) => payload,
  [logoutUserError]: (_, { payload }) => payload,
  [refreshUserError]: (_, { payload }) => payload,
});

const isLogin = createReducer(false, {
  [refreshUserSucces]: () => true,
  [addContactsSucces]: () => true,
  [getContactsSucces]: () => true,
  [signupUserSucces]: () => true,
  [loginUserSucces]: () => true,
  [refreshUserRequest]: () => true,
  [logoutUserSucces]: () => false,
  [loginUserError]: () => false,
  [signupUserError]: () => false,
});

const userReducer = combineReducers({
  user,
  token,
  error,
  isLogin,
});

export default userReducer;
