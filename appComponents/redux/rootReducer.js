import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import profileSlice from "./profile/profileSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  //name of reducer to store

  //liste to persist
  whitelist: [ "profileSlice"],
};
const rootReducer = combineReducers({

  profileSlice: profileSlice,

});

export default persistReducer(persistConfig, rootReducer);
