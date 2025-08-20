
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Database, Download, Code, Eye } from 'lucide-react'
import { useState } from 'react'

export default function DatabasePage() {
  const [projectDescription, setProjectDescription] = useState('')
  const [databaseType, setDatabaseType] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSchema, setGeneratedSchema] = useState('')

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const handleGenerate = async () => {
    if (!projectDescription || !databaseType) {
      alert('Por favor, preencha a descrição do projeto e selecione o tipo de banco')
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const schema = `-- Esquema de Banco de Dados Gerado
-- Projeto: ${projectDescription}
-- Tipo: ${databaseType}
-- Data: ${new Date().toLocaleDateString('pt-BR')}

${databaseType === 'PostgreSQL' ? `
-- Criação das Tabelas Principais

-- Tabela de Usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

${features.includes('auth') ? `-- Sistema de Autenticação
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_resets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);` : ''}

${features.includes('profiles') ? `-- Perfis de Usuário
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    location VARCHAR(255),
    website VARCHAR(500),
    social_links JSONB,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);` : ''}

${features.includes('content') ? `-- Sistema de Conteúdo
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    status VARCHAR(50) DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);` : ''}

${features.includes('comments') ? `-- Sistema de Comentários
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'approved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);` : ''}

${features.includes('files') ? `-- Gerenciamento de Arquivos
CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    filename VARCHAR(500) NOT NULL,
    original_name VARCHAR(500) NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);` : ''}

-- Índices para Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);

-- Views Úteis
CREATE VIEW published_posts AS 
SELECT 
    p.*,
    u.name as author_name,
    c.name as category_name
FROM posts p
JOIN users u ON p.author_id = u.id
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.status = 'published' AND p.published_at <= NOW();
` : `
-- MongoDB Schema (Mongoose)

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  avatarUrl: String,
  emailVerified: { type: Boolean, default: false },
  profile: {
    bio: String,
    location: String,
    website: String,
    socialLinks: {
      type: Map,
      of: String
    }
  },
  preferences: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

${features.includes('content') ? `// Post Schema
const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  featuredImage: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: Date,
  tags: [String],
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });` : ''}

${features.includes('comments') ? `// Comment Schema
const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  content: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' }
}, { timestamps: true });` : ''}
`}

-- Prisma Schema (para Next.js)
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${databaseType === 'PostgreSQL' ? 'postgresql' : 'mongodb'}"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  name          String
  avatarUrl     String?
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  profile       UserProfile?
  posts         Post[]
  comments      Comment[]
  
  @@map("users")
}

${features.includes('profiles') ? `model UserProfile {
  id          String @id @default(cuid())
  userId      String @unique
  user        User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  bio         String?
  location    String?
  website     String?
  socialLinks Json?
  preferences Json   @default("{}")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("user_profiles")
}` : ''}

${features.includes('content') ? `model Category {
  id          String @id @default(cuid())
  name        String
  slug        String @unique
  description String?
  posts       Post[]
  createdAt   DateTime @default(now())
  
  @@map("categories")
}

model Post {
  id            String    @id @default(cuid())
  authorId      String
  author        User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  categoryId    String?
  category      Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  title         String
  slug          String    @unique
  content       String
  excerpt       String?
  featuredImage String?
  status        String    @default("draft")
  publishedAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  comments      Comment[]
  
  @@index([authorId])
  @@index([status])
  @@map("posts")
}` : ''}

${features.includes('comments') ? `model Comment {
  id        String    @id @default(cuid())
  postId    String
  post      Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  String
  author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  parentId  String?
  parent    Comment?  @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies   Comment[] @relation("CommentReplies")
  content   String
  status    String    @default("approved")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  @@map("comments")
}` : ''}

-- Comandos de Setup
-- 1. Instalar dependências:
--    npm install prisma @prisma/client

-- 2. Configurar .env:
--    DATABASE_URL="${databaseType === 'PostgreSQL' ? 'postgresql://user:password@localhost:5432/database' : 'mongodb://localhost:27017/database'}"

-- 3. Executar migrações:
--    npx prisma migrate dev --name init
--    npx prisma generate

-- 4. Seed inicial (opcional):
--    npx prisma db seed

/* 
INSTRUÇÕES DE USO:

1. Configure sua DATABASE_URL no arquivo .env
2. Execute as migrações para criar as tabelas
3. Use o Prisma Client em seu código:

import { prisma } from '@/lib/db'

// Exemplo: Buscar usuários
const users = await prisma.user.findMany({
  include: {
    profile: true,
    posts: true
  }
})

4. Para desenvolvimento local, use:
   - PostgreSQL: Docker ou instalação local
   - MongoDB: MongoDB Atlas ou instalação local

5. Para produção, considere:
   - Supabase (PostgreSQL)
   - PlanetScale (MySQL)
   - MongoDB Atlas (MongoDB)
*/

-- Este schema foi gerado pelo PRD-Prompt.com.br 🚀`

      setGeneratedSchema(schema)
      setIsGenerating(false)
    }, 3000)
  }

  const availableFeatures = [
    { id: 'auth', name: 'Autenticação', description: 'Sistema de login/logout, sessões' },
    { id: 'profiles', name: 'Perfis de Usuário', description: 'Dados extras dos usuários' },
    { id: 'content', name: 'Sistema de Conteúdo', description: 'Posts, categorias, publicação' },
    { id: 'comments', name: 'Comentários', description: 'Sistema de comentários aninhados' },
    { id: 'files', name: 'Upload de Arquivos', description: 'Gerenciamento de imagens/documentos' },
    { id: 'notifications', name: 'Notificações', description: 'Sistema de alertas' },
    { id: 'analytics', name: 'Analytics', description: 'Rastreamento de eventos' },
    { id: 'payments', name: 'Pagamentos', description: 'Integração com Stripe/PayPal' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🗄️ Modelagem de Banco de Dados
        </h1>
        <p className="text-xl text-gray-600">
          Gere automaticamente modelos de banco de dados completos com diagramas ER
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Configuração do Banco
            </CardTitle>
            <CardDescription>
              Descreva seu projeto para gerar o schema ideal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Projeto *
              </label>
              <Textarea
                placeholder="Ex: Blog pessoal com sistema de comentários, categorias e upload de imagens..."
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Banco de Dados *
              </label>
              <Select value={databaseType} onValueChange={setDatabaseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PostgreSQL">PostgreSQL (Recomendado)</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="MySQL">MySQL</SelectItem>
                  <SelectItem value="SQLite">SQLite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Funcionalidades Necessárias
              </label>
              <div className="grid grid-cols-1 gap-3">
                {availableFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      features.includes(feature.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.name}</h4>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded border-2 ${
                        features.includes(feature.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {features.includes(feature.id) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full btn-primary-large"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Gerando Schema...
                </>
              ) : (
                'Gerar Modelo do Banco'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Schema */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-600" />
                Schema Gerado
              </div>
              {generatedSchema && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    SQL
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Diagrama
                  </Button>
                </div>
              )}
            </CardTitle>
            <CardDescription>
              Código SQL e Prisma schema prontos para usar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedSchema ? (
              <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-xs font-mono text-gray-800 leading-relaxed">
                  {generatedSchema}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-50 p-12 rounded-lg border text-center">
                <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Configure seu projeto e clique em "Gerar" para ver o schema aqui
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      {generatedSchema && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">🚀 Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-800">
              <div>
                <h3 className="font-semibold mb-2">1. Setup do Projeto</h3>
                <ul className="text-sm space-y-1">
                  <li>• Instale o Prisma: <code className="bg-white px-1 rounded">npm install prisma</code></li>
                  <li>• Configure a DATABASE_URL no .env</li>
                  <li>• Execute as migrações</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Desenvolvimento</h3>
                <ul className="text-sm space-y-1">
                  <li>• Use o Prisma Client em suas APIs</li>
                  <li>• Implemente as validações necessárias</li>
                  <li>• Configure índices para performance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
