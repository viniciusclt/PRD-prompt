
"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Code, Lightbulb, Activity } from 'lucide-react'

interface StatsData {
  prdsGenerated: number
  promptsGenerated: number
  ideasExplored: number
  completionRate: number
}

export default function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    prdsGenerated: 0,
    promptsGenerated: 0,
    ideasExplored: 0,
    completionRate: 0
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate loading and counting animation
    const timer = setTimeout(() => {
      setStats({
        prdsGenerated: 12,
        promptsGenerated: 8,
        ideasExplored: 24,
        completionRate: 67
      })
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const statsConfig = [
    {
      title: "PRDs Gerados",
      value: `${stats.prdsGenerated}+`,
      subtitle: `${Math.floor(stats.prdsGenerated / 3)} desde o último mês`,
      icon: FileText,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Prompts Gerados",
      value: `${stats.promptsGenerated}+`,
      subtitle: `${Math.floor(stats.promptsGenerated / 2)} desde o último mês`,
      icon: Code,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Ideias Exploradas",
      value: `${stats.ideasExplored}+`,
      subtitle: `${Math.floor(stats.ideasExplored / 4)} desde o último mês`,
      icon: Lightbulb,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Taxa de Conclusão",
      value: `${stats.completionRate}%`,
      subtitle: "PRDs com prompts gerados",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card 
            key={stat.title} 
            className={`glass-card hover-card ${isLoaded ? 'animate-count-up' : ''}`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
