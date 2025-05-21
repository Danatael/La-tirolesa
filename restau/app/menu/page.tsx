import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MenuViewer from "@/components/menu-viewer"

export const metadata = {
  title: "Menú - La Tirolesa",
  description:
    "Descubre nuestra variedad de platillos tradicionales, incluyendo memelitas, tlayudas y bebidas refrescantes.",
}

export default function MenuPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nuestro Menú</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra variedad de platillos tradicionales, incluyendo memelitas, tlayudas y bebidas
              refrescantes.
            </p>
          </div>

          <MenuViewer />
        </div>
      </main>
      <Footer />
    </div>
  )
}
