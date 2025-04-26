
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";
import { Order } from "@/types/product";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  orders: Order[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  addOrderToHistory: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data
const MOCK_USERS = [
  { id: '1', email: 'user@example.com', password: 'password', name: 'Regular User', role: 'user' as const, orders: [] },
  { id: '2', email: 'admin@example.com', password: 'admin', name: 'Admin User', role: 'admin' as const, orders: [] },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const saveUserToStorage = useCallback((userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        
        // Initialize orders array if it doesn't exist
        const userWithOrders = {
          ...userWithoutPassword,
          orders: userWithoutPassword.orders || []
        };
        
        setUser(userWithOrders);
        saveUserToStorage(userWithOrders);
        toast.success("Logged in successfully!");
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      toast.error("Login failed");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast.error("Email already registered");
        return false;
      }
      
      // In a real app, we'd save this to a database
      // For now we'll just log it and proceed with login
      console.log('Registered user:', { name, email, password });
      
      // Auto login after registration
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        email,
        name,
        role: 'user' as const,
        orders: []
      };
      
      setUser(newUser);
      saveUserToStorage(newUser);
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("Logged out successfully");
  };
  
  const addOrderToHistory = useCallback((order: Order) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), order]
    };
    
    setUser(updatedUser);
    saveUserToStorage(updatedUser);
    toast.success("Order added to your history");
  }, [user, saveUserToStorage]);

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    addOrderToHistory
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
