/**
 * Layout raiz da aplicação
 * 
 * Este é o layout principal que envolve todas as páginas.
 * Aqui configuramos:
 * - Metadata da aplicação
 * - Providers globais (CartProvider)
 * - Estilos globais (Tailwind CSS)
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import Navbar from '@/components/Navbar'
import Cart from '@/components/Cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UP Universo das Pelúcias',
  description: 'Encontre as melhores pelúcias de personagens, animes e muito mais!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* Provider do carrinho - disponibiliza o contexto para toda a aplicação */}
        <CartProvider>
          {/* Navbar fixa no topo */}
          <Navbar />
          
          {/* Conteúdo principal com padding-top para compensar a navbar fixa */}
          <main className="pt-20">
            {children}
          </main>
          
          {/* Drawer do carrinho */}
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
}
