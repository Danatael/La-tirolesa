import { Utensils, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-muted/50">
      <div className="container items-cente justify-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde 2005, hemos estado sirviendo auténtica comida con los mejores ingredientes y recetas tradicionales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8  items-cente justify-center">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Utensils className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Misión</CardTitle>
                <CardDescription>Nuestro propósito</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Nuestra misión es ofrecer una experiencia gastronómica excepcional, utilizando ingredientes frescos y de
                alta calidad, preparados con técnicas tradicionales y modernas, en un ambiente acogedor y con un
                servicio personalizado que haga sentir a nuestros clientes como en casa.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Visión</CardTitle>
                <CardDescription>Hacia dónde vamos</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Aspiramos a ser reconocidos como el restaurante de referencia en nuestra ciudad, destacando por la
                calidad de nuestros platillos, la excelencia en el servicio y nuestro compromiso con la comunidad y el
                medio ambiente. Buscamos expandir nuestra presencia manteniendo siempre la esencia que nos caracteriza.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
