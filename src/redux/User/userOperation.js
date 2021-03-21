import axios from "axios";
import { alert } from "@pnotify/core";
import { defaultModules } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";

import {
  signupUser,
  loginUserService,
  logOutUserService,
  refreshUserService,
} from "../../service";

import {
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
} from "./userAction";

defaultModules.set(PNotifyMobile, {});

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
