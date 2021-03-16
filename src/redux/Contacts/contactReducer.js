import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  filterContact,
  addContactsSucces,
  deleteContactSucces,
  getContactsSucces,
  signupUserSucces,
  signupUserError,
  loginUserSucces,
  loginUserError,
  logoutUserSucces,
  logoutUserError,
  refreshUserSucces,
  refreshUserError,
  refreshUserRequest,
} from "./contactAction";

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

const itemReducer = createReducer([], {
  [addContactsSucces]: (state, { payload }) => [...state, payload],
  [getContactsSucces]: (_, { payload }) => payload,
  [deleteContactSucces]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer("", {
  [filterContact]: (_, { payload }) => payload,
});

const userReducer = combineReducers({
  user,
  token,
  error,
  isLogin,
});

const contactsReducer = combineReducers({
  items: itemReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: "token",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: persistedReducer,
});

export default rootReducer;
