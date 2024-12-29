import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/authSlice'
import productsReducer from './Products/productsSlice'
import cartsReducer from './Cart/cartsSlice'
import categoriesReducer from './Category/categoriesSlice'
import usersReducer from './User/usersSlice'
import rolesReducer from './Role/rolesSlice'
import reviewsReducer from './Review/reviewsSlice'
export default configureStore({
  reducer: {
    auth : authReducer,
    products : productsReducer,
    carts : cartsReducer,
    categories : categoriesReducer,
    users : usersReducer,
    roles : rolesReducer,
    reviews : reviewsReducer
  }
})