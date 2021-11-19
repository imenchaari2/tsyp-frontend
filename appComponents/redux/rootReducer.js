import { combineReducers } from '@reduxjs/toolkit'
import notificationSlice from './slices/notificationSlice'
const rootReducer = combineReducers({
    notificationSlice: notificationSlice
})


export default rootReducer
