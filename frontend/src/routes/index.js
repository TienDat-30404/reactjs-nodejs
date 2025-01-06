import Body from "../pages/Content/Body";
import NotFoundPage from "../pages/NotFoundPage";
import Detail from "../pages/DetailProduct/DetailProduct";
import Login from "../pages/Login/Login";
import CategoryByProduct from "../pages/Content/Right/CategoryByProduct/CategoryByProduct";
import Cart from "../pages/Cart/Cart";
import Search from "../pages/Search/Search";
import Payment from "../pages/Payment/Payment.";
import Admin from "../pages/Admin/Admin";
import User from '../pages/Admin/Right/User/User'
import DashBoard from "../pages/Admin/Right/DashBoard";
import Product from "../pages/Admin/Right/Product/Product";
import Order from "../pages/Admin/Right/Order/Order";

export const routes = [
    // {
    //     path: '/',
    //     page: Body,
    //     isShowHeader: true,
    //     isShowProduct: true,
    //     isShowBody: true,
    //     isPageUser : true,
    // },
    // {
    //     path: '/detail/:_id',
    //     page: Detail,
    //     isShowHeader: true,
    //     isPageUser : true,
    // },
    {
        path: '*',
        page: NotFoundPage,
        isPageUser : true,
    },
    // {
    //     path: '/login',
    //     page: Login,
    //     isPageUser : true,
    // },
    // {
    //     path: '/profile',
    //     page: ProfileUser,
    //     isShowHeader: true,
    //     isPageUser : true,
    // },
    // {
    //     path: '/category/:_id',
    //     page: CategoryByProduct,
    //     isShowHeader: true,
    //     isShowProduct: false,
    //     isShowBody: true,
    //     isPageUser : true,
    // },
    // {
    //     path: '/search',
    //     page: Search,
    //     isShowHeader: true,
    //     isPageUser : true,
    // },
    // {
    //     path: '/cart/:idUser',
    //     page: Cart,
    //     isShowHeader: true,
    //     isPageUser : true,
    // },
    // {
    //     path: '/payment',
    //     page: Payment,
    //     isShowHeader: false,
    //     isPageUser : true,
    // },
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
        path : '/admin/order',
        page : Order,
        isShowLeftAdmin : true
    },
]
