import UserRouter from './UserRouter.js';
import ProductRouter from './ProductRouter.js';
import CategoryRouter from './CategoryRouter.js';
import CartRouter from './CartRouter.js';
import OrderRouter from './OrderRouter.js';
import RoleRouter from './RoleRouter.js';
import MessageRouter from './MessageRouter.js';
import AccountRouter from './AccountRouter.js';
import SizeRouter from './SizeRouter.js';
import DiscountRouter from './DiscountRouter.js';
import ReviewRouter from './ReviewRouter.js';
import VoucherRouter from './VoucherRouter.js';
import NotificationRouter from './NotificationRouter.js';
import FavoriteRouter from './FavoriteRouter.js';
import PaymentRouter from './PaymentRouter.js';
import StatusRouter from './StatusRouter.js'
import PaymentMethodRouter from './PaymentMethodRouter.js'
const routes = (app) => {
    app.use('/', UserRouter)
    app.use('/', ProductRouter)
    app.use('/', CategoryRouter)
    app.use('/', CartRouter)
    app.use('/', OrderRouter)
    app.use('/', RoleRouter)
    app.use('/', MessageRouter)
    app.use('/', AccountRouter)
    app.use('/', SizeRouter)
    app.use('/', DiscountRouter)
    app.use('/', ReviewRouter)
    app.use('/', VoucherRouter)
    app.use('/', NotificationRouter)
    app.use('/', FavoriteRouter)
    app.use('/', PaymentRouter)
    app.use('/', StatusRouter)
    app.use('/', PaymentMethodRouter)
}
export default routes
