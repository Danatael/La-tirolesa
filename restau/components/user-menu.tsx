"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUserRole, isAuthenticated, logout } from "@/lib/auth"
import { User, LogIn, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserMenu() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    setAuthenticated(isAuthenticated())
    setRole(getUserRole())
  }, [])

  const handleLogout = () => {
    logout()
    setAuthenticated(false)
    setRole(null)
    router.push("/")
  }

  if (!authenticated) {
    return (
      <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
        <Link href="/login">
          <LogIn className="h-4 w-4" />
          Iniciar sesión
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {role === "admin" ? "Administrador" : "Mi cuenta"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Panel de administración</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/reservations">Mis reservaciones</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
