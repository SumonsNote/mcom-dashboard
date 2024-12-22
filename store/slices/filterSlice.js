import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "all",
  search: "",
  sort: "relevance",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.filter = action.payload;
    },

    addSearch: (state, action) => {
      state.search = action.payload?.toLowerCase();
    },

    addSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { addFilter, addSearch, addSort } = filterSlice.actions;
