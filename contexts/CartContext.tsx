/**
 * Context API para gerenciamento do carrinho de compras
 */

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Product, CartItem } from '@/types'

/**
 * Interface do contexto do carrinho
 * Define todas as funções e valores disponíveis
 */
interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

// Cria o contexto com valor padrão undefined
const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * Provider do contexto do carrinho
 * 
 * Envolve a aplicação e fornece o estado do carrinho
 * para todos os componentes filhos.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Estado do carrinho (itens adicionados)
  const [items, setItems] = useState<CartItem[]>([])
  
  // Estado para controlar se o drawer do carrinho está aberto
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Carrega o carrinho do localStorage quando o componente monta
   * 
   * Isso mantém o carrinho persistente mesmo após recarregar a página.
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('up-pelucias-cart')
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Erro ao carregar carrinho do localStorage:', error)
        }
      }
    }
  }, [])

  /**
   * Salva o carrinho no localStorage sempre que ele muda
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('up-pelucias-cart', JSON.stringify(items))
    }
  }, [items])

  /**
   * Adiciona um produto ao carrinho
   * 
   * Se o produto já estiver no carrinho, aumenta a quantidade.
   * Caso contrário, adiciona como novo item com quantidade 1.
   */
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        // Produto já existe, aumenta a quantidade
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Produto novo, adiciona ao carrinho
        return [...prevItems, { product, quantity: 1 }]
      }
    })
    
    // Abre o carrinho automaticamente ao adicionar um item
    
  }

  /**
   * Remove um produto completamente do carrinho
   * 
   * @param productId - ID do produto a ser removido
   */
  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    )
  }

  /**
   * Atualiza a quantidade de um produto no carrinho
   * 
   * @param productId - ID do produto
   * @param quantity - Nova quantidade (se for 0 ou menor, remove o item)
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  /**
   * Limpa todo o carrinho
   */
  const clearCart = () => {
    setItems([])
  }

  /**
   * Calcula o preço total do carrinho
   * 
   * Multiplica o preço de cada produto pela quantidade
   * e soma tudo.
   * 
   * @returns Total em reais (número decimal)
   */
  const getTotalPrice = (): number => {
    return items.reduce(
      (total, item) => total + item.product.preco * item.quantity,
      0
    )
  }

  /**
   * Calcula o total de itens no carrinho
   * 
   * Soma todas as quantidades de todos os produtos.
   * 
   * @returns Total de itens (número inteiro)
   */
  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  /**
   * Abre o drawer do carrinho
   */
  const openCart = () => setIsOpen(true)

  /**
   * Fecha o drawer do carrinho
   */
  const closeCart = () => setIsOpen(false)

  /**
   * Alterna o estado do drawer (abre se estiver fechado, fecha se estiver aberto)
   */
  const toggleCart = () => setIsOpen((prev) => !prev)

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Hook personalizado para usar o contexto do carrinho
 * 
 * Facilita o acesso ao carrinho em qualquer componente.
 * Lança um erro se usado fora do CartProvider.
 * 
 * @returns Objeto com todas as funções e valores do carrinho
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
