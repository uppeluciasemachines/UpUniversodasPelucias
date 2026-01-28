# UP Pelúcias - Catálogo Digital

Aplicação de catálogo digital para a loja UP Pelúcias, desenvolvida com Next.js 16, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Backend e Storage)
- **Context API** (Gerenciamento de estado do carrinho)

## 📋 Funcionalidades

- ✅ Listagem de produtos com imagens
- ✅ Filtros por categoria e subcategoria
- ✅ Busca de produtos
- ✅ Carrinho de compras com persistência
- ✅ Integração com WhatsApp para envio de pedidos
- ✅ Design responsivo (mobile-first)
- ✅ Carrossel de imagens nos cards de produto
- ✅ Performance otimizada com lazy loading

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd up-pelucias
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Supabase

Siga o guia completo em [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) para:
- Criar o projeto no Supabase
- Configurar a tabela de produtos
- Configurar o Storage para imagens
- Obter as chaves de API

### 4. Configure as variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

2. Preencha as variáveis com os valores do seu projeto Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 5. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
up-pelucias/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── Navbar.tsx         # Barra de navegação
│   ├── ProductCard.tsx    # Card de produto
│   ├── ProductGrid.tsx    # Grid de produtos
│   ├── Cart.tsx           # Drawer do carrinho
│   └── Filters.tsx        # Barra de filtros
├── contexts/              # Context API
│   └── CartContext.tsx    # Context do carrinho
├── lib/                   # Bibliotecas e serviços
│   └── supabase/          # Cliente e serviços do Supabase
│       ├── client.ts      # Cliente Supabase
│       └── products.ts    # Funções de produtos
├── types/                 # Tipos TypeScript
│   └── index.ts           # Interfaces e tipos
└── SUPABASE_SETUP.md      # Guia de integração com Supabase
```

## 🎨 Personalização

### Alterar número do WhatsApp

Edite o arquivo `components/Cart.tsx` e altere a variável `phoneNumber`:

```typescript
const phoneNumber = '5511999999999' // Substitua pelo número real
```

### Alterar cores do tema

Edite o arquivo `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#FF6B35', // Cor principal (laranja)
    dark: '#E55A2B',
  },
  secondary: {
    DEFAULT: '#4ECDC4', // Cor secundária (verde)
  },
}
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🔒 Segurança

- As chaves do Supabase usadas são públicas (anon key) e seguras para uso no frontend
- Row Level Security (RLS) está configurado no Supabase para proteger os dados
- O carrinho é armazenado apenas no localStorage do navegador

## 📚 Documentação

- [Guia de Integração com Supabase](./SUPABASE_SETUP.md)
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Supabase](https://supabase.com/docs)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso exclusivo da UP Pelúcias.

---

Desenvolvido com ❤️ para UP Pelúcias
