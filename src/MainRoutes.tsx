import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Page404 from './components/Page404';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar />} >
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
export default MainRoutes;