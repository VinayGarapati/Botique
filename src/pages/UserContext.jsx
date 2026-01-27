import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize from localStorage so data persists on refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('app_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      profilePic: "https://via.placeholder.com/150"
    };
  });

  // Save to localStorage whenever user changes
  useEffect(() => {
    localStorage.setItem('app_user', JSON.stringify(user));
  }, [user]);

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const logout = () => {
    localStorage.removeItem('app_user');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);