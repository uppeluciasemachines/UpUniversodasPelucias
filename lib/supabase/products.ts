/**
 * Serviço de produtos do Supabase
 * 
 * Este arquivo contém todas as funções para interagir
 * com a tabela de produtos no Supabase.
 * 
 * Funções disponíveis:
 * - getAllProducts: Busca todos os produtos
 * - getProductsByCategory: Filtra por categoria e subcategoria
 * - searchProducts: Busca produtos por nome
 * - getProductById: Busca um produto específico
 */

import { supabase } from './client'
import type { Product, CategoryFilter } from '@/types'

/**
 * Converte um produto do formato Supabase para o formato da aplicação
 * 
 * O Supabase retorna campos em snake_case (created_at),
 * enquanto nossa aplicação usa camelCase (createdAt).
 * Esta função faz a conversão.
 */
function mapSupabaseProductToProduct(supabaseProduct: any): Product {
  return {
    id: supabaseProduct.id,
    nome: supabaseProduct.nome,
    preco: supabaseProduct.preco,
    categoria: supabaseProduct.categoria,
    subcategoria: supabaseProduct.subcategoria,
    imagens: supabaseProduct.imagens || [],
    createdAt: supabaseProduct.created_at,
  }
}

/**
 * Busca todos os produtos da loja
 * 
 * @returns Array de produtos ordenados por data de criação (mais recentes primeiro)
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }

    return (data || []).map(mapSupabaseProductToProduct)
  } catch (error) {
    console.error('Erro ao buscar todos os produtos:', error)
    return []
  }
}

/**
 * Busca produtos filtrados por categoria e subcategoria
 * 
 * @param filter - Objeto com categoria e subcategoria para filtrar
 * @returns Array de produtos que correspondem ao filtro
 * 
 * Exemplo de uso:
 * - { categoria: 'Personagens', subcategoria: 'Marvel' } -> Apenas produtos Marvel
 * - { categoria: 'Personagens', subcategoria: null } -> Todos os produtos de Personagens
 * - { categoria: null, subcategoria: null } -> Todos os produtos
 */
export async function getProductsByCategory(
  filter: CategoryFilter
): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*')

    // Se uma categoria foi especificada, filtra por ela
    if (filter.categoria) {
      query = query.eq('categoria', filter.categoria)
    }

    // Se uma subcategoria foi especificada, filtra por ela também
    if (filter.subcategoria) {
      query = query.eq('subcategoria', filter.subcategoria)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos por categoria:', error)
      throw error
    }

    return (data || []).map(mapSupabaseProductToProduct)
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error)
    return []
  }
}

/**
 * Busca produtos pelo nome (busca textual)
 * 
 * @param searchTerm - Termo de busca digitado pelo usuário
 * @returns Array de produtos cujo nome contém o termo de busca
 * 
 * A busca é case-insensitive e busca em qualquer parte do nome.
 */
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    if (!searchTerm.trim()) {
      return getAllProducts()
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('nome', `%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }

    return (data || []).map(mapSupabaseProductToProduct)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

/**
 * Busca um produto específico pelo ID
 * 
 * @param id - ID do produto
 * @returns O produto encontrado ou null se não existir
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
      return null
    }

    return mapSupabaseProductToProduct(data)
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error)
    return null
  }
}

/**
 * Busca todas as categorias únicas disponíveis
 * 
 * Útil para popular os botões de filtro de categoria principal
 * @returns Array de strings com os nomes das categorias
 */
export async function getCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('categoria')

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    // Remove duplicatas e retorna array único
    const uniqueCategories = Array.from(
      new Set(data?.map((item) => item.categoria) || [])
    )
    return uniqueCategories
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

/**
 * Busca todas as subcategorias de uma categoria específica
 * 
 * Útil para exibir os botões de subcategoria quando uma categoria
 * principal é selecionada.
 * 
 * @param categoria - Nome da categoria principal
 * @returns Array de strings com os nomes das subcategorias
 */
export async function getSubcategories(
  categoria: string
): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('subcategoria')
      .eq('categoria', categoria)
      .not('subcategoria', 'is', null)

    if (error) {
      console.error('Erro ao buscar subcategorias:', error)
      return []
    }

    // Remove duplicatas e valores null
    const uniqueSubcategories = Array.from(
      new Set(
        data
          ?.map((item) => item.subcategoria)
          .filter((sub) => sub !== null) || []
      )
    )
    return uniqueSubcategories as string[]
  } catch (error) {
    console.error('Erro ao buscar subcategorias:', error)
    return []
  }
}
