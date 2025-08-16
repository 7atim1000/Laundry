import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'

import Headers from './components/shared/Headers';
import { useSelector } from 'react-redux';
import useLoadData from './hooks/useLoadData';
import FullScreenLoader from './components/shared/FullScreenLoader';

import { ToastContainer } from 'react-toastify';
import { Auth, Categories, Customers, Home, Invocies, Menu, Orders, Services, Transactions, Units } from './pages';


function Layout() {
  const location = useLocation();
  //useLoadData();  // to not logout during refresh page
  const isLoading = useLoadData();

  const hideHeaderRoutes = ['/auth', '/menu', '/services', '/categories', '/customers', '/invoices', '/transactions', '/units'];

  
  const { isAuth } = useSelector(state => state.user);

  if(isLoading) return <FullScreenLoader />

  return (
    <>
    {!hideHeaderRoutes.includes(location.pathname) && <Headers />}

        <ToastContainer />
      
      <Routes>
          <Route path='/auth' element={isAuth ? <Navigate to='/'/> : <Auth />}/>

          <Route path='/*' element ={<div>Not Found</div>}/>
        
          <Route path ='/' element ={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }/>

        <Route path='/customers' element={
          <ProtectedRoutes>
            <Customers  />
          </ProtectedRoutes>
        } />

        <Route path='/services' element={
          <ProtectedRoutes>
            <Services />
          </ProtectedRoutes>
        } />

        <Route path='/categories' element={
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        } />


        <Route 
          path ='/units' element = {
            <ProtectedRoutes>
              <Units />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/menu' element={
            <ProtectedRoutes>
              <Menu />
            </ProtectedRoutes>
          }
        />


        <Route
          path='/invoices' element={
            <ProtectedRoutes>
              <Invocies />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/orders' element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />

        <Route
          path='/transactions' element={
            <ProtectedRoutes>
              <Transactions />
            </ProtectedRoutes>
          }
        />
       


          
      </Routes>

    </>
  );
  
};



function ProtectedRoutes({ children }) {

  const { isAuth } = useSelector(state => state.user);
  if (!isAuth) {
    return <Navigate to='/auth' />
  }

  return children;
}

function App() {

  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
