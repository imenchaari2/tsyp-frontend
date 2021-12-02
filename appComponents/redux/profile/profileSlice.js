import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    notification : false,
    notificationList: []
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

  },
});

export const { addToNotificationList,setNotificationState } = profileSlice.actions;
export default profileSlice.reducer;
