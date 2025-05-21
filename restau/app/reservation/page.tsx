import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ReservationSection from "@/components/reservation-section-fix"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarRange, Users, PartyPopper, Utensils } from "lucide-react"

export const metadata = {
    title: "Reservaciones - La Tirolesa Restaurante",
    description: "Reserva una mesa o el local completo para tus eventos especiales en La Tirolesa.",
}

export default function ReservationsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-16">
                <div className="container">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Reservaciones</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Reserva una mesa para tu próxima visita o consulta sobre la organización de eventos especiales en nuestro
                            local.
                        </p>
                    </div>

                    {/* Información sobre tipos de reservaciones */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Utensils className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Reserva de Mesas</CardTitle>
                                    <CardDescription>Para comidas familiares o con amigos</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span>Capacidad desde 1 hasta 10 personas por mesa</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CalendarRange className="h-4 w-4 text-primary" />
                                        <span>Disponibilidad todos los días en horario de apertura</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <PartyPopper className="h-4 w-4 text-primary" />
                                        <span>Ideal para celebraciones pequeñas y reuniones casuales</span>
                                    </li>
                                </ul>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Se requiere un depósito de $50 por persona para confirmar la reserva. Este monto será descontado de tu
                                    cuenta final.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <PartyPopper className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Eventos Especiales</CardTitle>
                                    <CardDescription>Reserva el local completo para tu evento</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span>Capacidad hasta 100 personas</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CalendarRange className="h-4 w-4 text-primary" />
                                        <span>Disponibilidad sujeta a calendario</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <PartyPopper className="h-4 w-4 text-primary" />
                                        <span>Perfecto para bodas, cumpleaños, eventos corporativos y más</span>
                                    </li>
                                </ul>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Se requiere un depósito para confirmar la reserva del espacio para tu evento. El monto dependerá del
                                    número de invitados y tipo de evento.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Formulario de reservaciones */}
                    <ReservationSection />
                </div>
            </main>
            <Footer />
        </div>
    )
}
