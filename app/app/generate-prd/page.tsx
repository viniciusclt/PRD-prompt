
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Sparkles } from 'lucide-react'

export default function GeneratePRDPage() {
  const [title, setTitle] = useState('')
  const [appName, setAppName] = useState('')
  const [description, setDescription] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [complexity, setComplexity] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const industries = [
    'Tecnologia',
    'Saúde & Bem-estar',
    'Educação',
    'Fintech',
    'E-commerce',
    'Food & Beverage',
    'Entretenimento',
    'Produtividade',
    'Social',
    'Negócios',
    'Inteligência Artificial'
  ]

  const audiences = [
    'Consumidores Gerais',
    'Profissionais',
    'Estudantes',
    'Empresas',
    'Desenvolvedores',
    'Empreendedores',
    'Crianças/Adolescentes',
    'Idosos',
    'Especialistas'
  ]

  const complexityLevels = [
    { value: 'Baixo', label: 'Baixo - Funcionalidades básicas' },
    { value: 'Médio', label: 'Médio - Funcionalidades intermediárias' },
    { value: 'Avançado', label: 'Avançado - Funcionalidades complexas' }
  ]

  const handleGeneratePRD = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('PRD gerado com sucesso! (Funcionalidade completa será implementada)')
    }, 2000)
  }

  const handleImproveDescription = async () => {
    if (!description) {
      alert('Por favor, adicione uma descrição primeiro')
      return
    }
    
    setIsLoading(true)
    // Simulate API call for improving description
    setTimeout(() => {
      setDescription(description + ' [Versão melhorada com IA]')
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerar Documento de Requisitos de Produto
        </h1>
        <p className="text-gray-600">
          Crie PRDs detalhados usando inteligência artificial para estruturar suas ideias de aplicativo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                Informações do Projeto
              </CardTitle>
              <CardDescription>
                Preencha os detalhes do seu aplicativo para gerar um PRD completo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Título do PRD (Opcional)
                </label>
                <Input
                  placeholder="Digite um título para seu PRD (opcional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nome do Aplicativo
                </label>
                <Input
                  placeholder="Como seu aplicativo se chama? (ex: TaskMaster, FoodDelivery)"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Descreva sua ideia de aplicativo
                </label>
                <Textarea
                  placeholder="Descreva sua ideia de aplicativo em detalhes. Quanto mais informações você fornecer, melhor será o PRD gerado."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleImproveDescription}
                  disabled={isLoading || !description}
                  className="mt-2"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Melhorar Descrição
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Indústria
                  </label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma indústria" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Público-alvo
                  </label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um público-alvo" />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map((audience) => (
                        <SelectItem key={audience} value={audience}>
                          {audience}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Complexidade
                  </label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a complexidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {complexityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleGeneratePRD}
                  disabled={isLoading || !appName || !description}
                  className="flex-1"
                >
                  {isLoading ? 'Gerando...' : 'Gerar PRD'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>PRDs Gerados</CardTitle>
              <CardDescription>
                Filtrar por: Todas as indústrias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  Nenhum PRD encontrado.
                  <br />
                  Comece criando seu primeiro PRD.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
