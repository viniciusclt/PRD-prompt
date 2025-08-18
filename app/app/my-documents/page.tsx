
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FolderOpen, Search, FileText, Code, Calendar, Plus, Grid, List, Filter } from 'lucide-react'
import Link from 'next/link'

interface Document {
  id: string
  title: string
  type: 'PRD' | 'Prompt'
  industry?: string
  technology?: string
  createdAt: string
  updatedAt: string
  description?: string
}

export default function MyDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in production this would come from API
  useEffect(() => {
    const mockDocuments: Document[] = [
      {
        id: '1',
        title: 'App de Delivery de Comida',
        type: 'PRD',
        industry: 'Food & Beverage',
        createdAt: '2025-01-15',
        updatedAt: '2025-01-15',
        description: 'Plataforma de entrega de comida com rastreamento em tempo real - FoodExpress'
      },
      {
        id: '2',
        title: 'Prompt React Native - FoodExpress',
        type: 'Prompt',
        technology: 'React Native',
        createdAt: '2025-01-15',
        updatedAt: '2025-01-15',
        description: 'Prompt otimizado para criar app de delivery usando React Native'
      },
      {
        id: '3',
        title: 'Plataforma de Gestão de Tarefas',
        type: 'PRD',
        industry: 'Produtividade',
        createdAt: '2025-01-14',
        updatedAt: '2025-01-14',
        description: 'Sistema completo de gestão de tarefas - TaskMaster'
      },
      {
        id: '4',
        title: 'App de Meditação e Wellness',
        type: 'PRD',
        industry: 'Saúde & Bem-estar',
        createdAt: '2025-01-12',
        updatedAt: '2025-01-12',
        description: 'Aplicativo de meditação guiada - MindfulMoments'
      },
      {
        id: '5',
        title: 'Prompt Next.js - TaskMaster',
        type: 'Prompt',
        technology: 'Next.js',
        createdAt: '2025-01-11',
        updatedAt: '2025-01-11',
        description: 'Prompt para desenvolvimento web com Next.js e TypeScript'
      }
    ]

    setTimeout(() => {
      setDocuments(mockDocuments)
      setFilteredDocuments(mockDocuments)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter and sort documents
  useEffect(() => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType)
    }

    // Sort documents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredDocuments(filtered)
  }, [searchTerm, selectedType, sortBy, documents])

  const handleDeleteDocument = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id))
    }
  }

  const getDocumentIcon = (type: string) => {
    return type === 'PRD' ? FileText : Code
  }

  const getDocumentTypeColor = (type: string) => {
    return type === 'PRD' 
      ? 'bg-indigo-100 text-indigo-800' 
      : 'bg-green-100 text-green-800'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Meus Documentos
        </h1>
        <p className="text-gray-600">
          Gerencie todos os seus PRDs e prompts criados na plataforma
        </p>
      </div>

      {/* Filters and Controls */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-500" />
            Filtros e Controles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar documentos por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="PRD">PRDs</SelectItem>
                <SelectItem value="Prompt">Prompts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                <SelectItem value="title">Título (A-Z)</SelectItem>
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
              {filteredDocuments.length} documento(s) encontrado(s)
            </span>
            <Button asChild size="sm">
              <Link href="/generate-prd">
                <Plus className="w-4 h-4 mr-2" />
                Criar novo PRD
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  <div className="h-16 bg-gray-100 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredDocuments.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedType !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Comece criando um PRD na seção "Gerar PRD"'
              }
            </p>
            <Button asChild>
              <Link href="/generate-prd">
                <Plus className="w-4 h-4 mr-2" />
                Criar novo PRD
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredDocuments.map((doc) => {
            const Icon = getDocumentIcon(doc.type)
            return (
              <Card key={doc.id} className="glass-card hover-card">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <CardTitle className="text-lg leading-tight">
                        {doc.title}
                      </CardTitle>
                    </div>
                    <Badge className={getDocumentTypeColor(doc.type)}>
                      {doc.type}
                    </Badge>
                  </div>
                  {doc.industry && (
                    <CardDescription className="text-indigo-600 font-medium">
                      {doc.industry}
                    </CardDescription>
                  )}
                  {doc.technology && (
                    <CardDescription className="text-green-600 font-medium">
                      {doc.technology}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {doc.description && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {doc.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => alert(`Visualizando documento: ${doc.title}`)}>
                      Visualizar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
