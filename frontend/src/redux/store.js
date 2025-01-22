import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth/authSlice'
import productsReducer from './Products/productsSlice'
import cartsReducer from './Cart/cartsSlice'
import categoriesReducer from './Category/categoriesSlice'
import usersReducer from './User/usersSlice'
import rolesReducer from './Role/rolesSlice'
import reviewsReducer from './Review/reviewsSlice'
import vouchersReducer from './Voucher/vouchersSlice'
import notificationsReducer from './Notification/notificationsSlice'
import favoritesReducer from './Favorite/favoritesSlice'
import sizesReducer from './Size/sizesSlice'
import ordersReducer from './Order/ordersSlice'
import statussReducer from './Status/statusSlice'
export default configureStore({
  reducer: {
    auth : authReducer,
    products : productsReducer,
    carts : cartsReducer,
    categories : categoriesReducer,
    users : usersReducer,
    roles : rolesReducer,
    reviews : reviewsReducer,
    vouchers : vouchersReducer,
    notifications : notificationsReducer,
    favorites : favoritesReducer,
    sizes : sizesReducer,
    orders : ordersReducer,
    statuss : statussReducer
  }
})