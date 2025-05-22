"use client"

import { useState } from "react"
import { Download, Clock, Heart, HeartIcon as HeartFilled, ChevronLeft, FileText, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// Categorías del menú como "álbumes"
const menuCategories = [
  {
    id: "entradas",
    title: "Entradas",
    image: "/1.jpg",
    description: "Para compartir y abrir el apetito",
    items: [
      { name: "Guacamole tradicional", price: 120, popular: true, time: "10 min" },
      { name: "Queso fundido con chorizo", price: 150, popular: false, time: "15 min" },
      { name: "Tostadas de tinga", price: 110, popular: true, time: "10 min" },
      { name: "Sopa de tortilla", price: 95, popular: false, time: "12 min" },
      { name: "Empanadas de queso", price: 130, popular: false, time: "15 min" },
    ],
  },
  {
    id: "principales",
    title: "Platos Principales",
    image: "/3.jpg",
    description: "Nuestras especialidades de la casa",
    items: [
      { name: "Tlayudas tradicionales", price: 180, popular: true, time: "20 min" },
      { name: "Mole poblano con pollo", price: 210, popular: true, time: "25 min" },
      { name: "Chiles en nogada", price: 240, popular: true, time: "30 min" },
      { name: "Cochinita pibil", price: 190, popular: false, time: "25 min" },
      { name: "Enchiladas suizas", price: 160, popular: false, time: "20 min" },
    ],
  },
  {
    id: "postres",
    title: "Postres",
    image: "/5.jpg",
    description: "El dulce final para tu experiencia",
    items: [
      { name: "Flan de cajeta", price: 90, popular: true, time: "5 min" },
      { name: "Churros con chocolate", price: 110, popular: true, time: "15 min" },
      { name: "Pastel de tres leches", price: 95, popular: false, time: "5 min" },
      { name: "Arroz con leche", price: 85, popular: false, time: "5 min" },
      { name: "Buñuelos con miel", price: 80, popular: false, time: "10 min" },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    image: "/2.jpg",
    description: "Refrescantes y tradicionales",
    items: [
      { name: "Agua de horchata", price: 60, popular: true, time: "3 min" },
      { name: "Mezcal artesanal", price: 150, popular: false, time: "3 min" },
      { name: "Cerveza artesanal", price: 80, popular: false, time: "3 min" },
      { name: "Refresco de cola", price: 50, popular: false, time: "2 min" },
      { name: "Agua mineral", price: 40, popular: false, time: "2 min" },
      { name: "Tequila reposado", price: 200, popular: true, time: "5 min" },
      { name: "Cerveza clara", price: 70, popular: false, time: "3 min" },
      { name: "Cerveza oscura", price: 90, popular: false, time: "3 min" },
      { name: "Café de olla", price: 50, popular: true, time: "5 min" },
      { name: "Chocolate caliente", price: 60, popular: false, time: "5 min" },
      { name: "Limonada fresca", price: 70, popular: true, time: "3 min" },
      { name: "Jugo de naranja", price: 80, popular: false, time: "3 min" },
      { name: "Micheleda", price: 120, popular: true, time: "5 min" },
    ],
  },
  {
    id: "especiales",
    title: "Especiales",
    image: "/4.jpg",
    description: "Platillos de temporada y del chef",
    items: [
      { name: "Pescado a la talla", price: 280, popular: true, time: "30 min" },
      { name: "Mixiote de cordero", price: 260, popular: false, time: "35 min" },
      { name: "Tacos de chapulines", price: 170, popular: true, time: "15 min" },
      { name: "Pozole rojo", price: 190, popular: false, time: "25 min" },
      { name: "Barbacoa de res", price: 230, popular: true, time: "30 min" },
    ],
  },
  /* {
    id: "para-ninos",
    title: "Menú Infantil",
    image: "/menu-ninos.jpg",
    description: "Especiales para los más pequeños",
    items: [
      { name: "Quesadillas con papas", price: 95, popular: true, time: "15 min" },
      { name: "Nuggets de pollo", price: 110, popular: false, time: "15 min" },
      { name: "Mini hamburguesa", price: 120, popular: true, time: "20 min" },
      { name: "Espagueti con albóndigas", price: 115, popular: false, time: "20 min" },
      { name: "Helado surtido", price: 70, popular: true, time: "5 min" },
    ],
  }, */
]

export default function MenuViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (itemName: string) => {
    if (favorites.includes(itemName)) {
      setFavorites(favorites.filter((name) => name !== itemName))
    } else {
      setFavorites([...favorites, itemName])
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleBackClick = () => {
    setSelectedCategory(null)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="browse">Explorar Menú</TabsTrigger>
          <TabsTrigger value="download">Descargar PDF</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {selectedCategory ? (
            <div className="space-y-6">
              <Button variant="ghost" onClick={handleBackClick} className="flex items-center gap-2 mb-4 hover:bg-muted">
                <ChevronLeft className="h-5 w-5" />
                Volver a categorías
              </Button>

              {/* Cabecera del "álbum" seleccionado */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-end bg-gradient-to-b from-muted/80 to-background p-6 rounded-lg">
                <div className="relative w-48 h-48 min-w-48 shadow-lg">
                  <Image
                    src={
                      menuCategories.find((c) => c.id === selectedCategory)?.image ||
                      "/placeholder.svg?height=300&width=300" ||
                      "/placeholder.svg"
                    }
                    alt={menuCategories.find((c) => c.id === selectedCategory)?.title || ""}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-sm uppercase tracking-wider mb-2">Categoría</span>
                  <h2 className="text-3xl font-bold mb-2">
                    {menuCategories.find((c) => c.id === selectedCategory)?.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {menuCategories.find((c) => c.id === selectedCategory)?.description}
                  </p>
                  <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Ver platillos
                  </Button>
                </div>
              </div>

              {/* Lista de platillos como "canciones" */}
              <div className="bg-card rounded-lg p-4">
                <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 text-sm text-muted-foreground border-b pb-2 mb-2">
                  <div className="w-8 text-center">#</div>
                  <div>Platillo</div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>Precio</div>
                </div>

                <div className="space-y-1">
                  {menuCategories
                    .find((c) => c.id === selectedCategory)
                    ?.items.map((item, index) => (
                      <div
                        key={item.name}
                        className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-2 rounded-md hover:bg-muted/50 group"
                      >
                        <div className="w-8 text-center text-muted-foreground">{index + 1}</div>
                        <div className="flex items-center gap-3">
                          {item.popular && (
                            <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">Popular</span>
                          )}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-muted-foreground text-sm flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </div>
                        <div className="flex items-center gap-3">
                          <span>${item.price}</span>
                          <button
                            onClick={() => toggleFavorite(item.name)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {favorites.includes(item.name) ? (
                              <HeartFilled className="h-4 w-4 text-primary" />
                            ) : (
                              <Heart className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6">Categorías del Menú</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuCategories.map((category) => (
                  <div
                    key={category.id}
                    className="cursor-pointer group"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="relative aspect-square mb-3 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-primary text-primary-foreground"
                        >
                          <Utensils className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold truncate">{category.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-md flex items-center justify-center">
                <HeartFilled className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Tus Platillos Favoritos</h2>
                <p className="text-muted-foreground">Platillos que has marcado como favoritos</p>
              </div>
            </div>

            {favorites.length > 0 ? (
              <div className="bg-card rounded-lg p-4">
                <div className="grid grid-cols-[1fr_auto] gap-4 text-sm text-muted-foreground border-b pb-2 mb-2">
                  <div>Platillo</div>
                  <div>Precio</div>
                </div>

                <div className="space-y-1">
                  {favorites.map((favName, index) => {
                    // Encontrar el ítem favorito en todas las categorías
                    let favItem
                    let categoryName = ""

                    for (const category of menuCategories) {
                      const found = category.items.find((item) => item.name === favName)
                      if (found) {
                        favItem = found
                        categoryName = category.title
                        break
                      }
                    }

                    if (!favItem) return null

                    return (
                      <div
                        key={favName}
                        className="grid grid-cols-[1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-muted/50 group"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{favName}</span>
                          <span className="text-xs text-muted-foreground">{categoryName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>${favItem.price}</span>
                          <button onClick={() => toggleFavorite(favName)} className="text-primary">
                            <HeartFilled className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No tienes favoritos aún</h3>
                <p className="text-muted-foreground mb-4">Explora nuestro menú y marca tus platillos favoritos</p>
                <Button variant="outline" onClick={() => (document.querySelector('[data-value="browse"]') as HTMLElement)?.click()}>
                  Explorar menú
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="download">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <FileText className="h-12 w-12 text-primary" />
                  <div>
                    <h3 className="text-xl font-medium">Menú Completo</h3>
                    <p className="text-muted-foreground">
                      Nuestro menú completo incluye todos nuestros platillos, especialidades y bebidas con precios
                      actualizados.
                    </p>
                  </div>
                  <Button className="flex items-center gap-2" asChild>
                    <a href="/menu-completo.pdf" download>
                      <Download className="h-4 w-4" />
                      Descargar PDF
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col items-center text-center space-y-4 p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Menú de Comidas</h4>
                      <p className="text-sm text-muted-foreground">
                        Memelitas, tlayudas, y otras especialidades tradicionales.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                      <a href="/menu-comidas.pdf" download>
                        <Download className="h-3 w-3" />
                        Descargar
                      </a>
                    </Button>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-4 p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Menú de Bebidas</h4>
                      <p className="text-sm text-muted-foreground">Bebidas tradicionales, refrescos, cócteles y más.</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                      <a href="/menu-bebidas.pdf" download>
                        <Download className="h-3 w-3" />
                        Descargar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
