/**
 * Componente Cart - Drawer lateral do carrinho
 * 
 * Exibe um drawer (painel lateral) que desliza da direita
 * mostrando todos os itens do carrinho.
 * 
 * Funcionalidades:
 * - Lista de produtos no carrinho
 * - Controle de quantidade (+ / -)
 * - Botão para remover item
 * - Cálculo do total
 * - Botão para enviar pedido via WhatsApp
 * - Botão para limpar carrinho
 */

'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    isOpen,
    closeCart,
  } = useCart()

  /**
   * Fecha o drawer quando pressionar ESC
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Previne scroll do body quando o drawer está aberto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeCart])

  /**
   * Formata o preço para exibição em reais
   */
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  /**
   * Gera a mensagem do WhatsApp com os itens do carrinho
   * 
   * Formato da mensagem:
   * "Olá! Gostaria de fazer um pedido:
   * 
   * 1x Pelúcia Stitch 30cm - R$ 89,90
   * 2x Pelúcia Angel 30cm - R$ 131,80
   * 
   * Total: R$ 221,70"
   */
  const generateWhatsAppMessage = (): string => {
    let message = 'Olá! Gostaria de fazer um pedido:\n\n'

    items.forEach((item, index) => {
      const subtotal = item.product.preco * item.quantity
      message += `${item.quantity}x ${item.product.nome} - ${formatPrice(subtotal)}\n`
    })

    message += `\nTotal: ${formatPrice(getTotalPrice())}`

    return encodeURIComponent(message)
  }

  /**
   * Abre o WhatsApp com a mensagem do pedido
   * 
   * IMPORTANTE: Substitua o número abaixo pelo número real da loja.
   * Formato: 5511999999999 (código do país + DDD + número, sem espaços ou caracteres especiais)
   * 
   * Exemplo: Se o número for (11) 98765-4321, use: 5511987654321
   */
  const handleWhatsAppOrder = () => {
    // TODO: Substitua pelo número real da loja
    // Formato: código do país (55) + DDD (11) + número (987654321) = 5511987654321
    const phoneNumber = '5586994173176' // SUBSTITUA PELO NÚMERO REAL DA LOJA
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Overlay escuro (fundo) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header do carrinho */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Seu Carrinho</h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fechar carrinho"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Lista de itens */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Imagem do produto */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-200 rounded">
                    {item.product.imagens[0] && (
                      <Image
                        src={item.product.imagens[0]}
                        alt={item.product.nome}
                        fill
                        className="object-cover rounded"
                        sizes="80px"
                      />
                    )}
                  </div>

                  {/* Informações do produto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {item.product.nome}
                    </h3>
                    <p className="text-primary font-bold mt-1">
                      {formatPrice(item.product.preco)}
                    </p>

                    {/* Controle de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>

                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>

                      {/* Botão remover */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remover item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer com total e botões */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(getTotalPrice())}
              </span>
            </div>

            {/* Botão WhatsApp */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar Pedido para o WhatsApp
            </button>

            {/* Botão limpar carrinho */}
            <button
              onClick={clearCart}
              className="w-full text-gray-600 hover:text-gray-800 text-sm transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>
    </>
  )
}
