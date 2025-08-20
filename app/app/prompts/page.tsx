
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Zap, Copy, ExternalLink } from 'lucide-react'

export default function PromptsPage() {
  const [formData, setFormData] = useState({
    type: '',
    context: '',
    objective: '',
    technology: '',
    framework: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState('')

  const handleGenerate = async () => {
    if (!formData.type || !formData.context) {
      alert('Por favor, preencha pelo menos o tipo e o contexto')
      return
    }

    setIsGenerating(true)
    
    setTimeout(() => {
      const prompt = `Crie um ${formData.type.toLowerCase()} com as seguintes especificações:

CONTEXTO: ${formData.context}

OBJETIVO: ${formData.objective || 'Criar uma solução eficiente e moderna'}

TECNOLOGIA PRINCIPAL: ${formData.technology || 'React/Next.js'}
FRAMEWORK: ${formData.framework || 'Next.js com TypeScript'}

INSTRUÇÕES TÉCNICAS:

1. **Arquitetura e Estrutura**
   - Use ${formData.framework || 'Next.js 14+'} como framework principal
   - Implemente TypeScript para type safety completo
   - Organize o código com padrão de componentes reutilizáveis
   - Use App Router para otimização de performance

2. **Design e Interface**
   - Implemente design responsivo usando Tailwind CSS
   - Use Shadcn/ui para componentes consistentes
   - Garanta acessibilidade (WCAG AA)
   - Adicione animações suaves e micro-interações

3. **Funcionalidades Core**
   - Sistema de autenticação seguro (NextAuth.js)
   - Validação de formulários com React Hook Form + Zod
   - Estados de loading e error handling elegantes
   - Feedback visual para todas as ações do usuário

4. **Performance e SEO**
   - Otimização de imagens com Next.js Image
   - Lazy loading para conteúdo pesado
   - Meta tags apropriadas para SEO
   - Core Web Vitals score > 90

5. **Database e Backend**
   - Use Prisma ORM com PostgreSQL
   - APIs RESTful bem estruturadas
   - Middleware de autenticação e autorização
   - Tratamento de erros consistente

6. **Deploy e Produção**
   - Configure para deploy no Vercel
   - Variáveis de ambiente seguras
   - Health checks e monitoramento
   - Logs estruturados

EXEMPLO DE IMPLEMENTAÇÃO:
\`\`\`typescript
// Estrutura sugerida do projeto
app/
├── api/           # API routes
├── components/    # Componentes reutilizáveis  
├── lib/          # Utilities e configurações
├── types/        # Definições TypeScript
└── (pages)/      # Pages do App Router
\`\`\`

CHECKLIST DE QUALIDADE:
□ Responsividade em mobile, tablet e desktop
□ Loading states em todas operações async
□ Error boundaries e tratamento de errors
□ Validação client-side e server-side
□ Testes unitários para lógica crítica
□ Documentação clara do código
□ Performance otimizada (< 3s loading)
□ Acessibilidade implementada
□ SEO configurado corretamente

Este prompt foi otimizado para ferramentas como Lovable, V0, Cursor, Claude e ChatGPT.

DICA: Cole este prompt em sua ferramenta de IA favorita e ajuste conforme necessário para seu projeto específico.`

      setGeneratedPrompt(prompt)
      setIsGenerating(false)
    }, 2500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt)
    alert('✅ Prompt copiado para a área de transferência!')
  }

  const tools = [
    { name: 'Lovable', url: 'https://lovable.dev', description: 'IA para desenvolvimento full-stack' },
    { name: 'V0', url: 'https://v0.dev', description: 'Gerador de components React' },
    { name: 'Cursor', url: 'https://cursor.sh', description: 'IDE com IA integrada' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', description: 'Assistente de código' },
    { name: 'Claude', url: 'https://claude.ai', description: 'IA para desenvolvimento' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ⚡ Gerador de Prompts Técnicos
        </h1>
        <p className="text-xl text-gray-600">
          Crie prompts otimizados para Lovable, V0, Cursor e outras ferramentas de IA
        </p>
      </div>

      {/* Compatible Tools */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">🛠️ Ferramentas Compatíveis</CardTitle>
          <CardDescription className="text-blue-700">
            Este gerador cria prompts otimizados para as principais ferramentas de IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Configuração do Prompt
            </CardTitle>
            <CardDescription>
              Configure os parâmetros para gerar seu prompt técnico personalizado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Projeto *
              </label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aplicacao-web">Aplicação Web</SelectItem>
                  <SelectItem value="app-mobile">App Mobile</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="blog">Blog/CMS</SelectItem>
                  <SelectItem value="landing-page">Landing Page</SelectItem>
                  <SelectItem value="api-backend">API/Backend</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contexto do Projeto *
              </label>
              <Textarea
                placeholder="Descreva o que você quer criar, suas funcionalidades principais e objetivos..."
                rows={4}
                value={formData.context}
                onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivo Específico
              </label>
              <Textarea
                placeholder="Qual é o objetivo principal? Que problema resolve?"
                rows={2}
                value={formData.objective}
                onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tecnologia Principal
                </label>
                <Select value={formData.technology} onValueChange={(value) => setFormData(prev => ({ ...prev, technology: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tecnologia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                    <SelectItem value="nodejs">Node.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Framework
                </label>
                <Select value={formData.framework} onValueChange={(value) => setFormData(prev => ({ ...prev, framework: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nextjs-typescript">Next.js + TypeScript</SelectItem>
                    <SelectItem value="react-vite">React + Vite</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="express">Express.js</SelectItem>
                    <SelectItem value="fastapi">FastAPI</SelectItem>
                  </SelectContent>
                </Select>
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
                  Gerando Prompt...
                </>
              ) : (
                'Gerar Prompt Técnico'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Prompt Gerado
              </div>
              {generatedPrompt && (
                <Button onClick={handleCopy} size="sm" className="btn-primary">
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              Seu prompt otimizado será exibido aqui
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedPrompt ? (
              <div className="bg-gray-50 p-6 rounded-lg border max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-50 p-12 rounded-lg border text-center">
                <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Configure os parâmetros e clique em "Gerar Prompt" para ver o resultado
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      {generatedPrompt && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">📝 Como Usar Este Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Copie o Prompt</h3>
                  <p className="text-sm">Clique no botão "Copiar" acima para copiar o prompt completo.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">2. Escolha sua Ferramenta</h3>
                  <p className="text-sm">Cole em Lovable, V0, Cursor, ChatGPT, Claude ou sua IA favorita.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">3. Ajuste Conforme Necessário</h3>
                  <p className="text-sm">Modifique detalhes específicos do seu projeto antes de executar.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">4. Execute e Desenvolva</h3>
                  <p className="text-sm">Siga as instruções geradas pela IA para criar seu projeto.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
