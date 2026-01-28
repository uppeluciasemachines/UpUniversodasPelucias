-- ============================================
-- DADOS DE EXEMPLO PARA A TABELA PRODUCTS
-- ============================================
-- 
-- Este arquivo contém exemplos de produtos para popular
-- a tabela do Supabase durante o desenvolvimento.
--
-- INSTRUÇÕES:
-- 1. Acesse o Supabase Dashboard > SQL Editor
-- 2. Cole este SQL e execute
-- 3. Depois, faça upload das imagens no Storage
-- 4. Atualize as URLs das imagens nos produtos
--
-- ============================================

-- Limpar dados existentes (opcional - use com cuidado!)
-- DELETE FROM products;

-- Inserir produtos de exemplo
INSERT INTO products (nome, preco, categoria, subcategoria, imagens) VALUES
  -- Personagens - Stitch
  ('Pelúcia Stitch 30cm', 89.90, 'Personagens', 'Stitch', ARRAY[]::TEXT[]),
  ('Pelúcia Angel 30cm', 65.90, 'Personagens', 'Stitch', ARRAY[]::TEXT[]),
  
  -- Personagens - Como Treinar o Seu Dragão
  ('Pelúcia Fúria da Noite Banguela 30cm', 79.90, 'Personagens', 'Como Treinar o Seu Dragão', ARRAY[]::TEXT[]),
  ('Pelúcia Fúria da Luz 30cm', 56.90, 'Personagens', 'Como Treinar o Seu Dragão', ARRAY[]::TEXT[]),
  
  -- Personagens - Marvel
  ('Pelúcia Homem-Aranha 30cm', 95.90, 'Personagens', 'Marvel', ARRAY[]::TEXT[]),
  ('Pelúcia Capitão América 30cm', 92.90, 'Personagens', 'Marvel', ARRAY[]::TEXT[]),
  ('Pelúcia Hulk 30cm', 98.90, 'Personagens', 'Marvel', ARRAY[]::TEXT[]),
  
  -- Personagens - Ursinho Pooh
  ('Pelúcia Ursinho Pooh 30cm', 75.90, 'Personagens', 'Ursinho Pooh', ARRAY[]::TEXT[]),
  ('Pelúcia Tigrão 30cm', 73.90, 'Personagens', 'Ursinho Pooh', ARRAY[]::TEXT[]),
  
  -- Personagens - Bob Esponja
  ('Pelúcia Bob Esponja 30cm', 68.90, 'Personagens', 'Bob Esponja', ARRAY[]::TEXT[]),
  ('Pelúcia Patrick 30cm', 66.90, 'Personagens', 'Bob Esponja', ARRAY[]::TEXT[]),
  
  -- Personagens - Hello Kitty
  ('Pelúcia Hello Kitty 30cm', 82.90, 'Personagens', 'Hello-Kitty', ARRAY[]::TEXT[]),
  ('Pelúcia Kuromi 30cm', 84.90, 'Personagens', 'Hello-Kitty', ARRAY[]::TEXT[]),
  
  -- Personagens - Animes
  ('Pelúcia Pikachu 30cm', 88.90, 'Personagens', 'Animes', ARRAY[]::TEXT[]),
  ('Pelúcia Naruto 30cm', 91.90, 'Personagens', 'Animes', ARRAY[]::TEXT[]),
  
  -- Personagens - Mario
  ('Pelúcia Mario 30cm', 87.90, 'Personagens', 'Mario', ARRAY[]::TEXT[]),
  ('Pelúcia Luigi 30cm', 87.90, 'Personagens', 'Mario', ARRAY[]::TEXT[]),
  
  -- Personagens - Grogu
  ('Pelúcia Grogu 30cm', 99.90, 'Personagens', 'Grogo', ARRAY[]::TEXT[]),
  
  -- Pelúcias Gigantes
  ('Pelúcia Gigante Stitch 80cm', 249.90, 'Pelúcias Gigantes', NULL, ARRAY[]::TEXT[]),
  ('Pelúcia Gigante Ursinho Pooh 80cm', 229.90, 'Pelúcias Gigantes', NULL, ARRAY[]::TEXT[]),
  ('Pelúcia Gigante Hello Kitty 80cm', 239.90, 'Pelúcias Gigantes', NULL, ARRAY[]::TEXT[]);

-- ============================================
-- APÓS INSERIR OS PRODUTOS:
-- ============================================
-- 
-- 1. Faça upload das imagens no Storage (bucket "produtos")
-- 2. Copie as URLs públicas das imagens
-- 3. Atualize os produtos com as URLs usando o SQL abaixo:
--
-- Exemplo:
-- UPDATE products
-- SET imagens = ARRAY[
--   'https://seu-projeto.supabase.co/storage/v1/object/public/produtos/stitch-1.jpg',
--   'https://seu-projeto.supabase.co/storage/v1/object/public/produtos/stitch-2.jpg'
-- ]
-- WHERE nome = 'Pelúcia Stitch 30cm';
--
-- ============================================
