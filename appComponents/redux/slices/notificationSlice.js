import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = !state.value
        },


    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = notificationSlice.actions

export default notificationSlice.reducer
