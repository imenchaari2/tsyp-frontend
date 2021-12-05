import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    notificationState: true,
    notificationList: [],
    clearDate: null,
    notificationRecieved:0
  },
};
const notificationSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setNotificationState(state) {
      state.notification.notificationState =
        !state.notification.notificationState;
    },
    addToNotificationList(state, action) {
      // state.notification.notificationList.push(action.payload);
      state.notification.notificationList = action.payload;
    },
    clearNotificationList(state) {
      const date = new Date();
      state.notification.clearDate = date;
      state.notification.notificationList = [];
    },
    updateNotificationRecieved(state){
      state.notification.notificationRecieved += 1;
    }
  },
});

export const { addToNotificationList, setNotificationState,clearNotificationList,updateNotificationRecieved } =
  notificationSlice.actions;
export default notificationSlice.reducer;
