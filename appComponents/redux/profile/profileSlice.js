import { createSlice } from "@reduxjs/toolkit";

// {
//     name:'652165496',
//     phone:'5621652',
// email : '',
// }
const initialState = {
  profile: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    //state el 9dima
    //action
    pushAllprofile(state, action) {
      state.profile = action.payload;
    },
    removeAllprofile(state) {
      state.profile = null;
    },
    
  },
});

export const { pushAllprofile, removeAllprofile } = profileSlice.actions;
export default profileSlice.reducer;
