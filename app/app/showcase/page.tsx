
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Grid3X3, Search, ExternalLink, Eye, Copy, Filter, Star } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  platform: string
  image: string
  projectUrl: string
  promptUsed: string
  tags: string[]
  featured: boolean
}

export default function ShowcasePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSort, setSelectedSort] = useState('featured')
  const [selectedTag, setSelectedTag] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in production this would come from API
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'CRIATIVE',
        description: 'Feito no TRAE no MODO SOLO. Você pode utilizar em outras ferramentas para criar projetos similares com design criativo e inovador.',
        platform: 'TRAE',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop',
        projectUrl: '#',
        promptUsed: 'Crie um design criativo e moderno para uma plataforma de inovação com paleta de cores vibrante e elementos interativos. Use componentes que transmitam criatividade e inovação, com animações suaves e layout responsivo.',
        tags: ['Criativo', 'Design', 'Inovação'],
        featured: true
      },
      {
        id: '2',
        title: 'LUXURY GOLD',
        description: 'E-commerce de tênis premium com design luxuoso em dourado. Use no TRAE de preferência para melhores resultados.',
        platform: 'Supabase + TRAE',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop',
        projectUrl: '#',
        promptUsed: 'Desenvolva um e-commerce premium para tênis com tema dourado luxuoso, incluindo carrinho de compras, checkout seguro, área do cliente e catálogo de produtos com filtros avançados.',
        tags: ['E-commerce', 'Luxury', 'Tênis'],
        featured: true
      },
      {
        id: '3',
        title: 'Chronos',
        description: 'Projeto totalmente desenvolvido no TRAE modo SOLO. Para usar em outras ferramentas, copie o prompt e ajuste conforme necessário.',
        platform: 'TRAE',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
        projectUrl: '#',
        promptUsed: 'Crie uma aplicação de gestão de tempo com design escuro moderno, incluindo cronômetro, lista de tarefas, relatórios de produtividade e dashboard com métricas detalhadas.',
        tags: ['Tempo', 'Produtividade', 'Dashboard'],
        featured: false
      },
      {
        id: '4',
        title: 'ImobCRM',
        description: 'Projeto totalmente desenvolvido no TRAE modo SOLO. Sistema CRM especializado para o mercado imobiliário.',
        platform: 'TRAE',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop',
        projectUrl: '#',
        promptUsed: 'Desenvolva um CRM para imobiliárias com gestão de leads, propriedades, calendário de visitas, pipeline de vendas e relatórios analíticos completos.',
        tags: ['CRM', 'Imobiliário', 'Vendas'],
        featured: false
      },
      {
        id: '5',
        title: 'Premium Imóveis',
        description: 'Projeto feito totalmente com TRAE modo SOLO com apenas um Prompt. Site institucional para imobiliária de luxo.',
        platform: 'TRAE',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=300&fit=crop',
        projectUrl: '#',
        promptUsed: 'Crie um site institucional premium para imobiliária de alto padrão com galeria de imóveis, busca avançada, páginas de propriedades, formulários de contato e design elegante.',
        tags: ['Imobiliário', 'Premium', 'Website'],
        featured: true
      }
    ]

    setTimeout(() => {
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter(project => project.tags.includes(selectedTag))
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'featured':
          if (a.featured === b.featured) return 0
          return a.featured ? -1 : 1
        case 'recent':
          return b.id.localeCompare(a.id) // Mock recent sort by id
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [searchTerm, selectedTag, selectedSort, projects])

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    alert('Prompt copiado para a área de transferência!')
  }

  const handleViewDetails = (project: Project) => {
    alert(`Detalhes completos do projeto "${project.title}" serão exibidos em modal. (Funcionalidade completa será implementada)`)
  }

  const handleViewProject = (projectUrl: string) => {
    if (projectUrl !== '#') {
      window.open(projectUrl, '_blank')
    } else {
      alert('Link do projeto será habilitado em breve!')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vitrine de Projetos
        </h1>
        <p className="text-gray-600">
          Explore projetos incríveis criados com prompts especializados. Veja o resultado e copie o prompt usado para criar seu próprio projeto!
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
                  placeholder="Buscar projetos por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todas as tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Apenas Destaques</SelectItem>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="title">Título (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredProjects.length} projeto(s) encontrado(s)
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {filteredProjects.filter(p => p.featured).length} destaque(s)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-card">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-16 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Grid3X3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros de busca para encontrar projetos relacionados ao seu interesse
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass-card hover-card overflow-hidden">
              {/* Project Image */}
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg leading-tight">
                    {project.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {project.platform}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetails(project)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Ver Detalhes
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProject(project.projectUrl)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ver Projeto
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() => handleCopyPrompt(project.promptUsed)}
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Copiar Prompt Usado
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
