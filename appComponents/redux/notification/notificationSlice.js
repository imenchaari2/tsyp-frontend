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
      state.notification.notificationList = eliminateRedundancy(state.notification.notificationList);

    },
    


  },
});

const eliminateRedundancy = (list) => {
  if (list === undefined) {
    return [];
  }
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (!result.some((item) => item.data.id === list[i].data.id)) {
      result.push(list[i]);
    }
  }
  return result;
};


export const { addToNotificationList,setNotificationState} = notificationSlice.actions;
export default notificationSlice.reducer;
