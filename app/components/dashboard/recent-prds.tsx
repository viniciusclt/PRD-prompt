
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

interface PRD {
  id: string
  title: string
  appName: string
  industry: string
  createdAt: string
}

export default function RecentPRDs() {
  const [prds, setPrds] = useState<PRD[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPrds([
        {
          id: '1',
          title: 'App de Delivery de Comida',
          appName: 'FoodExpress',
          industry: 'Food & Beverage',
          createdAt: '2025-01-15'
        },
        {
          id: '2',
          title: 'Plataforma de Gestão de Tarefas',
          appName: 'TaskMaster',
          industry: 'Produtividade',
          createdAt: '2025-01-14'
        },
        {
          id: '3',
          title: 'App de Meditação e Wellness',
          appName: 'MindfulMoments',
          industry: 'Saúde & Bem-estar',
          createdAt: '2025-01-12'
        }
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          PRDs Recentes
        </CardTitle>
        <CardDescription>
          Seus documentos mais recentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : prds.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhum PRD encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Comece criando um PRD para organizar suas ideias
            </p>
            <Button asChild>
              <Link href="/generate-prd">
                <Plus className="w-4 h-4 mr-2" />
                Criar novo PRD
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {prds.map((prd) => (
              <div
                key={prd.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{prd.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(prd.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{prd.appName}</span>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                    {prd.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
