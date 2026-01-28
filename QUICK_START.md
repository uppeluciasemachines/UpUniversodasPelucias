# 🚀 Início Rápido - UP Pelúcias

Guia rápido para começar a usar a aplicação em 5 minutos.

## ⚡ Passos Rápidos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Supabase (5 minutos)

#### 2.1. Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e a chave anon (Settings > API)

#### 2.2. Criar Tabela
No SQL Editor do Supabase, execute:

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  imagens TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de produtos"
  ON products FOR SELECT
  USING (true);
```

#### 2.3. Criar Storage
1. Vá em Storage > Create bucket
2. Nome: `produtos`
3. Marque como **público**
4. Adicione política de leitura pública

### 3. Configurar Variáveis de Ambiente

Crie `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 4. Inserir Dados de Teste

Use o arquivo `supabase-example-data.sql` ou insira manualmente:

```sql
INSERT INTO products (nome, preco, categoria, subcategoria) VALUES
  ('Pelúcia Stitch 30cm', 89.90, 'Personagens', 'Stitch');
```

### 5. Adicionar Imagens

1. Faça upload no Storage (bucket `produtos`)
2. Copie a URL pública
3. Atualize o produto:

```sql
UPDATE products
SET imagens = ARRAY['https://seu-projeto.supabase.co/storage/v1/object/public/produtos/stitch.jpg']
WHERE nome = 'Pelúcia Stitch 30cm';
```

### 6. Executar

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## ✅ Checklist

- [ ] Dependências instaladas
- [ ] Projeto Supabase criado
- [ ] Tabela `products` criada
- [ ] Bucket `produtos` criado (público)
- [ ] Variáveis de ambiente configuradas
- [ ] Produtos inseridos
- [ ] Imagens adicionadas
- [ ] Aplicação rodando

## 🆘 Problemas Comuns

**Erro: "NEXT_PUBLIC_SUPABASE_URL não está configurada"**
- Verifique se o arquivo `.env.local` existe
- Reinicie o servidor após criar/editar o arquivo

**Produtos não aparecem**
- Verifique se há produtos na tabela
- Verifique as políticas RLS

**Imagens não carregam**
- Verifique se o bucket está público
- Verifique se as URLs estão corretas

## 📚 Documentação Completa

Para mais detalhes, consulte:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Guia completo do Supabase
- [README.md](./README.md) - Documentação geral

---

**Pronto!** Sua aplicação está funcionando! 🎉
