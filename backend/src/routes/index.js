const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./CategoryRouter')
const CartRouter = require('./CartRouter')
const BillRouter = require('./BillRouter')
const RoleRouter = require('./RoleRouter')
const routes = (app) => {
    app.use('/', UserRouter)
    app.use('/', ProductRouter)
    app.use('/', CategoryRouter)
    app.use('/', CartRouter)
    app.use('/', BillRouter)
    app.use('/', RoleRouter)
}
module.exports = routes
