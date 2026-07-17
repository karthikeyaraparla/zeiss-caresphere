import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, company: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: 'u1',
  email: 'admin@zeiss-caresphere.com',
  name: 'Alex Zimmermann',
  role: 'admin',
  company: 'Carl Zeiss AG',
  department: 'Digital Services',
  phone: '+49 7364 20-0',
  createdAt: '2024-01-01T09:00:00Z',
  lastLogin: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('caresphere_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate API call — replace with Supabase auth
    await new Promise(r => setTimeout(r, 1200));
    const u = { ...mockUser, email };
    setUser(u);
    localStorage.setItem('caresphere_user', JSON.stringify(u));
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string, company: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const u = { ...mockUser, name, email, company };
    setUser(u);
    localStorage.setItem('caresphere_user', JSON.stringify(u));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('caresphere_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
