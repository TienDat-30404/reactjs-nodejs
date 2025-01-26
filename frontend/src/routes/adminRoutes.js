import NotFoundPage from "../pages/NotFoundPage";
import User from '../pages/Admin/Right/User/User'
import DashBoard from "../pages/Admin/Right/DashBoard";
import Product from "../pages/Admin/Right/Product/Product";
import Order from "../pages/Admin/Right/Order/Order";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import Category from "../pages/Admin/Right/Category/Category";
import Supplier from "../pages/Admin/Right/Supplier/Supplier";
import Receipt from "../pages/Admin/Right/Receipt/Receipt";
export const adminRoutes = [

    {path: '*', page: NotFoundPage, layout : AdminLayout},

    {path: '/admin', page: Product, layout : AdminLayout},


    {path: '/admin/dashboard', page: DashBoard, layout : AdminLayout},

    {path: '/admin/user', page: User, layout : AdminLayout},

    {path: '/admin/product', page: Product,layout : AdminLayout},

    {path: '/admin/order', page: Order, layout : AdminLayout},
    {path : '/admin/category', page : Category, layout : AdminLayout},
    {path : '/admin/supplier', page : Supplier, layout : AdminLayout},
    {path : '/admin/receipt', page : Receipt, layout : AdminLayout}
]
