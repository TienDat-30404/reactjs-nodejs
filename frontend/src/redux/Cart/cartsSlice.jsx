import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page: 1,
  totalPage: 1,
  totalProductInCart: 1,
  carts: [],
  limit: 2,
  isLoading: true
}

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    initDataCart: (state, action) => {
      state.page = action.payload.page
      state.totalPage = action.payload.totalPage
      state.totalProductInCart = action.payload.totalProductInCart
      state.carts = action.payload.carts
      state.limit = action.payload.limit
      state.isLoading = false
    },

    switchPage: (state, action) => {
      state.page = action.payload
    },

    updateQuantity : (state, action) => {
      const newQuantity = action.payload.quantity
      console.log(newQuantity)
      console.log(action.payload)
      const cartIndex = state.carts.findIndex(cart => cart._id === action.payload._id)
      console.log(cartIndex)
      if(cartIndex != -1)
      {
        state.carts[cartIndex] = {
          ...state.carts[cartIndex],
          quantity : newQuantity
        }
      }
    },

    deleteCartRedux : (state, action) => {
      const id = action.payload._id
      const existCart = state.carts.find(cart => cart._id === id)
      if(existCart)
      {
        state.carts = state.carts.filter(cart => cart._id !== id)
      }
    }, 

    addCartRedux : (state, action) => {
      state.carts.push(action.payload.cart)
      state.totalProductInCart = action.payload.totalProductInCart
    }
  }
})

export const { initDataCart, switchPage, updateQuantity, deleteCartRedux , addCartRedux} = cartsSlice.actions
export default cartsSlice.reducer