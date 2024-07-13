import Body from "../pages/Content/Body";
import Product from "../pages/Product";
import NotFoundPage from "../pages/NotFoundPage";
export const routes = [
    {
        path : '/',
        page : Body,
        isShowHeader : true
    }, 
    {
        path : '/product',
        page : Product,
        isShowHeader : true
    },
    {
        path : '*',
        page : NotFoundPage
    }
]
     