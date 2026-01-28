/**
 * Tipos TypeScript para a aplicação UP Pelúcias
 * 
 * Este arquivo define todas as interfaces e tipos utilizados
 * em toda a aplicação, garantindo type-safety e melhor
 * experiência de desenvolvimento.
 */

/**
 * Interface para representar um produto da loja
 * 
 * Estrutura baseada na tabela do Supabase:
 * - id: Identificador único do produto
 * - nome: Nome do produto exibido ao cliente
 * - preco: Preço em reais (número decimal)
 * - categoria: Categoria principal (ex: "Personagens", "Pelúcias Gigantes")
 * - subcategoria: Subcategoria dentro da categoria principal (ex: "Marvel", "Stitch")
 * - imagens: Array de URLs das imagens armazenadas no Supabase Storage
 * - createdAt: Data de criação (opcional, para ordenação)
 */
export interface Product {
  id: string
  nome: string
  preco: number
  categoria: string
  subcategoria: string | null
  imagens: string[]
  createdAt?: string
}

/**
 * Interface para itens no carrinho de compras
 * 
 * Estende Product adicionando a quantidade:
 * - product: Dados completos do produto
 * - quantity: Quantidade selecionada pelo cliente
 */
export interface CartItem {
  product: Product
  quantity: number
}

/**
 * Tipo para filtros de categoria
 * 
 * Permite filtrar por categoria principal e subcategoria
 * - categoria: Categoria principal selecionada (null = todas)
 * - subcategoria: Subcategoria selecionada (null = todas da categoria)
 */
export type CategoryFilter = {
  categoria: string | null
  subcategoria: string | null
}

/**
 * Tipo para opções de navegação
 * 
 * Define os links principais da navbar
 */
export type NavLink = {
  label: string
  href: string
}
