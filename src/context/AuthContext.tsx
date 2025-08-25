//v2

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }

    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setUser(null);

    // Redirect to login
    window.location.href = '/login';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};














//v1

// // src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: 'ADMIN' | 'AGENT';
// }

// interface AuthContextType {
//   user: User | null;
//   login: (userData: User, token: string) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     // Check for user info in localStorage on initial load
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const login = (userData: User, token: string) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('accessToken', token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('accessToken');
//     setUser(null);
//     // You might want to redirect to the login page here
//     window.location.href = '/login';
//   };
  
//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to easily use the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };