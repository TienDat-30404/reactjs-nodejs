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
import "react-toastify/dist/ReactToastify.css";
import { privateRoutes } from './routes/privateRoutes';
function App() {
  const { checkAndUpdateToken } = useAuthHandler();

  useEffect(() => {
    checkAndUpdateToken();
  }, [checkAndUpdateToken]);

  return (
    <div className='div_biggest'>
      <Router>
        <Routes>
          

          {privateRoutes.map((route, i) => {
            const Page = route.page
            let Layout = route.layout
            if(route.layout)
            {
              Layout = route.layout
            }
            else if(route.layout == null)
            {
              Layout = Fragment
            }
            return (
              <Route
                key={i}
                path={route.path}
                element={
                    <Layout>
                      <Page />
                    </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
