import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    notificationState : true,
    notificationList: [],
  
  },

};
const notificationSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setNotificationState(state) {
      state.notification.notificationState = !state.notification.notificationState;
    },
    addToNotificationList(state,action) {
      state.notification.notificationList.push(action.payload);
    },
    


  },
});

export const { addToNotificationList,setNotificationState} = notificationSlice.actions;
export default notificationSlice.reducer;
