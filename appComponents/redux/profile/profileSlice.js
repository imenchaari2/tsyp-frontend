import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    user: null,
    token: null,
    flowCompleted:false
  },
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.profile = {
        token: action.payload.token,
        user: { ...state.profile.user,...removeElement(action.payload,"token" )},
      };
      
    },
    logout(state) {
      state.profile =  {
        user: null,
        token: null,
        flowCompleted:false
      };
    },
    saveUserInfo(state, action) {
     // console.log(action.payload);
      state.profile.user ={
        ...state.profile.user,
        ...action.payload

      };
      },
      setflowCompleted(state) {
        state.profile.flowCompleted = true;
      }
  },
});

export const { login, logout,saveUserInfo,setflowCompleted } = profileSlice.actions;
export default profileSlice.reducer;

//function that remove element from object
function removeElement(obj, key) {
  return Object.keys(obj)
    .filter((k) => k !== key)
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
    }, {});
}
