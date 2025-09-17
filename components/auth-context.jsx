"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (username, password, type) => {
    // Mock authentication logic
    if (username === "demo" && password === "demo123") {
      const userData = {
        id: "1",
        username,
        type: type,
        name: `Demo ${type.charAt(0).toUpperCase() + type.slice(1)} User`,
      }
      setUser(userData)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
