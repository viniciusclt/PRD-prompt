
"use client"

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/vendas') // Redirect to sales page instead of login
    }
  }, [session, status, router])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">P</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          PRD-Prompt
        </h1>
        
        <p className="text-gray-600 mb-8">Transforme ideias em produtos digitais</p>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="text-gray-500 text-sm">Carregando sua experiência...</p>
      </div>
    </div>
  )
}
