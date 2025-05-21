"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FileUp, Calendar, LogOut, Home, FileText, Upload, Trash2 } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import { isAuthenticated } from "@/lib/auth"

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [reservations, setReservations] = useState([
    { id: 1, name: "Juan Pérez", date: "2023-05-15", time: "19:00", guests: 4, status: "confirmada" },
    { id: 2, name: "María García", date: "2023-05-16", time: "20:00", guests: 2, status: "pendiente" },
    { id: 3, name: "Carlos López", date: "2023-05-18", time: "13:00", guests: 6, status: "confirmada" },
  ])

  const [menuFiles, setMenuFiles] = useState([
    { id: 1, name: "menu-completo.pdf", type: "Menú Completo", lastUpdated: "2023-04-10" },
    { id: 2, name: "menu-comidas.pdf", type: "Menú de Comidas", lastUpdated: "2023-04-10" },
    { id: 3, name: "menu-bebidas.pdf", type: "Menú de Bebidas", lastUpdated: "2023-04-10" },
  ])

  useEffect(() => {
    // Verificar autenticación
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    // Eliminar token de autenticación
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_role")
    router.push("/login")
  }

  const handleUpdateReservation = (id: number, status: string) => {
    // Actualizar estado de reserva (simulado)
    setReservations(reservations.map((res) => (res.id === id ? { ...res, status } : res)))
    toast({
      title: "Reserva actualizada",
      description: `La reserva #${id} ha sido ${status === "confirmada" ? "confirmada" : "cancelada"}.`,
    })
  }

  const handleDeleteMenu = (id: number) => {
    // Eliminar menú (simulado)
    setMenuFiles(menuFiles.filter((file) => file.id !== id))
    toast({
      title: "Archivo eliminado",
      description: "El archivo de menú ha sido eliminado correctamente.",
    })
  }

  const handleUploadMenu = () => {
    // Simulación de carga de archivo
    toast({
      title: "Archivo subido",
      description: "El nuevo menú ha sido subido correctamente.",
    })
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Ver sitio
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>

        <Tabs defaultValue="reservations">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="reservations" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Reservaciones
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Gestión de Menú
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Reservaciones</CardTitle>
                <CardDescription>Gestiona las reservaciones de mesas y eventos.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Cliente</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Fecha</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Hora</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Personas</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                      {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                          <td className="px-4 py-3 text-sm">{reservation.name}</td>
                          <td className="px-4 py-3 text-sm">{reservation.date}</td>
                          <td className="px-4 py-3 text-sm">{reservation.time}</td>
                          <td className="px-4 py-3 text-sm">{reservation.guests}</td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                reservation.status === "confirmada"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {reservation.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <div className="flex justify-end gap-2">
                              {reservation.status !== "confirmada" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdateReservation(reservation.id, "confirmada")}
                                >
                                  Confirmar
                                </Button>
                              )}
                              {reservation.status !== "cancelada" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleUpdateReservation(reservation.id, "cancelada")}
                                >
                                  Cancelar
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Menú</CardTitle>
                <CardDescription>Sube y administra los archivos PDF del menú.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" onChange={handleUploadMenu} />
                    </label>
                  </div>
                </div>

                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Archivo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Tipo</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Última actualización</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                      {menuFiles.map((file) => (
                        <tr key={file.id}>
                          <td className="px-4 py-3 text-sm">{file.name}</td>
                          <td className="px-4 py-3 text-sm">{file.type}</td>
                          <td className="px-4 py-3 text-sm">{file.lastUpdated}</td>
                          <td className="px-4 py-3 text-sm text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Upload className="h-3 w-3" />
                                Actualizar
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleDeleteMenu(file.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                                Eliminar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
