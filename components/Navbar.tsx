/**
 * Componente Navbar - Barra de navegação principal
 */

'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'


export default function Navbar() {
  const { getTotalItems, toggleCart } = useCart()
  const totalItems = getTotalItems()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            <img src="/logo/logo.png" alt="UP Pelúcias"
             width={90}
              height={40}
             />
          </Link>

          {/* Links de navegação */}
          {/* <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Pelúcias
            </Link>
            <Link
              href="/#novidades"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Novidades
            </Link>
            <Link
              href="/#promocoes"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Promoções
            </Link>
          </div> */}

          {/* Botão do carrinho com badge */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Abrir carrinho"
          >
            {/* Ícone do carrinho (SVG) */}
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {/* Badge com quantidade de itens */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
