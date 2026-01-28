/**
 * Componente ProductGrid - Grid de produtos
 * 
 * Exibe os produtos em um grid responsivo.
 * Mostra skeleton loading enquanto os produtos estão carregando.
 */

'use client'

import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export default function ProductGrid({
  products,
  isLoading = false,
}: ProductGridProps) {

  // Ordena produtos em ordem alfabética ignorando "Pelúcia"
  const sortedProducts = [...products].sort((a, b) => {
    const normalizeName = (name: string) =>
      name
        .toLowerCase()
        .replace(/^pelúcia\s+/i, '') // remove "Pelúcia " do início
        .trim()

    return normalizeName(a.nome).localeCompare(
      normalizeName(b.nome),
      'pt-BR'
    )
  })

  // Skeleton loading enquanto carrega
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Se não houver produtos, exibe mensagem
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Nenhum produto encontrado.
        </p>
      </div>
    )
  }

  // Grid de produtos (AGORA ORDENADO)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
