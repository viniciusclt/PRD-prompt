
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Lightbulb, Search, Filter, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function IdeiasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const ideas = [
    {
      title: "App de Delivery de Comida",
      category: "E-commerce",
      level: "Médio",
      description: "Plataforma completa para pedidos online com integração de pagamento, rastreamento de entrega e sistema de avaliações.",
      tags: ["React Native", "Node.js", "PostgreSQL", "Stripe"]
    },
    {
      title: "Sistema de Gestão Escolar",
      category: "Educação",
      level: "Avançado",
      description: "Sistema completo para gestão de escolas com módulos para alunos, professores, notas e comunicação.",
      tags: ["Next.js", "Prisma", "TypeScript", "Dashboard"]
    },
    {
      title: "App de Meditação",
      category: "Saúde",
      level: "Baixo",
      description: "Aplicativo para meditação guiada com timer, estatísticas de progresso e biblioteca de sons relaxantes.",
      tags: ["React Native", "Audio", "Firebase", "Analytics"]
    },
    {
      title: "Plataforma de E-learning",
      category: "Educação", 
      level: "Avançado",
      description: "Plataforma completa de ensino online com vídeo-aulas, quiz interativos e sistema de certificação.",
      tags: ["Next.js", "Video Streaming", "Certificados", "Gamification"]
    },
    {
      title: "App de Finanças Pessoais",
      category: "Finanças",
      level: "Médio",
      description: "Aplicativo para controle de gastos pessoais com categorização automática e relatórios detalhados.",
      tags: ["React", "Charts.js", "Open Banking", "PWA"]
    },
    {
      title: "Rede Social para Pets",
      category: "Social",
      level: "Médio",
      description: "Rede social dedicada a pets com perfis personalizados, feed de fotos e sistema de adoção.",
      tags: ["Next.js", "Image Upload", "Real-time", "Geolocation"]
    }
  ]

  const categories = ["all", "E-commerce", "Educação", "Saúde", "Finanças", "Social"]
  const levels = ["all", "Baixo", "Médio", "Avançado"]

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Baixo': return 'bg-green-100 text-green-800'
      case 'Médio': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleGeneratePRD = (idea: any) => {
    // Store the idea in localStorage so it can be used in the generate-prd page
    localStorage.setItem('selectedIdea', JSON.stringify(idea))
    toast.success('Ideia selecionada! Redirecionando para gerar PRD...')
    router.push('/generate-prd')
  }

  const handleLoadMoreIdeas = async () => {
    setIsLoading(true)
    try {
      // Simulate loading more ideas
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Mais ideias carregadas com sucesso!')
      // In a real implementation, this would fetch more ideas from an API
    } catch (error) {
      toast.error('Erro ao carregar mais ideias. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          💡 Catálogo de Ideias
        </h1>
        <p className="text-xl text-gray-600">
          Explore mais de 3.000 ideias categorizadas para seus próximos projetos
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar e Filtrar Ideias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesquisar
              </label>
              <Input
                placeholder="Digite palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Todas as categorias' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível de Complexidade
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level === 'all' ? 'Todos os níveis' : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideas Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredIdeas.length} ideias encontradas
          </h2>
          <Badge variant="outline" className="text-sm">
            Mostrando {filteredIdeas.length} de {ideas.length} ideias
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <Badge className={getLevelColor(idea.level)}>
                    {idea.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-gray-900">
                  {idea.title}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {idea.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {idea.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Tecnologias sugeridas:</p>
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full btn-primary mt-4"
                  onClick={() => handleGeneratePRD(idea)}
                >
                  Gerar PRD desta Ideia
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button 
          variant="outline" 
          size="lg" 
          className="px-8"
          onClick={handleLoadMoreIdeas}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Carregando...
            </>
          ) : (
            'Carregar mais ideias'
          )}
        </Button>
        <p className="text-gray-500 text-sm mt-2">
          +2.994 ideias disponíveis
        </p>
      </div>
    </div>
  )
}
