import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { Fragment } from 'react';
import Cookies from 'js-cookie';
import './public/css/main.css'
import './public/css/left.css'
import './public/css/right.css'
import './public/css/detail.css'
import { useEffect } from 'react';
import { useAuthHandler } from './until/manageToken';
import DefaultComponent from './components/DefaultComponent';
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
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
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
