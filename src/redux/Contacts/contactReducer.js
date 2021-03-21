import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  filterContact,
  addContactsSucces,
  deleteContactSucces,
  getContactsSucces,
} from "./contactAction";

const itemReducer = createReducer([], {
  [addContactsSucces]: (state, { payload }) => [...state, payload],
  [getContactsSucces]: (_, { payload }) => payload,
  [deleteContactSucces]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer("", {
  [filterContact]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items: itemReducer,
  filter: filterReducer,
});

export default contactsReducer;
