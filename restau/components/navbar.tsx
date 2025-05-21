"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import UserMenu from "@/components/user-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/la-tirolesa.png" alt="La Tirolesa" width={120} height={40} className="h-10 w-auto" />
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Inicio
          </Link>
          <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
            Nosotros
          </Link>
          <Link href="/menu" className="text-sm font-medium transition-colors hover:text-primary">
            Menú
          </Link>
          <Link href="/reservations" className="text-sm font-medium transition-colors hover:text-primary">
            Reservaciones
          </Link>
          <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contacto
          </Link>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <UserMenu />
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background md:hidden">
            <div className="container flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="La Tirolesa" width={120} height={40} className="h-10 w-auto" />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="container grid gap-6 py-6">
              <Link href="/" className="text-lg font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
              <Link
                href="/#about"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/menu"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Menú
              </Link>
              <Link
                href="/reservations"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Reservaciones
              </Link>
              <Link
                href="/#contact"
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4 border-t">
                <UserMenu />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

