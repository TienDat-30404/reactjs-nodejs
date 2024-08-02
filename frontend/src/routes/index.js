import Body from "../pages/Content/Body";
import NotFoundPage from "../pages/NotFoundPage";
import Detail from "../pages/DetailProduct/DetailProduct";
import Login from "../pages/Login/Login";
import ProfileUser from "../pages/ProfileUser/ProfileUser";
import CategoryByProduct from "../pages/Content/Right/CategoryByProduct/CategoryByProduct";
export const routes = [
    {
        path : '/',
        page : Body,
        isShowHeader : true,
        isShowProduct : true,
        isShowBody : true
    }, 
    {
        path : '/detail/:id',
        page : Detail,
        isShowHeader : true,
        isShowBody : false

    },  
    {
        path : '*',
        page : NotFoundPage
    },
    {
        path : 'login',
        page : Login
    },
    {
        path : '/profile-user',
        page : ProfileUser,
        isShowHeader : true,
        isShowBody : false
    },
    {
        path : '/category/:idCategory',
        page : CategoryByProduct,
        isShowHeader : true,
        isShowProduct : false,
        isShowBody : true
    }
]
     