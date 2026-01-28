/**
 * Declaração de tipos para variáveis de ambiente
 * 
 * Garante type-safety ao usar process.env no código.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
  }
}
