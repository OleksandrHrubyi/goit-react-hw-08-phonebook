import { createSelector } from "reselect";

export const getAllContacts = (state) => state.contacts.items;
export const getFilterState = (state) => state.contacts.filter;
export const getUserName = (state) => state.auth.user.name;
export const getTokenState = (state) => state.auth.isLogin;
export const getErrorMessage = (state) => state.auth.error;

export const getVisibleContacts = createSelector(
  [getAllContacts, getFilterState],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter((el) =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
