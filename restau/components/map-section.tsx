export default function MapSection() {
  return (
    <section id="location" className="py-16 bg-muted/50">
      <div className="container flex flex-col text-center mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestra Ubicación</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos ubicados en una zona céntrica y de fácil acceso. ¡Ven a visitarnos!
          </p>
        </div>

        <div className="w-full max-w-4xl h-[400px] rounded-lg overflow-hidden  flex flex-col text-center mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125882.67634428777!2d-97.2309641!3d17.0927026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c7279417fce193%3A0xc1e6513ffb66b023!2sRestaurante%20campestre%20familiar%20LA%20TIROLESA!5e0!3m2!1ses!2smx!4v1682458332961!5m2!1ses!2smx"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="mt-8">
          <p className="font-medium">Restaurant campestre La Tirolesa</p>
          <p className="text-muted-foreground">Las presas el estudiante tlalixtac de cabrera San Andrés Huayapam, 68270 Oaxaca de Juárez, Oax.</p>
        </div>
      </div>
    </section>
  )
}
