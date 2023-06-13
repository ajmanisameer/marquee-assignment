import React, { createContext, useState } from 'react';

interface User {
  username: string;
  token: string;
}

interface UserContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    console.log('logout')
    localStorage.removeItem('user');
    setUser(null);
  };
  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
