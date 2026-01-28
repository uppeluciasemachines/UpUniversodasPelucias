/**
 * Componente ProductCard - Card de produto
 * 
 * Exibe um produto com:
 * - Carrossel de imagens (com setas e indicadores)
 * - Nome do produto
 * - Preço em destaque
 * - Botão "Adicionar ao Carrinho"
 * 
 * O carrossel permite navegar entre múltiplas imagens
 * do produto usando setas laterais e indicadores de slide.
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Se não houver imagens, usa uma imagem placeholder
  // Você pode substituir por uma imagem real ou remover esta funcionalidade
  const images =
    product.imagens.length > 0
      ? product.imagens
      : ['https://via.placeholder.com/400x400?text=Sem+Imagem']
  const currentImage = images[currentImageIndex]

  /**
   * pre-carrega as proximas imagens do carrossel
   */
  useEffect(()=>{
    const nextIndex = currentImageIndex + 1

    if (images[nextIndex]) {
      const img = new window.Image()
      img.src = images[nextIndex]
    }
  }, [currentImageIndex, images])

  /**
   * Navega para a imagem anterior no carrossel
   */
  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  /**
   * Navega para a próxima imagem no carrossel
   */
  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  /**
   * Vai diretamente para uma imagem específica
   */
  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  /**
   * Formata o preço para exibição em reais
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Container do carrossel de imagens */}
      <div className="relative aspect-square bg-gray-100">
        {/* Imagem atual */}
        {currentImage && (
          <Image
            src={currentImage}
            alt={product.nome}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Setas de navegação (apenas se houver mais de uma imagem) */}
        {images.length > 1 && (
          <>
            {/* Seta esquerda */}
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

            {/* Seta direita */}
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
              aria-label="Próxima imagem"
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

        {/* Indicadores de slide (bolinhas) */}
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

      {/* Informações do produto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.nome}
        </h3>

        <p className="text-2xl font-bold text-primary mb-4">
          {formatPrice(product.preco)}
        </p>

        {/* Botão adicionar ao carrinho */}
        <div className="flex justify-center">
          <button
          onClick={() => addToCart(product)}
          className=" bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg text-sm whitespace-nowrap inline-flex items-center justify-center"
        >
        Escolher esse
        </button>
        </div>
      </div>
    </div>
  )
}
