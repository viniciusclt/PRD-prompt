
"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Code, 
  Star, 
  Lightbulb, 
  FolderOpen, 
  Grid3X3,
  LogOut
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: 'PRINCIPAL',
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        description: 'Visão geral e estatísticas'
      },
      {
        name: 'Gerar PRD',
        url: '/generate-prd',
        icon: FileText,
        description: 'Criar documentos de requisitos'
      },
      {
        name: 'Gerar Prompt',
        url: '/generate-prompt',
        icon: Code,
        description: 'Prompts para ferramentas de IA'
      },
      {
        name: 'Super Prompt',
        url: '/super-prompt',
        icon: Star,
        badge: 'NEW',
        description: 'Geração avançada com customização visual'
      }
    ]
  },
  {
    title: 'RECURSOS',
    items: [
      {
        name: 'Catálogo de Ideias',
        url: '/idea-catalog',
        icon: Lightbulb,
        description: '3000+ ideias categorizadas'
      },
      {
        name: 'Meus Documentos',
        url: '/my-documents',
        icon: FolderOpen,
        description: 'Gerenciar PRDs e prompts'
      },
      {
        name: 'Vitrine de Projetos',
        url: '/showcase',
        icon: Grid3X3,
        description: 'Projetos criados com a plataforma'
      }
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <aside className="w-64 h-screen sidebar-gradient border-r border-white/20 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
          PRD-Prompt
        </h1>
        <p className="text-sm text-gray-600 mt-1">Beta</p>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session?.user?.name || 'Usuário'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
        {sidebarItems?.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items?.map((item) => {
                const isActive = pathname === item.url
                const Icon = item.icon
                
                return (
                  <li key={item.name}>
                    <Link href={item.url}>
                      <div className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group hover:bg-white/60 hover:shadow-sm",
                        isActive 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md" 
                          : "text-gray-700 hover:text-gray-900"
                      )}>
                        <Icon className={cn(
                          "w-5 h-5 transition-colors",
                          isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-500"
                        )} />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge variant="default" className="text-xs px-2 py-0">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-4">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">3000 Ideias Cadastradas</p>
          <Link href="/idea-catalog" className="text-xs text-indigo-600 hover:text-indigo-700">
            Ver catálogo de ideias
          </Link>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-gray-600 hover:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </aside>
  )
}
