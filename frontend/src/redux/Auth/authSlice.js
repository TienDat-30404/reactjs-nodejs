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
    },

    updateProfile : (state, action) => {
      state.userData.dataLogin = {
        ...state.userData,
        name : action.payload.name,
        address : action.payload.address,
        phone : action.payload.phone,
        date_of_birth : action.payload.date_of_birth,
        sex : action.payload.sex
      }
    }
  }
})

export const { loginSuccess, logoutSuccess, resetCartRedux, updateProfile} = authSlice.actions

export default authSlice.reducer