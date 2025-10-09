import type { AuthProps } from '@/schemas/AuthSchema'
import type { LoginProps } from '@/schemas/LoginSchema'
import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext<AuthProps | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginProps>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
        setUser(JSON.parse(user));
    } else {
        setIsLoading(false);
    }

    setIsLoading(false);
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  const login = async (name: string) => {
    if (name) {
        const userLogin = { name };
        setUser(userLogin);
        setIsAuthenticated(true)
        localStorage.setItem('user', `${userLogin}`);
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