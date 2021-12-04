import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null

};
const dataSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
   pushAllData: (state, action) => {
      state.data = action.payload;
    },
    removeAllData: (state) => {
      state.data = null;
    }



  },
});

export const { pushAllData,removeAllData } = dataSlice.actions;
export default dataSlice.reducer;
