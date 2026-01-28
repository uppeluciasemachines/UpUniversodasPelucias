/**
 * Componente Filters - Barra de filtros de categoria
 * 
 * Exibe botões de filtro para:
 * - Categorias principais (Todos, Personagens, Pelúcias Gigantes, etc.)
 * - Subcategorias (quando uma categoria principal está selecionada)
 * - Campo de busca
 * 
 * Os filtros são dinâmicos e não recarregam a página.
 */

'use client'

import { useState, useEffect } from 'react'
import type { CategoryFilter } from '@/types'
import { getCategories, getSubcategories } from '@/lib/supabase/products'

interface FiltersProps {
  onFilterChange: (filter: CategoryFilter) => void
  onSearchChange: (searchTerm: string) => void
}

export default function Filters({
  onFilterChange,
  onSearchChange,
}: FiltersProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Carrega as categorias principais ao montar o componente
   */
  useEffect(() => {
    async function loadCategories() {
      const cats = await getCategories()
      setCategories(cats)
    }
    loadCategories()
  }, [])

  /**
   * Carrega as subcategorias quando uma categoria principal é selecionada
   */
  useEffect(() => {
    async function loadSubcategories() {
      if (selectedCategory) {
        const subs = await getSubcategories(selectedCategory)
        setSubcategories(subs)
        // Reseta a subcategoria selecionada quando muda a categoria principal
        setSelectedSubcategory(null)
      } else {
        setSubcategories([])
        setSelectedSubcategory(null)
      }
    }
    loadSubcategories()
  }, [selectedCategory])

  /**
   * Atualiza o filtro sempre que categoria ou subcategoria muda
   */
  // useEffect(() => {
  //   onFilterChange({
  //     categoria: selectedCategory,
  //     subcategoria: selectedSubcategory,
  //   })
  // }, [selectedCategory, selectedSubcategory, onFilterChange])

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    setSelectedSubcategory(null)
  
    onFilterChange({
      categoria: category,
      subcategoria: null,
    })
  }

  const handleSubcategorySelect = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory)
  
    onFilterChange({
      categoria: selectedCategory,
      subcategoria: subcategory,
    })
  }

  /**
   * Atualiza a busca quando o termo de busca muda
   */
  useEffect(() => {
    onSearchChange(searchTerm)
  }, [searchTerm, onSearchChange])

  // /**
  //  * Handler para selecionar uma categoria principal
  //  */
  // const handleCategorySelect = (category: string | null) => {
  //   setSelectedCategory(category)
  // }

  // /**
  //  * Handler para selecionar uma subcategoria
  //  */
  // const handleSubcategorySelect = (subcategory: string | null) => {
  //   setSelectedSubcategory(subcategory)
  // }

  return (
    <div className="space-y-4">
      {/* Campo de busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Digite aqui a pelúcia que você busca"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Botões de categoria principal */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => handleCategorySelect(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
            selectedCategory === null
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Botões de subcategoria (apenas se uma categoria principal estiver selecionada) */}
      {selectedCategory && subcategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => handleSubcategorySelect(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              selectedSubcategory === null
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {subcategories.map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => handleSubcategorySelect(subcategory)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedSubcategory === subcategory
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
