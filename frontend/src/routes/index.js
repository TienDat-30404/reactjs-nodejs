import HomePage from "../pages/HomePage";
import Product from "../pages/Product";
import NotFoundPage from "../pages/NotFoundPage";
export const routes = [
    {
        path : '/',
        page : HomePage,
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
     