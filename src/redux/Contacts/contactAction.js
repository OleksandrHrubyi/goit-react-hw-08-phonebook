import { createAction } from "@reduxjs/toolkit";

export const signupUserRequest = createAction("user/signup/Request");
export const signupUserSucces = createAction("user/signup/Succes");
export const signupUserError = createAction("user/signup/Error");

export const loginUserRequest = createAction("user/login/Request");
export const loginUserSucces = createAction("user/login/Succes");
export const loginUserError = createAction("user/login/Error");

export const logoutUserRequest = createAction("user/logout/Request");
export const logoutUserSucces = createAction("user/logout/Succes");
export const logoutUserError = createAction("user/logout/Error");

export const refreshUserRequest = createAction("user/refresh/Request");
export const refreshUserSucces = createAction("user/refresh/Succes");
export const refreshUserError = createAction("user/refresh/Error");

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
