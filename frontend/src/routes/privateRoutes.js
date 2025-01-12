import DefaultLayout from "../Layouts/DefaultLayout/DefaultLayout"
import Body from "../pages/Content/Body";
import Payment from "../pages/Payment/Payment.";
import DetailProductLayout from "../Layouts/DetailProductLayout/DetailProductLayout";
import Detail from "../pages/DetailProduct/DetailProduct";
import Cart from "../pages/Cart/Cart";
import CartLayout from "../Layouts/CartLayout/CartLayout";
import Category from "../pages/Content/Right/CategoryByProduct/CategoryByProduct";
import CategoryLayout from "../Layouts/CategoryLayout/CategoryLayout";
import Search from "../pages/Search/Search";
import SearchLayout from "../Layouts/SearchLayout/SearchLayout";
import InformationGeneralProfile from "../pages/ProfileUser/InformationGeneralProfile";
import ProfileLayout from "../Layouts/ProfileLayout/ProfileLayout";
import Favorite from "../pages/Favorite/Favorite";
import PaymentVnpayReturn from "../pages/Payment/PaymentVnpayReturn";
import PaymentMomoReturn from "../pages/Payment/PaymentMomoReturn";
import PaymentZalopayReturn from "../pages/Payment/PaymentZaloPayReturn";
export const privateRoutes = [
    {path : '/', page : Body, layout : DefaultLayout},
    {path : '/detail/:_id', page : Detail, layout : DetailProductLayout},
    // {path : '/profile', page : ProfileUser, layout : DefaultLayout},
    {path : '/payment', page : Payment, layout : null},
    {path : '/payment-vnpay-return', page : PaymentVnpayReturn, layout : null},
    {path : '/payment-momo-return', page : PaymentMomoReturn, layout : null},
    {path : '/payment-zalopay-return', page : PaymentZalopayReturn, layout : null},
    {path : '/cart/:idUser', page : Cart, layout : CartLayout},
    {path : '/category/:_id', page : Category, layout : CategoryLayout} ,
    { path : '/search', page : Search, layout : SearchLayout },
    {path : '/profile', page : InformationGeneralProfile, layout : ProfileLayout},
    {path : 'favorite', page : Favorite, layout : ProfileLayout}
]   