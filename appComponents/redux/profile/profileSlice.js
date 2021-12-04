import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    notification : false,
    notificationList: [],
    user:null
  },

};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setNotificationState(state) {
      state.profile.notification = !state.profile.notification;
    },
    addToNotificationList(state,action) {
      state.profile.notificationList.push(action);
    },
    login(state,action) {
      state.profile.user = action;
      
    },
    logout(state) {
      state.profile.user = null;
    }


  },
});

export const { addToNotificationList,setNotificationState,login,logout } = profileSlice.actions;
export default profileSlice.reducer;
