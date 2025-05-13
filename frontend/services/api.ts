import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies/authentication
  timeout: 10000, // Add timeout to prevent hanging requests
})

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors more gracefully
    if (error.code === "ERR_NETWORK" || !error.response) {
      console.error("Network error detected:", error.message)
      return Promise.reject({
        isNetworkError: true,
        message: "Unable to connect to the server. Please check your internet connection or try again later.",
      })
    }
    return Promise.reject(error)
  },
)

// Authentication API calls
export const authAPI = {
  signup: async (username: string, email: string, password: string) => {
    try {
      const response = await api.post("/api/auth/signup", {
        username,
        email,
        password,
      })
      return response.data
    } catch (error: any) {
      console.error("Signup API error:", error)
      throw error
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      })
      return response.data
    } catch (error: any) {
      console.error("Login API error:", error)
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/api/auth/logout")
      return response.data
    } catch (error: any) {
      console.error("Logout API error:", error)
      // Even if logout API fails, we should still clear local state
      return { success: true, message: "Logged out locally" }
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/api/auth/me")
      return response.data
    } catch (error: any) {
      console.error("Get current user API error:", error)
      return null
    }
  },
}

// Quiz API calls
export const quizAPI = {
  submitQuizAnswers: async (category: string, answers: Record<string, string>) => {
    try {
      const response = await api.post(`/api/quiz/${category}`, { answers })
      return response.data
    } catch (error: any) {
      console.error("Submit quiz API error:", error)
      throw error
    }
  },

  getQuizProgress: async () => {
    try {
      const response = await api.get("/api/quiz/progress")
      return response.data
    } catch (error: any) {
      console.error("Get quiz progress API error:", error)
      // Return default progress if API fails
      return {
        progress: {
          abilities: 0,
          aptitude: 0,
          aspirations: 0,
          experience: 0,
        },
      }
    }
  },

  getCareerRecommendations: async () => {
    try {
      const response = await api.get("/api/quiz/recommendations")
      return response.data
    } catch (error: any) {
      console.error("Get recommendations API error:", error)
      throw error
    }
  },
}

// Development helper to check if API is available
export const checkApiConnection = async () => {
  try {
    await api.get("/api/health")
    return true
  } catch (error) {
    console.warn("API health check failed:", error)
    return false
  }
}

export default api

