"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const images = [
  {
    src: "/8f.jpg?height=600&width=1200",
    alt: "Plato principal del restaurante",
  },
  {
    src: "/1.jpeg?height=600&width=1200",
    alt: "Interior del restaurante",
  },
  {
    src: "/2.jpeg?height=600&width=1200",
    alt: "Evento especial en el restaurante",
  },
  {
    src: "/3.jpeg?height=600&width=1200",
    alt: "Evento especial en el restaurante",
  },
  {
    src: "/4.jpeg?height=600&width=1200",
    alt: "Evento especial en el restaurante",
  },
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [currentIndex])

  return (
    <div className="relative h-[500px] w-full">
      <div className="h-full w-full relative">
        <Image
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Restaurant Campestre La Tirolesa</h1>
            <p className="text-xl md:text-2xl mb-8">Disfruta de la mejor experiencia gastronómica</p>
            <Button size="lg" className="rounded-full">
              <Link href="/menu" className="text-sm font-medium transition-colors hover:text-primary">
                Menú
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
        <span className="sr-only">Anterior</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
        <span className="sr-only">Siguiente</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          >
            <span className="sr-only">Diapositiva {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
