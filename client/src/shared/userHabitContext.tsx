import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the user object interface
interface User {
  username: string;
  password: string;
  // Add additional fields as required
}

// Define the context interface
interface UserContextInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Define the context
const UserContext = createContext<UserContextInterface | undefined>(undefined);

// Define the provider component
export const UserProvider: React.FC<ReactNode> = ({ children }) => {
  const [user, setUser] = useState<User>({ username: '', password: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Define the custom hook for using the context
export const useUserContext = (): UserContextInterface => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};