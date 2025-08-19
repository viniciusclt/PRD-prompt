
# 🚀 Setup Completo no Coolify - PRD Prompt Clone

## 📋 **Estrutura do Projeto**
Este é um **MONOREPO NEXT.JS FULLSTACK**:
- ✅ **Uma aplicação única** que serve front + back
- ✅ **Next.js App Router** com API Routes integradas
- ✅ **Tudo na pasta `/app`** (não precisa separar front/back)

## 🔧 **Configuração no Coolify**

### **1. 📦 Via Nixpacks (Recomendado)**
✅ **SIM, usa Nixpacks** - Coolify detecta automaticamente Next.js

```yaml
# Coolify Auto-detecta:
- Framework: Next.js
- Package Manager: Yarn
- Build System: Nixpacks
- Node Version: 18+
```

### **2. 🔗 Conectar Repositório**
```
1. New Resource → Application
2. Source: GitHub/GitLab
3. Repository: seu-usuario/prdprompt-clone
4. Branch: main
5. Build Pack: Nixpacks (auto-detectado)
```

## ⚙️ **Configurações Essenciais**

### **Build Settings**
```bash
# Root Directory
/app

# Build Command (Nixpacks faz automaticamente)
yarn install && npx prisma generate && yarn build

# Start Command (Nixpacks faz automaticamente) 
yarn start

# Install Command
yarn install
```

### **Environment Variables**
```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres:SUA_SENHA@supabase-db:5432/postgres

# NextAuth
NEXTAUTH_URL=https://seu-app.coolify.io
NEXTAUTH_SECRET=gere_uma_chave_forte_aqui

# API Keys
ABACUSAI_API_KEY=sua_chave_abacus_opcional

# Node Environment
NODE_ENV=production

# Prisma
PRISMA_GENERATE_DATAPROXY=true
```

## 🗄️ **Setup do Banco de Dados**

### **Dependências (Automáticas via Nixpacks)**
```bash
# Nixpacks instala automaticamente:
- Node.js 18+
- Yarn
- Todas dependências do package.json
- Prisma Client
```

### **Comandos Para Tabelas e População**

#### **Opção 1: Via Build Hook (Automático)**
No Coolify, adicione nos **Deploy Build Commands**:
```bash
# Durante o build
npx prisma migrate deploy    # Cria tabelas
npx prisma db seed          # Popula dados (3000+ ideias)
```

#### **Opção 2: Via Console (Manual)**
Após o deploy inicial, acesse o console da aplicação:
```bash
# Conectar ao container
coolify shell seu-app

# Executar migrações
cd /app
npx prisma migrate deploy
npx prisma db seed
```

#### **Opção 3: Via Dockerfile Personalizado**
Se preferir controle total, crie `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependências
COPY app/package.json app/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar código
COPY app/ .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN yarn build

# Comando de start com migrações
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && yarn start"]

EXPOSE 3000
```

## 📊 **Estrutura de Deploy**

### **Single Application Setup:**
```
┌─────────────────────┐
│   Coolify App       │
├─────────────────────┤
│ Frontend (Next.js)  │
│ Backend (API Routes)│
│ Static Assets       │
│ Server Components   │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ Supabase Database   │
│ (PostgreSQL)        │
└─────────────────────┘
```

## ⚡ **Comandos de Inicialização**

### **Durante o Build (automático):**
```bash
1. yarn install          # Dependências
2. npx prisma generate   # Cliente Prisma  
3. yarn build           # Build Next.js
```

### **Durante o Start (automático):**
```bash
1. npx prisma migrate deploy  # Criar tabelas
2. npx prisma db seed        # Popular dados  
3. yarn start               # Iniciar servidor
```

### **Verificação Manual:**
```bash
# Acessar console do container
coolify shell prd-prompt-app

# Verificar tabelas
npx prisma studio --browser none --port 5555

# Ver dados
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"Idea\";"
```

## 🔍 **Health Checks**

### **Configurar no Coolify:**
```yaml
Health Check:
  Path: /api/health
  Port: 3000
  Interval: 30s
  Timeout: 10s
  Retries: 3
```

### **Criar API Health Check:**
Arquivo: `app/app/api/health/route.ts`
```typescript
export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
}
```

## 🚀 **Deploy Automático**

### **Configuração CI/CD:**
```yaml
# Coolify faz automaticamente:
1. Git Push → Webhook
2. Build com Nixpacks  
3. Prisma Generate
4. Next.js Build
5. Deploy Container
6. Migrate Database
7. Health Check
```

## ✅ **Checklist de Deploy**

### **Pré-Deploy:**
- [ ] Supabase rodando no Coolify
- [ ] DATABASE_URL configurada
- [ ] NEXTAUTH_SECRET gerada
- [ ] Repositório conectado

### **Durante Deploy:**
- [ ] Build successful (logs verdes)
- [ ] Prisma migrations ok
- [ ] Container healthy
- [ ] Port 3000 accessible

### **Pós-Deploy:**
- [ ] Site carregando (https://seu-app.coolify.io)
- [ ] Login funcionando
- [ ] Dados aparecendo (3000+ ideias)
- [ ] API routes respondendo

## 🐛 **Troubleshooting**

### **Build Fails:**
```bash
# Verificar logs
coolify logs build prd-prompt-app

# Problemas comuns:
- DATABASE_URL não definida
- Prisma schema error
- Dependência faltando
```

### **Database Issues:**
```bash
# Conectar ao banco
psql $DATABASE_URL

# Verificar tabelas
\dt

# Re-executar seed
npx prisma db seed --preview-feature
```

### **Runtime Errors:**
```bash
# Container logs
coolify logs runtime prd-prompt-app

# Acessar container
coolify shell prd-prompt-app
```

## 🎯 **Resultado Final**

Uma única aplicação Next.js fullstack rodando no Coolify:
- ✅ Frontend + Backend unificados
- ✅ Nixpacks auto-detecta tudo
- ✅ Database migrations automáticas
- ✅ 3000+ ideias pré-carregadas
- ✅ SSL automático via Coolify
- ✅ Deploy contínuo via Git

**Total: 1 aplicação, 1 container, banco separado no Supabase!**

---
**🔥 Comando rápido para tudo:**
```bash
# Se preferir fazer tudo manual após deploy:
npx prisma migrate deploy && npx prisma db seed && yarn dev
```
