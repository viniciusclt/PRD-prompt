
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Archive, Plus, ExternalLink, Calendar, Code } from 'lucide-react'

export default function ProjetosPage() {
  const projects = [
    {
      title: "E-commerce Moderno",
      description: "Plataforma completa de vendas online com carrinho, pagamento e dashboard administrativo",
      status: "Em Desenvolvimento",
      platform: "Next.js + Supabase",
      progress: 75,
      lastUpdate: "2 dias atrás",
      tags: ["E-commerce", "React", "Stripe"]
    },
    {
      title: "App de Produtividade",
      description: "Aplicativo para gestão de tarefas e projetos com funcionalidades de colaboração",
      status: "Concluído",
      platform: "React Native + Firebase",
      progress: 100,
      lastUpdate: "1 semana atrás",
      tags: ["Produtividade", "Mobile", "Real-time"]
    },
    {
      title: "Dashboard Analytics",
      description: "Painel administrativo para análise de dados com gráficos interativos e relatórios",
      status: "Planejamento",
      platform: "Next.js + PostgreSQL",
      progress: 20,
      lastUpdate: "3 dias atrás", 
      tags: ["Dashboard", "Analytics", "Charts"]
    },
    {
      title: "Landing Page Corporativa",
      description: "Site institucional com design moderno, otimizado para conversão e SEO",
      status: "Concluído",
      platform: "Next.js + Tailwind",
      progress: 100,
      lastUpdate: "2 semanas atrás",
      tags: ["Landing", "SEO", "Conversão"]
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Concluído': return 'bg-green-100 text-green-800'
      case 'Em Desenvolvimento': return 'bg-blue-100 text-blue-800'
      case 'Planejamento': return 'bg-yellow-100 text-yellow-800'
      case 'Pausado': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500'
    if (progress >= 75) return 'bg-blue-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📁 Meus Projetos
        </h1>
        <p className="text-xl text-gray-600">
          Organize e acompanhe o desenvolvimento dos seus projetos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-900 mb-1">4</div>
            <div className="text-blue-700 text-sm">Projetos Total</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-900 mb-1">2</div>
            <div className="text-green-700 text-sm">Concluídos</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-900 mb-1">1</div>
            <div className="text-yellow-700 text-sm">Em Desenvolvimento</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-900 mb-1">1</div>
            <div className="text-purple-700 text-sm">Planejamento</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Todos os Projetos</h2>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {project.title}
                  </CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <Archive className="w-6 h-6 text-gray-400" />
              </div>
              <CardDescription className="text-gray-600 leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progresso</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Platform */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Code className="w-4 h-4" />
                <span>{project.platform}</span>
              </div>

              {/* Last Update */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Atualizado {project.lastUpdate}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="default" size="sm" className="flex-1">
                  Abrir Projeto
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no projects) */}
      <Card className="text-center py-12 bg-gray-50 border-gray-200 mt-8">
        <CardContent>
          <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Organize seus projetos
          </h3>
          <p className="text-gray-600 mb-6">
            Mantenha todos os seus projetos organizados e acompanhe o progresso de desenvolvimento
          </p>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeiro Projeto
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
