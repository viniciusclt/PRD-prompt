
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FilePlus, Code, Lightbulb } from 'lucide-react'
import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      title: 'Criar Novo PRD',
      subtitle: 'Documento de requisitos',
      icon: FilePlus,
      href: '/generate-prd',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Gerar Prompt',
      subtitle: 'Prompts técnicos para IAs',
      icon: Code,
      href: '/generate-prompt',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Explorar Ideias',
      subtitle: 'Catálogo de ideias',
      icon: Lightbulb,
      href: '/idea-catalog',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>
          Acesse rapidamente as principais funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                asChild
                variant="ghost"
                className="w-full justify-start gap-4 h-auto p-4 hover:bg-white/80"
              >
                <Link href={action.href}>
                  <div className={`p-3 rounded-full ${action.bgColor}`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {action.subtitle}
                    </div>
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
