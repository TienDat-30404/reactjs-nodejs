import Body from "../pages/Content/Body";
import NotFoundPage from "../pages/NotFoundPage";
import Detail from "../components/Detail";
import Login from "../pages/Login/Login";
export const routes = [
    {
        path : '/',
        page : Body,
        isShowHeader : true
    }, 
    {
        path : '/detail',
        page : Detail,
        isShowHeader : true
    },  
    {
        path : '*',
        page : NotFoundPage
    },
    {
        path : 'login',
        page : Login
    }
]
     