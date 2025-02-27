import NotFoundPage from "../pages/NotFoundPage";
import User from '../pages/Admin/Right/User/User'
import Product from "../pages/Admin/Right/Product/Product";
import Order from "../pages/Admin/Right/Order/Order";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import Category from "../pages/Admin/Right/Category/Category";
import Supplier from "../pages/Admin/Right/Supplier/Supplier";
import Receipt from "../pages/Admin/Right/Receipt/Receipt";
import Discount from "../pages/Admin/Right/Discount/Discount";
import Attribute from "../pages/Admin/Right/Attribute/Attribute";
import Voucher from "../pages/Admin/Right/Voucher/Voucher";
import Notification from "../pages/Admin/Right/Notification/Notification";
import Review from "../pages/Admin/Right/Review/Review";
import Role from "../pages/Admin/Right/Role/Role";
import DashBoard from "../pages/Admin/Right/DashBoard/DashBoard";
export const adminRoutes = [

    {path: '*', page: NotFoundPage, layout : AdminLayout},

    {path: '/admin', page: Product, layout : AdminLayout},


    {path: '/admin/dashboard', page: DashBoard, layout : AdminLayout},

    {path: '/admin/user', page: User, layout : AdminLayout},

    {path: '/admin/product', page: Product,layout : AdminLayout},

    {path: '/admin/order', page: Order, layout : AdminLayout},
    {path : '/admin/category', page : Category, layout : AdminLayout},
    {path : '/admin/supplier', page : Supplier, layout : AdminLayout},
    {path : '/admin/receipt', page : Receipt, layout : AdminLayout},
    {path : '/admin/discount', page : Discount, layout : AdminLayout},
    {path : '/admin/attribute', page : Attribute, layout : AdminLayout},
    {path : '/admin/voucher', page : Voucher, layout : AdminLayout},
    {path : '/admin/notification', page : Notification, layout : AdminLayout},
    {path : '/admin/review', page : Review, layout : AdminLayout},
    {path : '/admin/role', page : Role, layout : AdminLayout}
]
