/**
 * Cliente Supabase para Next.js
 * 
 * Este arquivo configura e exporta o cliente do Supabase
 * para ser usado em toda a aplicação.
 * 
 * IMPORTANTE: Configure as variáveis de ambiente:
 * - NEXT_PUBLIC_SUPABASE_URL: URL do seu projeto Supabase
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Chave pública anônima do Supabase
 * 
 * Como obter essas informações:
 * 1. Acesse seu projeto no Supabase Dashboard
 * 2. Vá em Settings > API
 * 3. Copie a "Project URL" e a "anon public" key
 */

import { createClient } from '@supabase/supabase-js'
import type { Product } from '@/types'

// Verifica se as variáveis de ambiente estão configuradas
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL não está configurada')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurada')
}

/**
 * Cria e exporta o cliente Supabase
 * 
 * Este cliente será usado para:
 * - Buscar produtos da tabela 'products'
 * - Acessar imagens do Storage bucket 'produtos'
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * Tipo para a resposta de produtos do Supabase
 * Facilita o type-checking ao buscar dados
 */
export type SupabaseProduct = {
  id: string
  nome: string
  preco: number
  categoria: string
  subcategoria: string | null
  imagens: string[]
  created_at?: string
}
