const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./CategoryRouter')
const CartRouter = require('./CartRouter')
const OrderRouter = require('./OrderRouter')
const RoleRouter = require('./RoleRouter')
const MessageRouter = require('./MessageRouter')
const routes = (app) => {
    app.use('/', UserRouter)
    app.use('/', ProductRouter)
    app.use('/', CategoryRouter)
    app.use('/', CartRouter)
    app.use('/', OrderRouter)
    app.use('/', RoleRouter)
    app.use('/', MessageRouter)
}
module.exports = routes
