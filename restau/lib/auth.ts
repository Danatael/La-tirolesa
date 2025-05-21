// Simulación de autenticación (en un entorno real usaríamos NextAuth.js o similar)

// Credenciales de demostración
const DEMO_CREDENTIALS = {
  email: "admin@elsabor.com",
  password: "admin123",
  role: "admin",
}

export async function login(email: string, password: string): Promise<boolean> {
  // Simulamos una petición a API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        // Guardar token y rol en localStorage (en producción usaríamos cookies seguras)
        localStorage.setItem("auth_token", "demo_token_" + Math.random().toString(36).substring(2))
        localStorage.setItem("user_role", DEMO_CREDENTIALS.role)
        resolve(true)
      } else {
        resolve(false)
      }
    }, 800) // Simulamos un pequeño retraso
  })
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("auth_token")
  const role = localStorage.getItem("user_role")

  return !!token && role === "admin"
}

export function getUserRole(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("user_role")
}

export function logout(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("auth_token")
  localStorage.removeItem("user_role")
}
