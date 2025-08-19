
# 🚀 Guia de Migração para Supabase Self-hosted no Coolify

## 📋 Pré-requisitos
- Supabase self-hosted rodando no Coolify
- Acesso ao painel administrativo do Supabase
- Projeto clonado do GitHub localmente

## 🔧 Passo 1: Configurar Supabase no Coolify

### Deploy do Supabase
```bash
# No Coolify, adicione um novo projeto
1. Vá em "New Project"
2. Escolha "Supabase" do template
3. Configure:
   - POSTGRES_PASSWORD: sua_senha_forte
   - JWT_SECRET: gere uma chave JWT
   - SITE_URL: https://seu-app.coolify.io
```

### Obter Credenciais
Após o deploy, você terá:
```env
# Database Connection
DATABASE_URL="postgresql://postgres:SUA_SENHA@supabase-db.coolify.internal:5432/postgres"

# Supabase API (opcional para features avançadas)
SUPABASE_URL="https://supabase.seu-dominio.com"
SUPABASE_ANON_KEY="sua_chave_publica"
SUPABASE_SERVICE_KEY="sua_chave_servico"
```

## 🔧 Passo 2: Atualizar Variáveis de Ambiente

Crie/edite o arquivo `.env.local` no seu projeto:

```env
# Database
DATABASE_URL="postgresql://postgres:SUA_SENHA@seu-supabase-host:5432/postgres"

# NextAuth
NEXTAUTH_URL="https://seu-app.coolify.io"
NEXTAUTH_SECRET="gere-uma-nova-chave-com-openssl-rand-base64-32"

# API Keys (mantenha se usando IA)
ABACUSAI_API_KEY="sua_chave_abacus"

# Supabase (opcional)
NEXT_PUBLIC_SUPABASE_URL="https://supabase.seu-dominio.com"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua_chave_publica"
```

## 🔧 Passo 3: Executar Migrações

### No seu ambiente local:

```bash
# 1. Instalar dependências
cd prdprompt_clone/app
npm install

# 2. Gerar cliente Prisma
npx prisma generate

# 3. Executar migrações (cria todas as tabelas)
npx prisma migrate deploy

# 4. Popular banco com dados iniciais
npx prisma db seed
```

### Ou via Docker (se preferir):
```bash
# Dockerfile para migrações
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
CMD ["npx", "prisma", "migrate", "deploy"]
```

## 🔧 Passo 4: Deploy no Coolify

### Configurar o Projeto
```yaml
# No Coolify, adicione novo projeto NextJS
1. Connect GitHub repository
2. Configure Build Settings:
   - Build Command: cd app && npm run build
   - Start Command: cd app && npm start
   - Root Directory: /
```

### Variáveis de Ambiente no Coolify
```env
DATABASE_URL=postgresql://postgres:SUA_SENHA@supabase-db:5432/postgres
NEXTAUTH_URL=https://seu-app.coolify.io
NEXTAUTH_SECRET=sua_chave_nextauth
ABACUSAI_API_KEY=sua_chave_abacus
```

## 🔧 Passo 5: Verificar Migração

### Conectar ao Supabase e verificar:
```sql
-- Via psql ou interface do Supabase
\dt  -- listar tabelas

-- Deve mostrar:
-- User
-- Account  
-- Session
-- PRD
-- Prompt
-- Idea
-- Project
-- etc...

-- Verificar dados
SELECT COUNT(*) FROM "Idea";  -- Deve ter ~3000 registros
SELECT COUNT(*) FROM "User";  -- Seus usuários migrados
```

## 🔧 Passo 6: Configurações Avançadas (Opcional)

### Row Level Security (RLS)
```sql
-- Habilitar RLS nas tabelas
ALTER TABLE "PRD" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Prompt" ENABLE ROW LEVEL SECURITY;

-- Criar políticas básicas
CREATE POLICY "Users can view own PRDs" ON "PRD"
  FOR SELECT USING (auth.uid()::text = "userId");
  
CREATE POLICY "Users can insert own PRDs" ON "PRD"
  FOR INSERT WITH CHECK (auth.uid()::text = "userId");
```

### Backup Automático
```bash
# Script para backup diário
#!/bin/bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

## 🚨 Troubleshooting

### Problema: Erro de conexão
```bash
# Verificar se o Supabase está rodando
docker ps | grep supabase

# Testar conexão
psql $DATABASE_URL -c "SELECT version();"
```

### Problema: Migrações falhando
```bash
# Reset completo (CUIDADO: apaga tudo)
npx prisma migrate reset

# Ou aplicar uma migração específica
npx prisma migrate resolve --applied "migração_específica"
```

### Problema: Dados não aparecem
```bash
# Verificar se seed rodou
npx prisma db seed --preview-feature

# Ou popular manualmente
psql $DATABASE_URL < data/seed.sql
```

## ✅ Checklist Final

- [ ] Supabase rodando no Coolify
- [ ] DATABASE_URL atualizada
- [ ] Migrações executadas (`npx prisma migrate deploy`)
- [ ] Dados populados (`npx prisma db seed`)
- [ ] App deployado no Coolify
- [ ] Login funcionando
- [ ] Dados aparecendo corretamente

## 📞 Comandos Úteis

```bash
# Ver status das migrações
npx prisma migrate status

# Gerar nova migração (se fizer mudanças)
npx prisma migrate dev --name nova_feature

# Acessar banco diretamente
npx prisma studio

# Ver schema atual
npx prisma db pull
```

---

**🎯 Resultado**: Aplicação rodando 100% no Supabase self-hosted via Coolify!
