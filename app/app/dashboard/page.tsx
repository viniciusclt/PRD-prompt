
import StatsCards from '@/components/dashboard/stats-cards'
import RecentPRDs from '@/components/dashboard/recent-prds'
import QuickActions from '@/components/dashboard/quick-actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Acompanhe sua produtividade e acesse rapidamente as ferramentas da plataforma
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Acompanhe a evolução da sua produtividade nos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
                <p className="text-gray-500">Gráfico de atividade será implementado em breve</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>

      {/* Recent PRDs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentPRDs />
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Dicas e Sugestões</CardTitle>
            <CardDescription>
              Maximize o potencial da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  💡 Use o Super Prompt
                </h3>
                <p className="text-sm text-gray-600">
                  Experimente a nova funcionalidade Super Prompt para criar prompts mais detalhados com seleção visual de cores.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  🎯 Explore o Catálogo
                </h3>
                <p className="text-sm text-gray-600">
                  Temos mais de 3000 ideias categorizadas. Use os filtros para encontrar inspiração para seu próximo projeto.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  📝 Organize seus PRDs
                </h3>
                <p className="text-sm text-gray-600">
                  Mantenha seus documentos organizados na seção "Meus Documentos" para fácil acesso e reutilização.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
