
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Palette, Copy, Heart, Search } from 'lucide-react'
import { useState } from 'react'

export default function PaletasPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const colorPalettes = [
    {
      name: "Azul Confiança",
      category: "Corporativo",
      colors: ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"],
      likes: 324
    },
    {
      name: "Roxo Criativo",
      category: "Design",
      colors: ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ede9fe"],
      likes: 256
    },
    {
      name: "Verde Natureza",
      category: "Sustentabilidade",
      colors: ["#059669", "#10b981", "#34d399", "#6ee7b7", "#d1fae5"],
      likes: 189
    },
    {
      name: "Laranja Energia",
      category: "Dinâmico",
      colors: ["#ea580c", "#f97316", "#fb923c", "#fdba74", "#fed7aa"],
      likes: 167
    },
    {
      name: "Rosa Moderno",
      category: "Feminino",
      colors: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3"],
      likes: 298
    },
    {
      name: "Cinza Minimalista",
      category: "Neutro",
      colors: ["#374151", "#6b7280", "#9ca3af", "#d1d5db", "#f3f4f6"],
      likes: 412
    },
    {
      name: "Azul Oceano",
      category: "Aquático", 
      colors: ["#0c4a6e", "#0369a1", "#0284c7", "#0ea5e9", "#38bdf8"],
      likes: 223
    },
    {
      name: "Amarelo Solar",
      category: "Alegre",
      colors: ["#ca8a04", "#eab308", "#facc15", "#fde047", "#fef3c7"],
      likes: 145
    },
    {
      name: "Vermelho Paixão",
      category: "Intenso",
      colors: ["#dc2626", "#ef4444", "#f87171", "#fca5a5", "#fecaca"],
      likes: 278
    }
  ]

  const categories = ["Todos", "Corporativo", "Design", "Sustentabilidade", "Dinâmico", "Feminino", "Neutro", "Aquático", "Alegre", "Intenso"]

  const filteredPalettes = colorPalettes.filter(palette =>
    palette.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    palette.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyPalette = (palette: typeof colorPalettes[0]) => {
    const colors = palette.colors.join(', ')
    navigator.clipboard.writeText(colors)
    alert(`✅ Paleta "${palette.name}" copiada! Cores: ${colors}`)
  }

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
    alert(`✅ Cor ${color} copiada!`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 Paletas de Cores
        </h1>
        <p className="text-xl text-gray-600">
          Encontre paletas perfeitas para seus designs e projetos
        </p>
      </div>

      {/* Search */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Paletas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Pesquise por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge 
              key={index}
              variant={category === "Todos" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Palettes Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredPalettes.length} paletas encontradas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPalettes.map((palette, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-1">
                      {palette.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {palette.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{palette.likes}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Color Preview */}
                <div className="grid grid-cols-5 gap-1 h-16 rounded-lg overflow-hidden">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="cursor-pointer hover:scale-105 transition-transform duration-200 relative group"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center">
                        <Copy className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Color Values */}
                <div className="space-y-1">
                  {palette.colors.map((color, colorIndex) => (
                    <div key={colorIndex} className="flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-600">{color}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-5 w-5 p-0"
                        onClick={() => copyColor(color)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => copyPalette(palette)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Paleta
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Generate Custom */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Gerar Paleta Personalizada
          </CardTitle>
          <CardDescription className="text-purple-700">
            Crie uma paleta única baseada em suas preferências e necessidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Descreva o estilo desejado..." className="flex-1" />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Gerar com IA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
