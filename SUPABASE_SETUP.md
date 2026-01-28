# Guia Completo de Integração com Supabase

Este guia explica passo a passo como configurar o Supabase para a aplicação UP Pelúcias.

---

## 📋 Índice

1. [Criar Projeto no Supabase](#1-criar-projeto-no-supabase)
2. [Criar Tabela de Produtos](#2-criar-tabela-de-produtos)
3. [Configurar Storage para Imagens](#3-configurar-storage-para-imagens)
4. [Configurar Variáveis de Ambiente](#4-configurar-variáveis-de-ambiente)
5. [Inserir Dados de Exemplo](#5-inserir-dados-de-exemplo)
6. [Upload de Imagens](#6-upload-de-imagens)
7. [Testar a Integração](#7-testar-a-integração)

---

## 1. Criar Projeto no Supabase

### Passo 1.1: Acessar o Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta gratuita
3. Clique em **"New Project"**

### Passo 1.2: Configurar o Projeto
1. **Nome do Projeto**: `up-pelucias` (ou qualquer nome de sua preferência)
2. **Database Password**: Crie uma senha forte e **ANOTE** (você precisará dela
3. **Region**: Escolha a região mais próxima (ex: `South America (São Paulo)`)
4. Clique em **"Create new project"**
5. Aguarde alguns minutos enquanto o projeto é criado

---

## 2. Criar Tabela de Produtos

### Passo 2.1: Acessar o SQL Editor
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**

### Passo 2.2: Criar a Tabela
Cole o seguinte SQL e execute:

```sql
-- Cria a tabela de produtos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  imagens TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cria índices para melhorar a performance das buscas
CREATE INDEX idx_products_categoria ON products(categoria);
CREATE INDEX idx_products_subcategoria ON products(subcategoria);
CREATE INDEX idx_products_nome ON products USING gin(to_tsvector('portuguese', nome));

-- Habilita Row Level Security (RLS) - permite leitura pública
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Cria política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de produtos"
  ON products FOR SELECT
  USING (true);
```

### Passo 2.3: Verificar a Tabela
1. Vá em **"Table Editor"** no menu lateral
2. Você deve ver a tabela `products` criada
3. Clique nela para ver a estrutura

---

## 3. Configurar Storage para Imagens

### Passo 3.1: Criar o Bucket
1. No menu lateral, clique em **"Storage"**
2. Clique em **"Create a new bucket"**
3. Configure:
   - **Name**: `produtos`
   - **Public bucket**: ✅ **MARQUE ESTA OPÇÃO** (importante para acesso público às imagens)
4. Clique em **"Create bucket"**

### Passo 3.2: Configurar Políticas de Acesso
1. Clique no bucket `produtos` que você acabou de criar
2. Vá na aba **"Policies"**
3. Clique em **"New Policy"**
4. Selecione **"For full customization"**
5. Cole a seguinte política:

```sql
-- Política para permitir leitura pública de imagens
CREATE POLICY "Permitir leitura pública de imagens"
ON storage.objects FOR SELECT
USING (bucket_id = 'produtos');
```

6. Clique em **"Review"** e depois em **"Save policy"**

### Passo 3.3: Configurar Upload (Opcional - se quiser fazer upload via código)
Se você quiser fazer upload de imagens programaticamente, adicione também:

```sql
-- Política para permitir upload (apenas para usuários autenticados)
-- Por enquanto, vamos fazer upload manual via interface
CREATE POLICY "Permitir upload de imagens"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'produtos');
```

---

## 4. Configurar Variáveis de Ambiente

### Passo 4.1: Obter as Chaves do Supabase
1. No menu lateral, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Você verá:
   - **Project URL**: Copie este valor
   - **anon public** key: Copie este valor

### Passo 4.2: Criar Arquivo .env.local
1. Na raiz do projeto Next.js, crie um arquivo chamado `.env.local`
2. Adicione as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

**Exemplo:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI4MCwiZXhwIjoxOTU0NTQzMjgwfQ.exemplo
```

### Passo 4.3: Reiniciar o Servidor
Após criar o `.env.local`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

---

## 5. Inserir Dados de Exemplo

### Passo 5.1: Via SQL Editor
1. Vá em **"SQL Editor"**
2. Cole o seguinte SQL (ajuste os valores conforme necessário):

```sql
-- Inserir produtos de exemplo
INSERT INTO products (nome, preco, categoria, subcategoria, imagens) VALUES
  ('Pelúcia Stitch 30cm', 89.90, 'Personagens', 'Stitch', ARRAY[]::TEXT[]),
  ('Pelúcia Angel 30cm', 65.90, 'Personagens', 'Stitch', ARRAY[]::TEXT[]),
  ('Pelúcia Fúria da Noite Banguela 30cm', 79.90, 'Personagens', 'Como Treinar o Seu Dragão', ARRAY[]::TEXT[]),
  ('Pelúcia Fúria da Luz 30cm', 56.90, 'Personagens', 'Como Treinar o Seu Dragão', ARRAY[]::TEXT[]),
  ('Pelúcia Homem-Aranha 30cm', 95.90, 'Personagens', 'Marvel', ARRAY[]::TEXT[]),
  ('Pelúcia Ursinho Pooh 30cm', 75.90, 'Personagens', 'Ursinho Pooh', ARRAY[]::TEXT[]);
```

3. Execute o SQL

### Passo 5.2: Via Table Editor (Interface Gráfica)
1. Vá em **"Table Editor"**
2. Clique na tabela `products`
3. Clique em **"Insert row"**
4. Preencha os campos:
   - **nome**: `Pelúcia Stitch 30cm`
   - **preco**: `89.90`
   - **categoria**: `Personagens`
   - **subcategoria**: `Stitch`
   - **imagens**: Deixe vazio por enquanto (vamos adicionar depois)
5. Clique em **"Save"**
6. Repita para outros produtos

---

## 6. Upload de Imagens

### Passo 6.1: Preparar as Imagens
1. Prepare as imagens dos produtos
2. Recomendações:
   - Formato: JPG ou PNG
   - Tamanho: Máximo 2MB por imagem
   - Dimensões: 800x800px ou similar (quadrado)

### Passo 6.2: Fazer Upload via Interface
1. Vá em **"Storage"** > **"produtos"**
2. Clique em **"Upload file"**
3. Selecione a imagem
4. **IMPORTANTE**: Use um nome descritivo, ex: `stitch-30cm-1.jpg`
5. Clique em **"Upload"**

### Passo 6.3: Obter a URL da Imagem
1. Após o upload, clique na imagem
2. Você verá a URL pública, algo como:
   ```
   https://abcdefghijklmnop.supabase.co/storage/v1/object/public/produtos/stitch-30cm-1.jpg
   ```
3. Copie esta URL completa

### Passo 6.4: Adicionar URLs às Imagens do Produto
1. Vá em **"Table Editor"** > **"products"**
2. Edite o produto correspondente
3. No campo **"imagens"**, adicione a URL como um array:
   ```json
   ["https://abcdefghijklmnop.supabase.co/storage/v1/object/public/produtos/stitch-30cm-1.jpg"]
   ```
4. Para múltiplas imagens:
   ```json
   [
     "https://...supabase.co/storage/v1/object/public/produtos/stitch-30cm-1.jpg",
     "https://...supabase.co/storage/v1/object/public/produtos/stitch-30cm-2.jpg"
   ]
   ```
5. Clique em **"Save"**

### Passo 6.5: Atualizar via SQL (Alternativa)
Se preferir, você pode atualizar via SQL:

```sql
UPDATE products
SET imagens = ARRAY[
  'https://seu-projeto.supabase.co/storage/v1/object/public/produtos/stitch-30cm-1.jpg',
  'https://seu-projeto.supabase.co/storage/v1/object/public/produtos/stitch-30cm-2.jpg'
]
WHERE nome = 'Pelúcia Stitch 30cm';
```

---

## 7. Testar a Integração

### Passo 7.1: Verificar Conexão
1. Inicie o servidor Next.js:
   ```bash
   npm run dev
   ```
2. Acesse `http://localhost:3000`
3. Abra o Console do navegador (F12)
4. Verifique se não há erros de conexão com o Supabase

### Passo 7.2: Verificar Produtos
1. Na página inicial, você deve ver os produtos cadastrados
2. Se não aparecer nada, verifique:
   - Se as variáveis de ambiente estão corretas
   - Se a tabela tem produtos
   - Se as políticas RLS estão configuradas

### Passo 7.3: Verificar Imagens
1. Os produtos devem exibir as imagens
2. Se as imagens não carregarem, verifique:
   - Se o bucket está público
   - Se as URLs estão corretas
   - Se as políticas de Storage estão configuradas

---

## 🔧 Troubleshooting

### Erro: "NEXT_PUBLIC_SUPABASE_URL não está configurada"
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se as variáveis começam com `NEXT_PUBLIC_`
- Reinicie o servidor após criar/editar o `.env.local`

### Erro: "Row Level Security policy violation"
- Verifique se a política RLS foi criada corretamente
- Execute novamente o SQL da política de leitura pública

### Imagens não carregam
- Verifique se o bucket está marcado como público
- Verifique se a política de leitura do Storage está configurada
- Verifique se as URLs das imagens estão corretas no banco

### Produtos não aparecem
- Verifique se há produtos na tabela
- Verifique se os nomes das colunas estão corretos (case-sensitive)
- Verifique o console do navegador para erros

---

## 📚 Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Checklist Final

- [ ] Projeto criado no Supabase
- [ ] Tabela `products` criada
- [ ] Índices criados
- [ ] Políticas RLS configuradas
- [ ] Bucket `produtos` criado e configurado como público
- [ ] Políticas de Storage configuradas
- [ ] Variáveis de ambiente configuradas no `.env.local`
- [ ] Produtos inseridos na tabela
- [ ] Imagens enviadas para o Storage
- [ ] URLs das imagens adicionadas aos produtos
- [ ] Aplicação testada e funcionando

---

**Pronto!** Sua aplicação está configurada e pronta para uso! 🎉
