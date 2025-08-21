
"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Star, Palette, AlertTriangle, Zap } from 'lucide-react'

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
    if (!projectType || !description || !visualStyle) {
      alert('Por favor, preencha os campos obrigatórios: Tipo de Projeto, Descrição e Estilo Visual')
      return
    }

    setIsLoading(true)
    
    try {
      const prompt = `Crie um ${projectType.toLowerCase()} com as seguintes características:

DESCRIÇÃO: ${description}

ESTILO VISUAL: ${visualStyle}

PALETA DE CORES: ${selectedPalette || 'A definir pela IA'}

${specialElements.length > 0 ? `ELEMENTOS ESPECIAIS: ${specialElements.join(', ')}` : ''}

${targetAudience ? `PÚBLICO-ALVO: ${targetAudience}` : ''}

${objectives ? `OBJETIVOS: ${objectives}` : ''}

${specificFeatures ? `FUNCIONALIDADES ESPECÍFICAS: ${specificFeatures}` : ''}

${includeHeroVideo ? 'INCLUIR: Vídeo hero na página inicial' : ''}

Por favor, gere um prompt técnico detalhado para desenvolvimento usando ferramentas modernas como React, Next.js, Tailwind CSS, garantindo responsividade e uma experiência de usuário excelente.`

      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Criar uma nova aba com o resultado
        const newWindow = window.open('', '_blank')
        if (newWindow) {
          newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Super Prompt Gerado - PRD Prompt</title>
              <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="bg-gray-100 p-6">
              <div class="max-w-5xl mx-auto">
                <header class="mb-8 text-center">
                  <h1 class="text-4xl font-bold text-gray-900 mb-2">🚀 Super Prompt Gerado</h1>
                  <p class="text-gray-600 text-lg">Seu prompt técnico otimizado está pronto para uso!</p>
                </header>
                
                <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📋 Especificações do Projeto
                  </h2>
                  <div class="grid md:grid-cols-3 gap-4 text-sm">
                    <div class="bg-gray-50 p-3 rounded"><strong>Tipo:</strong><br>${projectType}</div>
                    <div class="bg-gray-50 p-3 rounded"><strong>Estilo:</strong><br>${visualStyle}</div>
                    ${selectedPalette ? `<div class="bg-gray-50 p-3 rounded"><strong>Paleta:</strong><br>${selectedPalette}</div>` : '<div class="bg-gray-50 p-3 rounded"><strong>Paleta:</strong><br>A definir pela IA</div>'}
                    ${targetAudience ? `<div class="bg-gray-50 p-3 rounded"><strong>Público:</strong><br>${targetAudience}</div>` : ''}
                    ${objectives ? `<div class="bg-gray-50 p-3 rounded"><strong>Objetivos:</strong><br>${objectives}</div>` : ''}
                    ${includeHeroVideo ? '<div class="bg-gray-50 p-3 rounded"><strong>Extra:</strong><br>Vídeo Hero</div>' : ''}
                  </div>
                </div>

                <div class="bg-white rounded-lg shadow-lg p-8">
                  <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      ✨ Prompt Técnico Otimizado
                    </h2>
                    <button onclick="navigator.clipboard.writeText(document.getElementById('generated-prompt').innerText).then(() => alert('✅ Prompt copiado!'))" 
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      📋 Copiar Prompt
                    </button>
                  </div>
                  <div id="generated-prompt" class="bg-gray-50 p-6 rounded-lg border-l-4 border-gradient-to-r from-blue-600 to-purple-600 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
${data.generatedPrompt || prompt}
                  </div>
                  
                  <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 class="font-semibold text-blue-800 mb-2">💡 Como usar este prompt:</h3>
                    <ol class="text-sm text-blue-700 space-y-1">
                      <li>1. Copie o prompt acima</li>
                      <li>2. Cole em sua ferramenta de IA favorita (ChatGPT, Claude, Cursor, etc.)</li>
                      <li>3. Ajuste conforme necessário para seu projeto específico</li>
                      <li>4. Execute e desenvolva seu projeto!</li>
                    </ol>
                  </div>
                </div>
                
                <div class="mt-8 text-center">
                  <button onclick="window.close()" 
                          class="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-lg">
                    Fechar Janela
                  </button>
                </div>
              </div>
            </body>
            </html>
          `)
          newWindow.document.close()
        }
        
        alert('✅ Super Prompt gerado com sucesso! Uma nova aba foi aberta com o resultado.')
      } else {
        throw new Error('Falha ao gerar o prompt')
      }
    } catch (error) {
      console.error('Erro ao gerar prompt:', error)
      // Se a API falhar, exibir o prompt básico mesmo assim
      const basicPrompt = `Crie um ${projectType.toLowerCase()} com as seguintes características:

DESCRIÇÃO: ${description}
ESTILO VISUAL: ${visualStyle}
PALETA DE CORES: ${selectedPalette || 'A definir pela IA'}
${specialElements.length > 0 ? `ELEMENTOS ESPECIAIS: ${specialElements.join(', ')}` : ''}
${targetAudience ? `PÚBLICO-ALVO: ${targetAudience}` : ''}
${objectives ? `OBJETIVOS: ${objectives}` : ''}
${specificFeatures ? `FUNCIONALIDADES ESPECÍFICAS: ${specificFeatures}` : ''}
${includeHeroVideo ? 'INCLUIR: Vídeo hero na página inicial' : ''}

Por favor, gere um prompt técnico detalhado para desenvolvimento usando ferramentas modernas como React, Next.js, Tailwind CSS, garantindo responsividade e uma experiência de usuário excelente.`

      // Criar uma nova aba com o prompt básico
      const newWindow = window.open('', '_blank')
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Super Prompt Gerado - PRD Prompt</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-gray-100 p-6">
            <div class="max-w-5xl mx-auto">
              <header class="mb-8 text-center">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">🚀 Super Prompt Gerado</h1>
                <p class="text-gray-600 text-lg">Seu prompt técnico está pronto para uso!</p>
              </header>
              
              <div class="bg-white rounded-lg shadow-lg p-8">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    ✨ Prompt Técnico
                  </h2>
                  <button onclick="navigator.clipboard.writeText(document.getElementById('generated-prompt').innerText).then(() => alert('✅ Prompt copiado!'))" 
                          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    📋 Copiar Prompt
                  </button>
                </div>
                <div id="generated-prompt" class="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 whitespace-pre-wrap text-sm leading-relaxed">
${basicPrompt}
                </div>
              </div>
              
              <div class="mt-8 text-center">
                <button onclick="window.close()" 
                        class="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-lg">
                  Fechar Janela
                </button>
              </div>
            </div>
          </body>
          </html>
        `)
        newWindow.document.close()
      }
      
      alert('✅ Super Prompt gerado! (Versão básica - API não disponível)')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com ícone do Super Prompt */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 mb-4 shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Super Prompt
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Crie prompts ultra-detalhados para design de interfaces com especificações técnicas e visuais completas
        </p>
      </div>

      {/* Aviso de Funcionalidade em Teste */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800 mb-1">
              ⚠️ Funcionalidade em Fase de Teste
            </h3>
            <p className="text-sm text-yellow-700">
              Esta é uma nova funcionalidade experimental. Estamos continuamente melhorando-a com base no feedback dos usuários. Se encontrar algum problema ou tiver sugestões, entre em contato conosco.
            </p>
          </div>
        </div>
      </div>

      {/* Configuração Avançada */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-900">Configuração Avançada</h2>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Configure todos os aspectos do seu projeto para gerar um prompt super detalhado
        </p>

        <div className="space-y-6">
          {/* Tipo de Projeto */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Zap className="w-4 h-4 text-purple-500" />
              Tipo de Projeto
            </label>
            <p className="text-xs text-gray-500 mb-2">Selecione o tipo de projeto que você deseja criar</p>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha o tipo de projeto" />
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

          {/* Descrição do Projeto */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Zap className="w-4 h-4 text-purple-500" />
              Descrição do Projeto
            </label>
            <p className="text-xs text-gray-500 mb-2">Descreva detalhadamente o que você quer criar</p>
            <Textarea
              placeholder="Descreva seu projeto em detalhes: propósito, funcionalidades principais, características especiais..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Estilo Visual */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Estilo Visual</label>
            <Select value={visualStyle} onValueChange={setVisualStyle}>
              <SelectTrigger className="w-full">
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

          {/* Paleta de Cores */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm font-medium text-gray-700">Paleta de Cores</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {colorPalettes.map((palette) => (
                <div
                  key={palette.name}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedPalette === palette.name
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedPalette(palette.name)}
                >
                  <div className="flex gap-1 mb-2">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-800 text-center">
                    {palette.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Elementos Especiais */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Elementos Especiais</label>
            <div className="grid grid-cols-3 gap-3">
              {elements.map((element) => (
                <div key={element} className="flex items-center space-x-2">
                  <Checkbox
                    id={element}
                    checked={specialElements.includes(element)}
                    onCheckedChange={() => toggleElement(element)}
                  />
                  <label
                    htmlFor={element}
                    className="text-xs text-gray-700 cursor-pointer leading-tight"
                  >
                    {element}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Público-Alvo e Objetivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Público-Alvo</label>
              <Input
                placeholder="Ex: Profissionais de 25-40 anos, Empresários, Estudantes..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Objetivos do Projeto</label>
              <Input
                placeholder="Ex: Aumentar conversões, Melhorar experiência do usuário..."
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Funcionalidades Específicas */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Funcionalidades Específicas (Opcional)</label>
            <Textarea
              placeholder="Ex: Sistema de autenticação, integração com API, formulários específicos..."
              value={specificFeatures}
              onChange={(e) => setSpecificFeatures(e.target.value)}
              className="min-h-[80px] resize-none text-sm"
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
        </div>
      </div>

      {/* Botão Gerar Super Prompt */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleGenerateSuperPrompt}
          disabled={isLoading || !projectType || !description}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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
    </div>
  )
}
