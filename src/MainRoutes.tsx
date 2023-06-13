import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Page404 from './components/UI/Page404';
import { UserContext } from './_store/UserContext';
import { useAuth } from './_auth/useAuth';

const MainRoutes = () => {
  const User = useAuth();
  const storedUser = localStorage.getItem('user')
  return (
    <Routes>
      { storedUser && (
        <Route path='/' element={<Dashboard />} />
      )}
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
export default MainRoutes;