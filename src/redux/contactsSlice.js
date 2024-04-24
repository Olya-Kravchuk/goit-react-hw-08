import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";
import { INITIAL_STATE } from "./contacts";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE.contacts,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
  // reducers: {
  //     addContact(state, action) {
  //         state.items.push(action.payload);
  //     },
  //     deleteContact(state, action) {
  //         const contactIndex = state.items.findIndex(contact => contact.id === action.payload);
  //         state.items.splice(contactIndex, 1);
  //     },
  // },
});
export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
// export const selectContacts = state => state.contacts.items;
// export const {addContact, deleteContact, } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

