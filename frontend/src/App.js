import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Fragment } from 'react';
import './public/css/main.css'
import './public/css/left.css'
import './public/css/right.css'
import './public/css/detail.css'
import './public/css/profile.css'
import './public/css/admin.css'
import { useEffect } from 'react';
import { useAuthHandler } from './until/manageToken';
import DefaultComponent from './components/DefaultComponent';
import Right from './pages/Content/Right/Right';
import Body from './pages/Content/Body';
import CategoryByProduct from './pages/Content/Right/CategoryByProduct/CategoryByProduct';
import Admin from './pages/Admin/Admin';
function App() {
  const { checkAndUpdateToken } = useAuthHandler();

  useEffect(() => {
    checkAndUpdateToken();
  }, [checkAndUpdateToken]);

  return (
    <div className='div_biggest'>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const isCheckPage = route.isPageUser
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            const Content = route.isShowProduct ? Right : CategoryByProduct
            const ShowBody = route.isShowBody ? Body : Fragment
            const isCheckBody = route.isShowBody
            const isCheckPageAdmin = route.isShowLeftAdmin
            const PageAdmin = route.isShowLeftAdmin ? Admin : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  {isCheckPage ? (
                    isCheckBody ? (
                      <ShowBody right={<Content />} />
                    ) : (
                      <Page />
                    )
                  ) : (
                    isCheckPageAdmin ? (
                      <PageAdmin right={<Page />} />
                    ) : (
                      <Fragment />
                    )
                  )}
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
