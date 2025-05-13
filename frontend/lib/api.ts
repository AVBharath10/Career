// API URL - change this to your backend URL
const API_URL = "http://localhost:5000"

// Helper function to get the auth token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Generic fetch function with authentication
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  })

  // Handle unauthorized errors (expired token, etc.)
  if (response.status === 401) {
    // Clear token and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    throw new Error("Your session has expired. Please log in again.")
  }

  return response
}

// Quiz API functions
export async function saveQuizAnswers(category: string, answers: Record<string, string>) {
  const response = await fetchWithAuth(`/api/quiz/${category}`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to save quiz answers")
  }

  return response.json()
}

export async function getQuizProgress() {
  const response = await fetchWithAuth("/api/quiz/progress")

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch quiz progress")
  }

  return response.json()
}

