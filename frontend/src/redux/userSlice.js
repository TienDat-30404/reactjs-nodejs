import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuthenticated: false,
    userData: null,
    dataCart : null
}
export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess : (state, action) => {
        state.isAuthenticated = true
        state.userData = action.payload
    },
    setCartRedux : (state, action) => {
      state.isAuthenticated = true;
      state.dataCart = action.payload
    },

    logoutSuccess : (state) => {
        state.isAuthenticated = false
        state.userData = null
        state.dataCart = null
    }
  }
})

export const { loginSuccess, logoutSuccess, setCartRedux} = userSlice.actions

export default userSlice.reducer