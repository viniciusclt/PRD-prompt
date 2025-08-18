
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Search, Filter, Grid, List } from 'lucide-react'

interface Idea {
  id: string
  title: string
  category: string
  level: string
  description: string
  tags: string[]
}

export default function IdeaCatalogPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in production this would come from API
  useEffect(() => {
    const mockIdeas: Idea[] = [
      {
        id: '1',
        title: 'Computer Vision System',
        category: 'Inteligência Artificial',
        level: 'Médio',
        description: 'Sistema que facilita desenvolvimento de aplicações visão computacional.',
        tags: ['IA', 'Visão Computacional', 'Machine Learning']
      },
      {
        id: '2',
        title: 'App de Delivery de Comida',
        category: 'Food & Beverage',
        level: 'Médio',
        description: 'Plataforma de entrega de comida com rastreamento em tempo real e pagamento integrado.',
        tags: ['Delivery', 'Food', 'Mobile App', 'Pagamentos']
      },
      {
        id: '3',
        title: 'Sistema de Gestão de Tarefas',
        category: 'Produtividade',
        level: 'Baixo',
        description: 'Aplicativo para organização de tarefas pessoais e em equipe com lembretes inteligentes.',
        tags: ['Produtividade', 'Gestão', 'Tarefas', 'Colaboração']
      },
      {
        id: '4',
        title: 'App de Investimentos',
        category: 'Fintech',
        level: 'Avançado',
        description: 'Plataforma de investimentos com análise de risco e recomendações personalizadas.',
        tags: ['Fintech', 'Investimentos', 'Análise de Risco', 'Finanças']
      },
      {
        id: '5',
        title: 'Plataforma de E-learning',
        category: 'Educação',
        level: 'Médio',
        description: 'Sistema de aprendizagem online com cursos interativos e certificações.',
        tags: ['Educação', 'E-learning', 'Cursos Online', 'Certificação']
      },
      {
        id: '6',
        title: 'App de Meditação e Wellness',
        category: 'Saúde & Bem-estar',
        level: 'Baixo',
        description: 'Aplicativo de meditação guiada com programas personalizados e acompanhamento de progresso.',
        tags: ['Meditação', 'Wellness', 'Saúde Mental', 'Mindfulness']
      },
      {
        id: '7',
        title: 'Plataforma de Freelancers',
        category: 'Marketplace',
        level: 'Médio',
        description: 'Marketplace para conectar freelancers e clientes com sistema de pagamento seguro.',
        tags: ['Freelancers', 'Marketplace', 'Trabalho Remoto', 'Pagamentos']
      },
      {
        id: '8',
        title: 'Rede Social para Pets',
        category: 'Social',
        level: 'Baixo',
        description: 'Rede social dedicada a donos de pets com funcionalidades de compartilhamento e cuidados.',
        tags: ['Pets', 'Rede Social', 'Compartilhamento', 'Cuidados']
      }
    ]

    setTimeout(() => {
      setIdeas(mockIdeas)
      setFilteredIdeas(mockIdeas)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter ideas based on search term, category, and level
  useEffect(() => {
    let filtered = ideas

    if (searchTerm) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(idea => idea.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(idea => idea.level === selectedLevel)
    }

    setFilteredIdeas(filtered)
  }, [searchTerm, selectedCategory, selectedLevel, ideas])

  const categories = Array.from(new Set(ideas.map(idea => idea.category)))
  const levels = Array.from(new Set(ideas.map(idea => idea.level)))

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Baixo':
        return 'bg-green-100 text-green-800'
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800'
      case 'Avançado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleUseIdea = (idea: Idea) => {
    alert(`Ideia "${idea.title}" será utilizada no gerador de PRD! (Funcionalidade completa será implementada)`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Catálogo de Ideias de Aplicativos
        </h1>
        <p className="text-gray-600">
          Explore mais de 3000+ ideias categorizadas para inspirar seu próximo projeto
        </p>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-500" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar ideias por título, descrição ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todos os níveis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {filteredIdeas.length} de {ideas.length} ideias
            </span>
            <span>
              3000+ ideias cadastradas no total
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Ideas Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredIdeas.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhuma ideia encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros de busca para encontrar ideias relacionadas ao seu interesse
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="glass-card hover-card">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg leading-tight">
                    {idea.title}
                  </CardTitle>
                  <Badge className={getLevelColor(idea.level)}>
                    {idea.level}
                  </Badge>
                </div>
                <CardDescription className="text-indigo-600 font-medium">
                  {idea.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {idea.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {idea.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {idea.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{idea.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handleUseIdea(idea)}
                >
                  Usar esta ideia
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
