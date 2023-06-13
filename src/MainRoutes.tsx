import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Page404 from './pages/Page404';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
export default MainRoutes;