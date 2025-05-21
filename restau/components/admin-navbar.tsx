"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { FileText, Calendar, Settings, Home } from "lucide-react"

export default function AdminNavbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Inicio",
      href: "/admin",
      icon: Home,
    },
    {
      name: "Reservaciones",
      href: "/admin?tab=reservations",
      icon: Calendar,
    },
    {
      name: "Menú",
      href: "/admin?tab=menu",
      icon: FileText,
    },
    {
      name: "Configuración",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/admin" className="flex items-center space-x-2 mr-6">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="El Sabor" width={120} height={40} className="h-10 w-auto" />
            <span className="font-medium text-sm bg-primary/10 text-primary px-2 py-1 rounded">Admin</span>
          </div>
        </Link>

        <nav className="flex-1 flex items-center">
          <ul className="flex space-x-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname === "/admin" && item.href === "/admin") ||
                (item.href.includes("?tab=") && pathname + window.location.search === item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
