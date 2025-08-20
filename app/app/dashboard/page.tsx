
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { 
  FileText, 
  Zap, 
  Database, 
  Workflow,
  Palette,
  Search,
  Target,
  Lightbulb,
  Archive,
  TrendingUp,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  const tools = [
    {
      title: "Gerar PRD",
      description: "Crie documentos de especificação técnica completos em minutos",
      icon: FileText,
      href: "/prd",
      color: "blue",
      featured: true
    },
    {
      title: "Prompts Técnicos",
      description: "Otimizados para Lovable, V0, Cursor e outras ferramentas de IA",
      icon: Zap,
      href: "/prompts",
      color: "purple",
      featured: true
    },
    {
      title: "Super Prompt",
      description: "Crie prompts avançados personalizados para seus projetos",
      icon: Target,
      href: "/super-prompt",
      color: "gradient",
      featured: true
    },
    {
      title: "Catálogo de Ideias",
      description: "Acesse 3.000+ ideias categorizadas para seus projetos",
      icon: Lightbulb,
      href: "/ideias",
      color: "yellow"
    },
    {
      title: "Gerenciar Projetos",
      description: "Organize e acompanhe seus projetos em desenvolvimento",
      icon: Archive,
      href: "/projetos",
      color: "green"
    },
    {
      title: "Paletas de Cores",
      description: "Encontre paletas perfeitas para seus designs",
      icon: Palette,
      href: "/paletas",
      color: "pink"
    },
    {
      title: "Modelagem de BD",
      description: "Gere modelos de banco de dados automaticamente",
      icon: Database,
      href: "/database",
      color: "gray"
    },
    {
      title: "Fluxos Interativos",
      description: "Visualize processos e jornadas do usuário",
      icon: Workflow,
      href: "/workflows",
      color: "cyan"
    }
  ]

  const getColorClasses = (color: string, featured = false) => {
    const colors = {
      blue: featured ? "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100" : "border-blue-200 hover:border-blue-300",
      purple: featured ? "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100" : "border-purple-200 hover:border-purple-300",
      gradient: "border-transparent bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50",
      yellow: "border-yellow-200 hover:border-yellow-300",
      green: "border-green-200 hover:border-green-300",
      pink: "border-pink-200 hover:border-pink-300",
      gray: "border-gray-200 hover:border-gray-300",
      cyan: "border-cyan-200 hover:border-cyan-300"
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      gradient: "text-purple-600",
      yellow: "text-yellow-600",
      green: "text-green-600",
      pink: "text-pink-600",
      gray: "text-gray-600",
      cyan: "text-cyan-600"
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bem-vindo ao{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PRD-Prompt
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          A plataforma completa de IA para Product Managers e Desenvolvedores
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">PRDs Criados</p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Prompts Gerados</p>
                <p className="text-2xl font-bold text-purple-900">28</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Projetos Ativos</p>
                <p className="text-2xl font-bold text-green-900">5</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tools Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🛠️ Suas Ferramentas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <Link key={index} href={tool.href}>
                <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${getColorClasses(tool.color, tool.featured)}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-white/50`}>
                        <IconComponent className={`w-6 h-6 ${getIconColor(tool.color)}`} />
                      </div>
                      {tool.featured && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg text-gray-900">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start p-0 h-auto font-medium text-gray-700 hover:text-gray-900"
                    >
                      Acessar ferramenta →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📈 Atividade Recente
        </h2>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { action: "PRD criado", item: "App de Delivery", time: "2 horas atrás", type: "prd" },
                { action: "Prompt gerado", item: "Landing page corporativa", time: "5 horas atrás", type: "prompt" },
                { action: "Super Prompt", item: "E-commerce completo", time: "1 dia atrás", type: "super" },
                { action: "Projeto salvo", item: "Sistema de gestão", time: "2 dias atrás", type: "project" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                  <div className="p-2 rounded-full bg-white">
                    {activity.type === 'prd' && <FileText className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'prompt' && <Zap className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'super' && <Target className="w-4 h-4 text-pink-600" />}
                    {activity.type === 'project' && <Archive className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.action}: {activity.item}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
