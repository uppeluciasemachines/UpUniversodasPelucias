/**
 * Página inicial da aplicação
 * 
 * Esta é a página principal que exibe:
 * - Barra de filtros (categorias e busca)
 * - Grid de produtos
 * - Listagem de todos os produtos por padrão
 * 
 * Os produtos são filtrados dinamicamente sem recarregar a página.
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import Filters from '@/components/Filters'
import ProductGrid from '@/components/ProductGrid'
import type { Product, CategoryFilter } from '@/types'
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from '@/lib/supabase/products'

export default function Home() {
  // Estado para armazenar todos os produtos carregados
  const [allProducts, setAllProducts] = useState<Product[]>([])
  
  // Estado para controlar o loading
  const [isLoading, setIsLoading] = useState(true)
  
  // Estado para o filtro de categoria/subcategoria
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>({
    categoria: null,
    subcategoria: null,
  })
  
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Carrega todos os produtos quando a página monta
   */
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      try {
        const products = await getAllProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProducts()
  }, [])

  /**
   * Filtra os produtos baseado na categoria/subcategoria e busca
   * 
   * Usa useMemo para otimizar o desempenho, recalculando apenas
   * quando os filtros ou produtos mudam.
   */
  const filteredProducts = useMemo(() => {
    // Se houver termo de busca, filtra por busca
    if (searchTerm.trim()) {
      return allProducts.filter((product) =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Se houver filtro de categoria, aplica o filtro
    if (categoryFilter.categoria || categoryFilter.subcategoria) {
      return allProducts.filter((product) => {
        const matchesCategory =
          !categoryFilter.categoria ||
          product.categoria === categoryFilter.categoria
        const matchesSubcategory =
          !categoryFilter.subcategoria ||
          product.subcategoria === categoryFilter.subcategoria

        return matchesCategory && matchesSubcategory
      })
    }

    // Caso contrário, retorna todos os produtos
    return allProducts
  }, [allProducts, categoryFilter, searchTerm])

  /**
   * Handler para quando o filtro de categoria muda
   */
  const handleFilterChange = (filter: CategoryFilter) => {
    setCategoryFilter(filter)
  }

  /**
   * Handler para quando o termo de busca muda
   */
  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título da página */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pelúcias</h1>

      {/* Barra de filtros */}
      <div className="mb-8">
        <Filters
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>

      {/* Grid de produtos */}
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  )
}
