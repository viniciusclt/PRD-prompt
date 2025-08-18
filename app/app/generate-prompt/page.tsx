
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code, Sparkles } from 'lucide-react'

export default function GeneratePromptPage() {
  const [selectedPRD, setSelectedPRD] = useState('')
  const [technology, setTechnology] = useState('')
  const [framework, setFramework] = useState('')
  const [specialRequirements, setSpecialRequirements] = useState('')
  const [projectType, setProjectType] = useState('Aplicativo')
  const [isLoading, setIsLoading] = useState(false)

  const technologies = [
    'React + TypeScript',
    'Vue.js',
    'Angular',
    'Svelte',
    'React Native',
    'Flutter',
    'Next.js',
    'Nuxt.js'
  ]

  const frameworks = {
    'React + TypeScript': ['Next.js', 'Vite', 'Create React App', 'Gatsby'],
    'Vue.js': ['Nuxt.js', 'Vue CLI', 'Vite + Vue'],
    'Angular': ['Angular CLI', 'Nx'],
    'React Native': ['Expo', 'React Native CLI'],
    'Flutter': ['Flutter SDK']
  }

  const handleGeneratePrompt = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Prompt gerado com sucesso! (Funcionalidade completa será implementada)')
    }, 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerar Prompt para Ferramentas de IA
        </h1>
        <p className="text-gray-600">
          Transforme seu PRD em prompts otimizados para ferramentas de criação de aplicativos com IA (como Lovable).
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-500" />
            Configurações do Prompt
          </CardTitle>
          <CardDescription>
            Configure as opções para gerar o prompt perfeito
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Type Tabs */}
          <Tabs value={projectType} onValueChange={setProjectType} defaultValue="Aplicativo">
            <TabsList>
              <TabsTrigger value="Aplicativo" onClick={() => setProjectType('Aplicativo')}>Aplicativo</TabsTrigger>
              <TabsTrigger value="Landing Page" onClick={() => setProjectType('Landing Page')}>Landing Page</TabsTrigger>
            </TabsList>
            
            <TabsContent value="Aplicativo" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    PRD Base
                  </label>
                  <Select value={selectedPRD} onValueChange={setSelectedPRD}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um PRD para gerar o prompt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prd1">App de Delivery de Comida - FoodExpress</SelectItem>
                      <SelectItem value="prd2">Plataforma de Gestão de Tarefas - TaskMaster</SelectItem>
                      <SelectItem value="prd3">App de Meditação - MindfulMoments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tecnologia
                  </label>
                  <Select value={technology} onValueChange={(value) => {
                    setTechnology(value)
                    setFramework('') // Reset framework when technology changes
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a tecnologia" />
                    </SelectTrigger>
                    <SelectContent>
                      {technologies.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Framework
                  </label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger>
                      <SelectValue 
                        placeholder={technology ? "Selecione o framework" : "Selecione uma tecnologia primeiro"} 
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {technology && frameworks[technology as keyof typeof frameworks]?.map((fw) => (
                        <SelectItem key={fw} value={fw}>
                          {fw}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Requisitos Especiais
                </label>
                <Textarea
                  placeholder="Ex: Funcionalidades específicas, estilo visual, restrições técnicas, integrações necessárias..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-500">
                  será resumido para caber em 2.000 caracteres
                </p>
              </div>
            </TabsContent>

            <TabsContent value="Landing Page" className="space-y-6 mt-6">
              <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
                <Sparkles className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Modo Landing Page
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Configure as opções específicas para geração de prompts otimizados para landing pages.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleGeneratePrompt}
              disabled={isLoading || !selectedPRD || !technology}
              size="lg"
            >
              {isLoading ? 'Gerando...' : 'Gerar Prompt para Lovable'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Prompt Preview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Prompt Gerado</CardTitle>
          <CardDescription>
            O prompt aparecerá aqui após a geração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Code className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Configure as opções acima e clique em "Gerar Prompt" para ver o resultado
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
