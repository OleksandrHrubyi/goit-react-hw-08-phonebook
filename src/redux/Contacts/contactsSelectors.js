import { createSelector } from "reselect";

export const getAllContacts = (state) => state.contacts.items;
export const getFilterState = (state) => state.contacts.filter;

export const getVisibleContacts = createSelector(
  [getAllContacts, getFilterState],
  (items, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter((el) =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
