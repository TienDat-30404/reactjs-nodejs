import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuthenticated: false,
    userData: null,
    dataCart: {
      carts: [],
      length: 0
  }
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess : (state, action) => {
        state.isAuthenticated = true
        state.userData = action.payload
    },
  

    resetCartRedux : (state, action) => {
      state.isAuthenticated = true;
      state.dataCart = null
    },

    logoutSuccess : (state) => {
        state.isAuthenticated = false
        state.userData = null
        state.dataCart = null
    }
  }
})

export const { loginSuccess, logoutSuccess, resetCartRedux} = authSlice.actions

export default authSlice.reducer