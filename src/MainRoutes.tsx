import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import { UserContext } from './_store/UserContext';
import { useAuth } from './_auth/useAuth';

const MainRoutes = () => {
  const User = useAuth();
  return (
    <Routes>
      {User && (
        <Route path='/' element={<Dashboard />} />
      )}
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
export default MainRoutes;