import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, PhoneIcon as WhatsApp } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Image src="/la-tirolesa.png" alt="Restaurant compestre La Tirolesa  " width={150} height={50} className="h-12 w-auto" />
            </div>
            <p className="mb-4">
              Ofreciendo la mejor experiencia gastronómica desde 2005. Nuestro compromiso es brindar platillos de
              calidad en un ambiente acogedor.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/Campestrelike/about"
                className="hover:text-white/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-white/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-white/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://wa.me/1234567890"
                className="hover:text-white/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Lunes - Jueves</span>
                <span>12:00 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Viernes - Sábado</span>
                <span>12:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span>12:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>Las presas el estudiante tlalixtac de cabrera San Andrés Huayapam, 68270 Oaxaca de Juárez, Oax.</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+52 (55) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <WhatsApp className="h-5 w-5 mr-2" />
                <span>+52 (55) 8765-4321</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@elsabor.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} La Tirolesa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
