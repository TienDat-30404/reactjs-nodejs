import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { adminRoutes } from './routes/adminRoutes';
import NotFoundPage from './pages/NotFoundPage';
import AdminRoute from './components/AdminRoute';
function App() {
  useAuthHandler()
  return (
    <div className='div_biggest'>
      <Router>
        <Routes>
          {/* {adminRoutes.map((route, i) => {
            let Page = route.page
            let Layout = route.layout
            if (route.layout) {
              Layout = route.layout
            }
            else if (route.layout === null) {
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
            )
          })} */}

          <Route path="/not-found" element={<NotFoundPage />} />
          <Route element={<AdminRoute />}>
            {adminRoutes.map(({ path, page: Page, layout: Layout }, i) => (
              <Route
                key={i}
                path={path}
                element={
                  Layout ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Page />
                  )
                }
              />
            ))}
          </Route>
          {privateRoutes.map((route, i) => {
            let Page = route.page
            let Layout = route.layout
            if (route.layout) {
              Layout = route.layout
            }
            else if (route.layout == null) {
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
