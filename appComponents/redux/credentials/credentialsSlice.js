import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  remember:false

};
const credentialsSlice = createSlice({
  name: "credentials",
  initialState: initialState,
  reducers: {
   rememberCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.remember = action.payload.remember;
    },
    forgetCredentials: (state) => {
      state.password = "";
      state.email = "";
    }



  },
});

export const { rememberCredentials,forgetCredentials } = credentialsSlice.actions;
export default credentialsSlice.reducer;
