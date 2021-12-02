import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

export const Store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
});
export const useAppDispatch = () => useDispatch();
export const persistor = persistStore(Store);

export default { Store, persistor };
