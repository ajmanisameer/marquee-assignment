// useAuth.ts
import { useContext, useEffect } from 'react';
import { UserContext } from '../_store/UserContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user } = useContext(UserContext);
  const storedUser = localStorage.getItem('user')
  console.log(storedUser)

  const navigate = useNavigate();

  useEffect(() => {
    if ( !storedUser && !user) {
      navigate('/login');
    }
  }, [user]);

  return user;
};