'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/types'

// Cache global de imagens ja carregadas (persiste entre renders e componentes)
const imageCache = new Set<string>()

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const images =
    product.imagens.length > 0
      ? product.imagens
      : ['https://via.placeholder.com/400x400?text=Sem+Imagem']
  const currentImage = images[currentImageIndex]

  // IntersectionObserver: so carrega a imagem quando o card fica visivel na tela
  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // para de observar apos ficar visivel
        }
      },
      { rootMargin: '200px' } // comeca a carregar 200px antes de aparecer
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Pre-carrega a proxima imagem do carrossel (com cache)
  useEffect(() => {
    if (typeof window === 'undefined' || !isVisible) return

    const nextIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    const nextSrc = images[nextIndex]

    if (nextSrc && !imageCache.has(nextSrc)) {
      const img = new window.Image()
      img.src = nextSrc
      img.onload = () => imageCache.add(nextSrc)
    }
  }, [currentImageIndex, images, isVisible])

  // Reseta o estado de loading quando muda de imagem
  useEffect(() => {
    if (imageCache.has(currentImage)) {
      setIsImageLoaded(true) // ja esta em cache, mostra direto
    } else {
      setIsImageLoaded(false)
    }
  }, [currentImage])

  const handleImageLoad = useCallback(() => {
    imageCache.add(currentImage)
    setIsImageLoaded(true)
  }, [currentImage])

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Container do carrossel de imagens */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {/* Skeleton enquanto carrega */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Imagem atual - so renderiza se o card esta visivel */}
        {isVisible && currentImage && (
          <img
            src={currentImage || "/placeholder.svg"}
            alt={product.nome}
            width={400}
            height={400}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            decoding="async"
          />
        )}

        {/* Setas de navegacao */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
              aria-label="Imagem anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
              aria-label="Proxima imagem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores de slide */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-primary w-4'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Informacoes do produto */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight line-clamp-2">
          {product.nome}
        </h3>

        <p className="text-2xl font-bold text-primary mb-4">
          {formatPrice(product.preco)}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => addToCart(product)}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg text-sm whitespace-nowrap inline-flex items-center justify-center"
          >
            Escolher esse
          </button>
        </div>
      </div>
    </div>
  )
}