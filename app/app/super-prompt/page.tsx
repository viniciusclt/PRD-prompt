
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Star, Palette } from 'lucide-react'

export default function SuperPromptPage() {
  const [projectType, setProjectType] = useState('')
  const [description, setDescription] = useState('')
  const [visualStyle, setVisualStyle] = useState('')
  const [selectedPalette, setSelectedPalette] = useState('')
  const [specialElements, setSpecialElements] = useState<string[]>([])
  const [targetAudience, setTargetAudience] = useState('')
  const [objectives, setObjectives] = useState('')
  const [specificFeatures, setSpecificFeatures] = useState('')
  const [includeHeroVideo, setIncludeHeroVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const projectTypes = [
    'Website Corporativo',
    'Landing Page',
    'E-commerce',
    'Aplicativo Mobile',
    'Dashboard Administrativo',
    'Blog/Magazine',
    'Portfolio',
    'Plataforma SaaS',
    'Site Institucional'
  ]

  const visualStyles = [
    'Moderno/Contemporâneo',
    'Minimalista',
    'Corporativo/Profissional',
    'Criativo/Artístico',
    'Tecnológico/Futurista',
    'Elegante/Luxuoso',
    'Divertido/Jovem',
    'Clássico/Tradicional'
  ]

  const colorPalettes = [
    { name: 'Azul Confiança', colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'] },
    { name: 'Escuro Moderno', colors: ['#111827', '#374151', '#6b7280', '#9ca3af'] },
    { name: 'Tons Terra', colors: ['#92400e', '#d97706', '#f59e0b', '#fbbf24'] },
    { name: 'Verde Sustentável', colors: ['#065f46', '#059669', '#10b981', '#34d399'] },
    { name: 'Roxo Criativo', colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa'] },
    { name: 'Preto & Dourado', colors: ['#000000', '#1f1f1f', '#d4af37', '#ffd700'] },
    { name: 'Brisa do Oceano', colors: ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9'] },
    { name: 'Pastéis Quentes', colors: ['#fecaca', '#fed7aa', '#fde68a', '#d9f99d'] },
    { name: 'Verde Sálvia', colors: ['#6b7280', '#9ca3af', '#a7f3d0', '#6ee7b7'] },
    { name: 'Rosa Empoeirado', colors: ['#be185d', '#e11d48', '#f43f5e', '#fb7185'] },
    { name: 'Névoa de Lavanda', colors: ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc'] },
    { name: 'Azul Corporativo', colors: ['#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6'] }
  ]

  const elements = [
    'Animações/Micro-interações',
    'Dark Mode',
    'Formulários Avançados',
    'Mapas Interativos',
    'Chatbot',
    'Carrosséis/Sliders',
    'Modais/Pop-ups',
    'Filtros/Busca',
    'Comentários/Reviews',
    'Sistema de Login',
    'Dashboard de Analytics',
    'Calendário/Agenda'
  ]

  const toggleElement = (element: string) => {
    setSpecialElements(prev => 
      prev.includes(element) 
        ? prev.filter(e => e !== element)
        : [...prev, element]
    )
  }

  const handleGenerateSuperPrompt = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Super Prompt gerado com sucesso! (Funcionalidade completa será implementada)')
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Super Prompt
          </h1>
          <Badge variant="default">NEW</Badge>
        </div>
        <p className="text-gray-600">
          Crie prompts avançados com customização visual completa e seleção de paletas de cores
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-500" />
            Configuração Avançada
          </CardTitle>
          <CardDescription>
            Configure todos os aspectos do seu projeto para gerar um prompt super detalhado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Project Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tipo de Projeto
            </label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de projeto" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Descrição do Projeto
            </label>
            <Textarea
              placeholder="Descreva seu projeto em detalhes: propósito, funcionalidades principais, características especiais..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {/* Visual Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Estilo Visual
            </label>
            <Select value={visualStyle} onValueChange={setVisualStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estilo visual" />
              </SelectTrigger>
              <SelectContent>
                {visualStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Palette */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-indigo-500" />
              <label className="text-sm font-medium text-gray-700">
                Paleta de Cores
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorPalettes.map((palette) => (
                <div
                  key={palette.name}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedPalette === palette.name
                      ? 'border-indigo-500 ring-2 ring-indigo-200'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setSelectedPalette(palette.name)}
                >
                  <div className="flex gap-1 mb-2">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {palette.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Special Elements */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              Elementos Especiais
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {elements.map((element) => (
                <div key={element} className="flex items-center space-x-2">
                  <Checkbox
                    id={element}
                    checked={specialElements.includes(element)}
                    onCheckedChange={() => toggleElement(element)}
                  />
                  <label
                    htmlFor={element}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {element}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Público-Alvo
              </label>
              <Input
                placeholder="Ex: Profissionais de 25-40 anos, Empresários, Estudantes..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Objetivos do Projeto
              </label>
              <Input
                placeholder="Ex: Aumentar conversões, Melhorar experiência do usuário..."
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
              />
            </div>
          </div>

          {/* Specific Features */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Funcionalidades Específicas (Opcional)
            </label>
            <Textarea
              placeholder="Ex: Sistema de autenticação, integração com API, formulários específicos..."
              value={specificFeatures}
              onChange={(e) => setSpecificFeatures(e.target.value)}
            />
          </div>

          {/* Hero Video Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hero-video"
              checked={includeHeroVideo}
              onCheckedChange={(checked) => setIncludeHeroVideo(checked === true)}
            />
            <label htmlFor="hero-video" className="text-sm text-gray-700">
              Adicionar vídeo na hero section
            </label>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleGenerateSuperPrompt}
              disabled={isLoading || !projectType || !description}
              size="lg"
              className="px-12 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Gerando Super Prompt...
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2" />
                  Gerar Super Prompt
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
