import axios from "axios";

axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com";

const path = "/contacts";

export const signupUser = (data) => {
  return axios.post("/users/signup", data).then((response) => response.data);
};

export const loginUserService = (data) => {
  return axios.post("/users/login", data).then((response) => response.data);
};

export const logOutUserService = (data) => {
  return axios.post("/users/logout");
};

export const refreshUserService = (data) => {
  return axios.get("/users/current");
};

export const getContacts = () => {
  return axios.get(path).then((response) => response.data);
};

export const uploadContacts = (contact) => {
  return axios.post(path, contact).then((response) => response.data);
};

export const removeContacts = (contactId) => {
  return axios.delete(`${path}/${contactId}`);
};
