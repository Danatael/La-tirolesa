"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

export default function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    setCardNumber(formattedValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de procesamiento de pago
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Pago procesado con éxito",
        description: `Se ha realizado un cargo de $${amount.toFixed(2)} a tu tarjeta.`,
      })
      onSuccess()
    }, 2000)
  }

  // Generar años para el selector
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Información de pago
        </CardTitle>
        <CardDescription>Ingresa los datos de tu tarjeta para procesar el pago</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Número de tarjeta</Label>
            <div className="relative">
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <img src="/visa.svg" alt="Visa" className="h-6 w-auto" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-name">Nombre en la tarjeta</Label>
            <Input
              id="card-name"
              placeholder="NOMBRE APELLIDO"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toUpperCase())}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha de expiración</Label>
              <div className="flex gap-2 items-center">
                <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                        {month.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-muted-foreground">/</span>

                <Select value={expiryYear} onValueChange={setExpiryYear} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="AA" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString().slice(-2)}>
                        {year.toString().slice(-2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  required
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t mt-6">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${(amount * 0.84).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>IVA (16%):</span>
              <span>${(amount * 0.16).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${amount.toFixed(2)}</span>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Procesando..." : `Pagar $${amount.toFixed(2)}`}
        </Button>
      </CardFooter>
    </Card>
  )
}
