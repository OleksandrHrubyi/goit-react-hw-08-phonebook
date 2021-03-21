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
