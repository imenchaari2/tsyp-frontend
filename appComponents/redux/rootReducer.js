import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import credentialsSlice from "./credentials/credentialsSlice";
import dataSlice from "./data/dataSlice";
import notificationSlice from "./notification/notificationSlice";
import profileSlice from "./profile/profileSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  //name of reducer to store

  //liste to persist
  whitelist: ["profileSlice", "notificationSlice","credentialSlice", "dataSlice"],
};
const rootReducer = combineReducers({
  profileSlice: profileSlice,
  notificationSlice: notificationSlice,
  dataSlice: dataSlice,
  credentialSlice:credentialsSlice
});

export default persistReducer(persistConfig, rootReducer);
