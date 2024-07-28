import { configureStore } from '@reduxjs/toolkit'
import counterReducer154 from './counterSlice'
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    counter123: counterReducer154,
    auth : userReducer
  }
})