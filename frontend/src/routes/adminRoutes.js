import NotFoundPage from "../pages/NotFoundPage";
import User from '../pages/Admin/Right/User/User'
import DashBoard from "../pages/Admin/Right/DashBoard";
import Product from "../pages/Admin/Right/Product/Product";
import Order from "../pages/Admin/Right/Order/Order";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
export const adminRoutes = [

    {path: '*', page: NotFoundPage, layout : AdminLayout},

    {path: '/admin', page: Product, layout : AdminLayout},


    {path: '/admin/dashboard', page: DashBoard, layout : AdminLayout},

    {path: '/admin/user', page: User, layout : AdminLayout},

    {path: '/admin/product', page: Product,layout : AdminLayout},

    {path: '/admin/order', page: Order, layout : AdminLayout},
]
