
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Workflow, Plus, Download, Share2, Play, Upload, BookOpen, Eye, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function WorkflowsPage() {
  const router = useRouter()
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleNewWorkflow = async () => {
    setIsCreatingWorkflow(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Novo fluxo criado! Redirecionando para o editor...')
      // In a real implementation, this would create a new workflow and redirect to the editor
      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro ao criar fluxo. Tente novamente.')
    } finally {
      setIsCreatingWorkflow(false)
    }
  }

  const handleImport = async () => {
    setIsImporting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Função de importar disponível em breve!')
      // In a real implementation, this would open a file picker dialog
    } catch (error) {
      toast.error('Erro ao importar. Tente novamente.')
    } finally {
      setIsImporting(false)
    }
  }

  const handleViewTemplates = () => {
    toast.info('Rolando até a seção de templates...')
    // Scroll to templates section
    document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleUseTemplate = (template: any) => {
    toast.success(`Template "${template.name}" selecionado! Criando novo fluxo...`)
    // In a real implementation, this would create a new workflow based on the template
    router.push('/dashboard')
  }

  const handleOpenWorkflow = (workflow: any) => {
    toast.success(`Abrindo fluxo: ${workflow.name}`)
    // In a real implementation, this would open the workflow editor
    router.push(`/dashboard?workflow=${encodeURIComponent(workflow.name)}`)
  }

  const handleViewTutorial = () => {
    toast.info('Abrindo tutorial de workflows...')
    // In a real implementation, this would open a tutorial or help page
    window.open('/tutorial/workflows', '_blank')
  }

  const workflows = [
    {
      name: "Fluxo de Cadastro de Usuário",
      description: "Processo completo desde o registro até a primeira ação do usuário",
      type: "Onboarding",
      steps: 8,
      status: "Ativo",
      lastUpdated: "2 dias atrás"
    },
    {
      name: "Processo de Compra E-commerce",
      description: "Jornada do usuário desde a seleção do produto até o pagamento",
      type: "E-commerce",
      steps: 12,
      status: "Em Revisão",
      lastUpdated: "1 semana atrás"
    },
    {
      name: "Aprovação de Conteúdo",
      description: "Workflow para revisão e aprovação de posts em blog/CMS",
      type: "Conteúdo",
      steps: 6,
      status: "Ativo",
      lastUpdated: "3 dias atrás"
    },
    {
      name: "Suporte ao Cliente",
      description: "Fluxo de atendimento desde a abertura até o fechamento do ticket",
      type: "Suporte",
      steps: 10,
      status: "Rascunho",
      lastUpdated: "5 dias atrás"
    }
  ]

  const templates = [
    {
      name: "Onboarding Básico",
      description: "Template padrão para processo de boas-vindas",
      icon: "👋",
      popular: true
    },
    {
      name: "Checkout E-commerce",
      description: "Fluxo otimizado para finalização de compra",
      icon: "🛒",
      popular: true
    },
    {
      name: "Lead Generation",
      description: "Captação e qualificação de leads",
      icon: "🎯",
      popular: false
    },
    {
      name: "Aprovação de Documentos",
      description: "Processo de revisão e aprovação",
      icon: "📋",
      popular: false
    },
    {
      name: "Feedback do Usuário",
      description: "Coleta e processamento de feedback",
      icon: "⭐",
      popular: false
    },
    {
      name: "Gestão de Projetos",
      description: "Workflow para acompanhamento de projetos",
      icon: "📊",
      popular: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ativo': return 'bg-green-100 text-green-800'
      case 'Em Revisão': return 'bg-yellow-100 text-yellow-800'
      case 'Rascunho': return 'bg-gray-100 text-gray-800'
      case 'Inativo': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🔄 Fluxos Interativos
        </h1>
        <p className="text-xl text-gray-600">
          Visualize processos e jornadas do usuário com diagramas profissionais
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button 
          className="btn-primary"
          onClick={handleNewWorkflow}
          disabled={isCreatingWorkflow}
        >
          {isCreatingWorkflow ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Criando...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Novo Fluxo
            </>
          )}
        </Button>
        <Button 
          variant="outline"
          onClick={handleImport}
          disabled={isImporting}
        >
          {isImporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Importando...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </>
          )}
        </Button>
        <Button 
          variant="outline"
          onClick={handleViewTemplates}
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver Templates
        </Button>
      </div>

      {/* Templates Section */}
      <div id="templates-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Templates Prontos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{template.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-gray-900">
                        {template.name}
                      </CardTitle>
                      {template.popular && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleUseTemplate(template)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Usar Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Workflows */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔄 Meus Fluxos</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workflows.map((workflow, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-2">
                      {workflow.name}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {workflow.type}
                      </Badge>
                    </div>
                  </div>
                  <Workflow className="w-6 h-6 text-gray-400" />
                </div>
                <CardDescription className="text-gray-600">
                  {workflow.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{workflow.steps} etapas</span>
                  <span>Atualizado {workflow.lastUpdated}</span>
                </div>

                {/* Progress Visualization */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2">
                    {Array.from({length: Math.min(workflow.steps, 6)}).map((_, stepIndex) => (
                      <div key={stepIndex} className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 border-2 border-blue-300 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-medium">{stepIndex + 1}</span>
                        </div>
                        {stepIndex < Math.min(workflow.steps, 6) - 1 && (
                          <div className="w-6 h-0.5 bg-gray-300 mx-1"></div>
                        )}
                      </div>
                    ))}
                    {workflow.steps > 6 && (
                      <div className="text-gray-400 text-sm">+{workflow.steps - 6}</div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenWorkflow(workflow)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Abrir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.info('Funcionalidade de compartilhar em breve!')}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.info('Funcionalidade de download em breve!')}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New Flow */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-center py-12">
        <CardContent>
          <Workflow className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Crie Fluxos Profissionais
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Use nosso editor visual para criar diagramas de fluxo interativos, 
            mapear jornadas do usuário e documentar processos
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="btn-primary-large"
              onClick={handleNewWorkflow}
              disabled={isCreatingWorkflow}
            >
              {isCreatingWorkflow ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Criando Fluxo...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Novo Fluxo
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewTutorial}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Tutorial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
