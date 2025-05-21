import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import DefaultLayout from './layout/DefaultLayout';
import ECommerce from './pages/Dashboard/ECommerce';
import Settings from './pages/Settings';
import StaffManagerView from './pages/Dashboard/StaffManagerView';
import { accessToken } from './store/actions/authActions';
import StaffCustomerView from './pages/Dashboard/CustomerManagerView';
import CustomerManagerView from './pages/Dashboard/CustomerManagerView';
import UserManagerView from './pages/Dashboard/UserManagerView';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(accessToken());
    }
  }, [dispatch]);


  useEffect(() => {
    if (user === null || user === undefined) {
      navigate('/auth/signin', { replace: true });
    }
  }, [user, navigate]);

  if (loading) return <Loader />;

  return (
    <Routes>
      {user ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route path="managers" element={<StaffManagerView />} />
          <Route path="customers" element={<CustomerManagerView/>} />
          <Route path="users" element={<UserManagerView />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/auth/signin" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
