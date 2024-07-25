import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { routes } from './routes';
import { Fragment} from 'react';
import './public/css/main.css'
import './public/css/left.css'
import './public/css/right.css'
import './public/css/detail.css'
import { useQuery } from 'react-query';
import DefaultComponent from './components/DefaultComponent';
function App() {
  var fetchApi = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/get-all-product`);
      if (!res.ok) {  
        throw new Error('Network response was not ok');
      }
      return res.json()
  };
  const query = useQuery({ queryKey: ['products'], queryFn: fetchApi })
  if(query.isLoading) return <div>Loading data...</div>
  if(query.isError) return <div>Error</div>
  // if(query.isSuccess)
  // {
  //   console.log(query.data)
  // }

  
  
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
