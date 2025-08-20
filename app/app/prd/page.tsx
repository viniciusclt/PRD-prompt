
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Download, Share2 } from 'lucide-react'

export default function PRDPage() {
  const [formData, setFormData] = useState({
    appName: '',
    description: '',
    industry: '',
    targetAudience: '',
    complexity: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPRD, setGeneratedPRD] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.appName || !formData.description) {
      alert('Por favor, preencha pelo menos o nome do app e a descrição')
      return
    }

    setIsGenerating(true)
    
    // Simulate PRD generation
    setTimeout(() => {
      const prd = `# PRD: ${formData.appName}

## 1. Visão Geral do Produto

**Nome do Produto:** ${formData.appName}
**Setor:** ${formData.industry || 'Tecnologia'}
**Público-Alvo:** ${formData.targetAudience || 'Usuários gerais'}
**Complexidade:** ${formData.complexity || 'Média'}

## 2. Descrição do Produto

${formData.description}

## 3. Objetivos do Produto

- Resolver problemas específicos do público-alvo
- Oferecer uma experiência de usuário intuitiva e eficiente
- Estabelecer uma base sólida para crescimento futuro
- Gerar valor tanto para usuários quanto para o negócio

## 4. Funcionalidades Principais

### 4.1 Funcionalidades Core
- Sistema de autenticação e autorização
- Dashboard principal com visão geral
- Perfil de usuário personalizável
- Sistema de notificações

### 4.2 Funcionalidades Específicas
- [A ser definido com base nos requisitos específicos]
- [Integração com sistemas externos se necessário]
- [Funcionalidades de relatórios e analytics]

## 5. Requisitos Não-Funcionais

### 5.1 Performance
- Tempo de carregamento < 3 segundos
- Suporte a 1000+ usuários simultâneos
- Disponibilidade 99.9%

### 5.2 Segurança
- Criptografia de dados sensíveis
- Autenticação multi-fator
- Logs de auditoria

### 5.3 Usabilidade
- Interface responsiva para mobile e desktop
- Suporte a navegadores modernos
- Acessibilidade WCAG AA

## 6. Tecnologias Recomendadas

### 6.1 Frontend
- **Framework:** Next.js 14+ com TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **Estado:** Zustand ou Context API

### 6.2 Backend
- **API:** Next.js API Routes ou Node.js + Express
- **Database:** PostgreSQL + Prisma ORM
- **Autenticação:** NextAuth.js

### 6.3 Infraestrutura
- **Deploy:** Vercel ou AWS
- **Database:** Supabase ou Railway
- **CDN:** Cloudflare

## 7. Cronograma de Desenvolvimento

### Fase 1: MVP (4-6 semanas)
- Setup inicial do projeto
- Autenticação básica
- Interface principal
- Funcionalidades core

### Fase 2: Recursos Avançados (4-6 semanas)
- Funcionalidades específicas
- Integrações externas
- Otimizações de performance

### Fase 3: Polimento (2-4 semanas)
- Testes extensivos
- Correções de bugs
- Preparação para produção

## 8. Critérios de Sucesso

- Taxa de adoção de usuários
- Tempo médio de sessão
- Net Promoter Score (NPS)
- Métricas específicas do negócio

## 9. Riscos e Mitigações

- **Risco:** Complexidade técnica subestimada
- **Mitigação:** Prototipagem e validação prévia

- **Risco:** Mudanças de escopo durante desenvolvimento
- **Mitigação:** Processos claros de change management

## 10. Próximos Passos

1. Validação deste PRD com stakeholders
2. Detalhamento de wireframes e mockups
3. Setup do ambiente de desenvolvimento
4. Início da implementação do MVP

---

*Este PRD foi gerado automaticamente pelo PRD-Prompt.com.br*
*Data de geração: ${new Date().toLocaleDateString('pt-BR')}*`

      setGeneratedPRD(prd)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📋 Gerador de PRD
        </h1>
        <p className="text-xl text-gray-600">
          Transforme suas ideias em documentos de especificação técnica completos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Informações do Projeto
            </CardTitle>
            <CardDescription>
              Preencha os dados do seu projeto para gerar um PRD completo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do App/Produto *
              </label>
              <Input
                placeholder="Ex: TaskManager Pro"
                value={formData.appName}
                onChange={(e) => handleInputChange('appName', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Produto *
              </label>
              <Textarea
                placeholder="Descreva o que seu produto faz, quais problemas resolve e como funciona..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setor/Indústria
              </label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="financas">Finanças</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="entretenimento">Entretenimento</SelectItem>
                  <SelectItem value="produtividade">Produtividade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Público-Alvo
              </label>
              <Input
                placeholder="Ex: Profissionais de marketing entre 25-40 anos"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complexidade do Projeto
              </label>
              <Select value={formData.complexity} onValueChange={(value) => handleInputChange('complexity', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a complexidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa (MVP simples)</SelectItem>
                  <SelectItem value="media">Média (Funcionalidades moderadas)</SelectItem>
                  <SelectItem value="alta">Alta (Sistema complexo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full btn-primary-large"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Gerando PRD...
                </>
              ) : (
                'Gerar PRD Completo'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                PRD Gerado
              </div>
              {generatedPRD && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              )}
            </CardTitle>
            <CardDescription>
              Seu documento será exibido aqui
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedPRD ? (
              <div className="bg-gray-50 p-6 rounded-lg border max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {generatedPRD}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-50 p-12 rounded-lg border text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Preencha o formulário e clique em "Gerar PRD" para ver seu documento aqui
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
