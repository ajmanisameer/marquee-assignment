// useAuth.ts
import { useContext, useEffect } from 'react';
import { UserContext } from '../_store/UserContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return user;
};