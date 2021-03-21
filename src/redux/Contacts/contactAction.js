import { createAction } from "@reduxjs/toolkit";

export const addContactsRequest = createAction("contact/add/Request");
export const addContactsSucces = createAction("contact/add/Succes");
export const addContactsError = createAction("contact/add/Error");

export const getContactsRequest = createAction("contact/get/Request");
export const getContactsSucces = createAction("contact/get/Succes");
export const getContactsError = createAction("contact/get/Error");

export const deleteContactRequest = createAction("contact/delete/Request");
export const deleteContactSucces = createAction("contact/delete/Succes");
export const deleteContactError = createAction("contact/delete/Error");

export const filterContact = createAction("contact/filter");
