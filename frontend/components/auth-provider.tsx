"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authAPI, checkApiConnection } from "@/services/api"

type User = {
  id: string
  username: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  apiAvailable: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Development fallback user for testing when API is unavailable
const FALLBACK_USER = {
  id: "dev-user-123",
  username: "DevUser",
  email: "dev@example.com",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiAvailable, setApiAvailable] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if API is available on initial load
  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkApiConnection()
      setApiAvailable(isAvailable)

      if (!isAvailable) {
        console.warn("API is not available. Using development fallbacks.")
      }
    }

    checkApi()
  }, [])

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check for token
        const token = localStorage.getItem("token")

        if (token) {
          // Verify token by getting current user
          const userData = await authAPI.getCurrentUser()
          if (userData) {
            setUser(userData.user)
          } else {
            // Token is invalid, remove it
            localStorage.removeItem("token")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Protect routes that require authentication
  useEffect(() => {
    if (!isLoading) {
      if (!user && (pathname === "/dashboard" || pathname.startsWith("/quiz/") || pathname === "/results")) {
        router.push("/login")
      }
    }
  }, [user, pathname, isLoading, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // If API is not available and we're in development, use fallback
      if (!apiAvailable && process.env.NODE_ENV === "development") {
        console.warn("Using development fallback for login")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Set fallback user and token
        localStorage.setItem("token", "dev-token-123")
        setUser(FALLBACK_USER)

        router.push("/dashboard")
        return
      }

      const response = await authAPI.login(email, password)

      // Store the JWT token
      localStorage.setItem("token", response.token)

      // Set the user data
      setUser(response.user)

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // If API is not available and we're in development, use fallback
      if (!apiAvailable && process.env.NODE_ENV === "development") {
        console.warn("Using development fallback for signup")
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Set fallback user and token
        localStorage.setItem("token", "dev-token-123")
        setUser({
          ...FALLBACK_USER,
          username,
          email,
        })

        router.push("/dashboard")
        return
      }

      const response = await authAPI.signup(username, email, password)

      // Store the JWT token
      localStorage.setItem("token", response.token)

      // Set the user data
      setUser(response.user)

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout API call failed:", error)
    } finally {
      // Even if the API call fails, we should clear local state
      localStorage.removeItem("token")
      setUser(null)
      router.push("/")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, apiAvailable }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

