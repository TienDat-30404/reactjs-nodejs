import Body from "../pages/Content/Body";
import NotFoundPage from "../pages/NotFoundPage";
import Detail from "../pages/DetailProduct/DetailProduct";
import Login from "../pages/Login/Login";
import ProfileUser from "../pages/ProfileUser/ProfileUser";
import CategoryByProduct from "../pages/Content/Right/CategoryByProduct/CategoryByProduct";
import Cart from "../pages/Cart/Cart";
import Search from "../pages/Search/Search";
import Payment from "../pages/Payment/Payment.";
import Admin from "../pages/Admin/Admin";
import User from '../pages/Admin/Right/User/User'
import DashBoard from "../pages/Admin/Right/DashBoard";
import Product from "../pages/Admin/Right/Product/Product";
import Order from "../pages/Admin/Right/Order/Order";

// tesst 
import { Cart_cnpm } from "../Test/Cart";
import { Detail_cnpm } from "../Test/Detail";

export const routes = [
    {
        path: '/',
        page: Body,
        isShowHeader: true,
        isShowProduct: true,
        isShowBody: true,
        isPageUser : true,
    },
    {
        path: '/detail/:_id',
        page: Detail,
        isShowHeader: true,
        isPageUser : true,
    },
    {
        path: '*',
        page: NotFoundPage,
        isPageUser : true,
    },
    {
        path: 'login',
        page: Login,
        isPageUser : true,
    },
    {
        path: '/profile-user',
        page: ProfileUser,
        isShowHeader: true,
        isPageUser : true,
    },
    {
        path: '/category/:_id',
        page: CategoryByProduct,
        isShowHeader: true,
        isShowProduct: false,
        isShowBody: true,
        isPageUser : true,
    },
    {
        path: '/search',
        page: Search,
        isShowHeader: true,
        isPageUser : true,
    },
    {
        path: '/cart/:idUser',
        page: Cart,
        isShowHeader: true,
        isPageUser : true,
    },
    {
        path: '/payment',
        page: Payment,
        isShowHeader: false,
        isPageUser : true,
    },
    {
        path: '/admin',
        page: Admin,
    },
    {
        path : '/admin/dashboard',
        page : DashBoard,
        isShowLeftAdmin : true
    },
    {
        path: '/admin/user',
        page: User,
        isShowLeftAdmin: true
    },
    {
        path : '/admin/product',
        page : Product,
        isShowLeftAdmin : true
    },
    {
        path : '/test/detail_product',
        page : Detail_cnpm,
        isShowHeader : true,
        isPageUser : true
    }, 
    {
        path : '/test/cart',
        page : Cart_cnpm,
        isShowHeader : true,
        isPageUser : true
    },
    {
        path : '/admin/order',
        page : Order,
        isShowLeftAdmin : true
    },
]
