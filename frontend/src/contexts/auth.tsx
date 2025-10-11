import type { AuthProps } from '@/schemas/AuthSchema'
import type { LoginProps } from '@/schemas/LoginSchema'
import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext<AuthProps | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('user');

    if (data) {
      setUser(JSON.parse(data));
      setIsLoading(false);
      setIsAuthenticated(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if(user) {
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  const login = async (data: LoginProps) => {
    if (data) {
        setUser({
          name: data.name,
          selected: []
        });
    } else {
        throw new Error('Authentication failed')
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}