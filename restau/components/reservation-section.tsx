"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useForm } from "react-hook-form"
import PaymentForm from "@/components/payment-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ReservationSection() {
  const [date, setDate] = useState<Date>()
  const [showPayment, setShowPayment] = useState(false)
  const [reservationType, setReservationType] = useState("table")
  const [reservationAmount, setReservationAmount] = useState(0)

  const tableForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      time: "",
      date: new Date(),
      message: "",
    },
  })

  const eventForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      eventType: "",
      date: new Date(),
      message: "",
    },
  })

  function onTableSubmit(data: any) {
    console.log(data)
    // Calcular monto basado en número de personas
    const guests = Number.parseInt(data.guests) || 2
    const amount = guests * 50 // $50 por persona como depósito
    setReservationAmount(amount)
    setReservationType("table")
    setShowPayment(true)
  }

  function onEventSubmit(data: any) {
    console.log(data)
    // Calcular monto basado en tipo de evento y número de invitados
    const guests = data.guests === "10-20" ? 15 : data.guests === "20-30" ? 25 : data.guests === "30-50" ? 40 : 75
    const amount = guests * 100 // $100 por persona como depósito para eventos
    setReservationAmount(amount)
    setReservationType("event")
    setShowPayment(true)
  }

  function handlePaymentSuccess() {
    setShowPayment(false)
    // Resetear formularios
    tableForm.reset()
    eventForm.reset()
    // Mostrar mensaje de éxito (ya se muestra en el componente de pago)
  }

  function handlePaymentCancel() {
    setShowPayment(false)
  }

  return (
    <section id="reservation" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Reservaciones</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Reserva una mesa para tu próxima visita o consulta sobre la organización de eventos especiales en nuestro
            local.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="table" className="w-full" onValueChange={(value) => setReservationType(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Reservar Mesa</TabsTrigger>
              <TabsTrigger value="event">Organizar Evento</TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <Card>
                <CardHeader>
                  <CardTitle>Reserva de Mesa</CardTitle>
                  <CardDescription>
                    Haz una reserva para tu próxima visita a nuestro restaurante. Se requiere un depósito de $50 por
                    persona.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...tableForm}>
                    <form onSubmit={tableForm.handleSubmit(onTableSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={tableForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={tableForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={tableForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu número de teléfono" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={tableForm.control}
                          name="guests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de personas</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 persona</SelectItem>
                                  <SelectItem value="2">2 personas</SelectItem>
                                  <SelectItem value="3">3 personas</SelectItem>
                                  <SelectItem value="4">4 personas</SelectItem>
                                  <SelectItem value="5">5 personas</SelectItem>
                                  <SelectItem value="6">6 personas</SelectItem>
                                  <SelectItem value="7+">7 o más personas</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={tableForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Fecha</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: es })
                                      ) : (
                                        <span>Selecciona una fecha</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={tableForm.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hora</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="12:00">12:00 PM</SelectItem>
                                  <SelectItem value="13:00">1:00 PM</SelectItem>
                                  <SelectItem value="14:00">2:00 PM</SelectItem>
                                  <SelectItem value="15:00">3:00 PM</SelectItem>
                                  <SelectItem value="19:00">7:00 PM</SelectItem>
                                  <SelectItem value="20:00">8:00 PM</SelectItem>
                                  <SelectItem value="21:00">9:00 PM</SelectItem>
                                  <SelectItem value="22:00">10:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={tableForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensaje (opcional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Cualquier solicitud especial o información adicional"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-sm text-muted-foreground mt-4">
                        <p>
                          * Se requiere un depósito de $50 por persona para confirmar la reserva. Este monto será
                          descontado de tu cuenta final.
                        </p>
                      </div>

                      <Button type="submit" className="w-full">
                        Continuar al pago
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="event">
              <Card>
                <CardHeader>
                  <CardTitle>Organizar un Evento</CardTitle>
                  <CardDescription>
                    Solicita información para organizar tu evento especial en nuestro local. Se requiere un depósito
                    para reservar la fecha.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...eventForm}>
                    <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={eventForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={eventForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={eventForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu número de teléfono" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={eventForm.control}
                          name="guests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de invitados</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="10-20">10-20 personas</SelectItem>
                                  <SelectItem value="20-30">20-30 personas</SelectItem>
                                  <SelectItem value="30-50">30-50 personas</SelectItem>
                                  <SelectItem value="50-100">50-100 personas</SelectItem>
                                  <SelectItem value="100+">Más de 100 personas</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={eventForm.control}
                          name="eventType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de evento</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="birthday">Cumpleaños</SelectItem>
                                  <SelectItem value="anniversary">Aniversario</SelectItem>
                                  <SelectItem value="wedding">Boda</SelectItem>
                                  <SelectItem value="corporate">Evento corporativo</SelectItem>
                                  <SelectItem value="other">Otro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={eventForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Fecha</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: es })
                                      ) : (
                                        <span>Selecciona una fecha</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={eventForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detalles del evento</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe tu evento y cualquier requisito especial"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-sm text-muted-foreground mt-4">
                        <p>
                          * Se requiere un depósito para confirmar la reserva del espacio para tu evento. El monto
                          dependerá del número de invitados y tipo de evento.
                        </p>
                      </div>

                      <Button type="submit" className="w-full">
                        Continuar al pago
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Diálogo de pago */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="sm:max-w-md">
          <PaymentForm amount={reservationAmount} onSuccess={handlePaymentSuccess} onCancel={handlePaymentCancel} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
