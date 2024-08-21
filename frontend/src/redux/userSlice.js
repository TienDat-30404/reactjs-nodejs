import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isAuthenticated: false,
    userData: null,
    dataCart: {
      carts: [],
      length: 0
  }
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
      state.dataCart = {
        carts: action.payload.carts,
        length: action.payload.length
    };
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

export const { loginSuccess, logoutSuccess, setCartRedux, resetCartRedux} = userSlice.actions

export default userSlice.reducer