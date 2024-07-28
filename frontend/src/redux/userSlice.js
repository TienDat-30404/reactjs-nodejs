import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuthenticated: false,
    userData: null
}
export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess : (state, action) => {
        state.isAuthenticated = true
        state.userData = action.payload
    },
    logoutSuccess : (state) => {
        state.isAuthenticated = false
        state.userData = null
    }
  }
})

export const { loginSuccess, logoutSuccess } = userSlice.actions

export default userSlice.reducer