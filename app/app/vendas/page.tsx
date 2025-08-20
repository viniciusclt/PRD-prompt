
"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export default function VendasPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-gray-900">PRD-Prompt</span>
            </div>
            
            <Button 
              className="btn-primary"
              onClick={() => alert('🚀 Redirecionando para pagamento... (Demo)')}
            >
              Assinar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforme Ideias em{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Produtos Digitais
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A plataforma completa de IA para Product Managers e Desenvolvedores. 
            Crie PRDs, prompts técnicos, modelos de banco de dados e muito mais em minutos.
          </p>

          <Button 
            className="btn-primary-large w-full sm:w-auto"
            onClick={() => alert('🚀 Iniciando processo de assinatura... (Demo)')}
          >
            Começar Agora - R$ 39,99/mês
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mais de 3.000 Ideias de Apps Disponíveis
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Acesse nosso catálogo completo de ideias categorizadas e crie PRDs profissionais instantaneamente. 
            Cada ideia vem com detalhes completos prontos para transformar em documentação técnica.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em uma plataforma
            </h2>
            <p className="text-lg text-gray-600">
              8 ferramentas poderosas integradas para acelerar seu desenvolvimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Geração de PRDs Profissionais",
                description: "Transforme suas ideias em documentos de especificação técnica completos e estruturados em minutos.",
                icon: "📋"
              },
              {
                title: "Prompts Técnicos Otimizados", 
                description: "Crie prompts perfeitos para Lovable, V0, Cursor e outras ferramentas de IA.",
                icon: "⚡"
              },
              {
                title: "Modelagem de Banco de Dados",
                description: "Gere automaticamente modelos de banco de dados completos com diagramas ER.",
                icon: "🗄️"
              },
              {
                title: "Diagramas de Fluxo Interativos",
                description: "Visualize fluxos de usuário e processos com diagramas profissionais e interativos.",
                icon: "🔄"
              },
              {
                title: "Planejamento de Interface", 
                description: "Planeje e estruture interfaces de usuário de forma organizada e eficiente.",
                icon: "🎨"
              },
              {
                title: "Pesquisa de Concorrentes",
                description: "Analise competitors e identifique oportunidades de mercado automaticamente.",
                icon: "🔍"
              },
              {
                title: "Prompts para Logotipos",
                description: "Gere prompts otimizados para criar logotipos únicos com IA, incluindo vídeo tutorial completo.",
                icon: "🎯"
              },
              {
                title: "Catálogo de 3.000+ Ideias",
                description: "Acesse nosso banco completo de ideias categorizadas para inspirar seus projetos.",
                icon: "💡"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Um plano simples para todos
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8 max-w-md mx-auto border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Pro</h3>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-blue-600">R$ 39,99</span>
              <span className="text-gray-600">/mês</span>
            </div>

            <ul className="space-y-3 mb-8 text-left">
              {[
                "Geração ilimitada de PRDs",
                "Prompts técnicos otimizados",
                "Modelagem de banco de dados",
                "Diagramas de fluxo interativos",
                "Catálogo completo de 3.000+ ideias",
                "Pesquisa de concorrentes",
                "Prompts para logotipos",
                "Suporte prioritário"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="btn-primary w-full text-lg py-6"
              onClick={() => alert('🚀 Iniciando assinatura do Plano Pro... (Demo)')}
            >
              Assinar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "Como funciona a geração de PRDs?",
                answer: "Nossa IA avançada analisa suas ideias e gera documentos de PRD completos e estruturados em minutos, incluindo funcionalidades, requisitos técnicos, user stories e muito mais."
              },
              {
                question: "Os documentos gerados podem ser compartilhados?",
                answer: "Sim! Todos os documentos podem ser exportados em diversos formatos (PDF, Word, Markdown) e compartilhados facilmente com sua equipe."
              },
              {
                question: "Como funcionam os prompts para logos?",
                answer: "Geramos prompts otimizados para ferramentas de IA como Midjourney, DALL-E e Leonardo AI, incluindo tutoriais em vídeo para você criar logotipos profissionais."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para acelerar seu desenvolvimento?
          </h2>
          
          <Button 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg py-6 px-12 shadow-xl"
            onClick={() => alert('🚀 Último passo para começar sua jornada! (Demo)')}
          >
            Começar Agora - R$ 39,99/mês
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>PRDs</li>
                <li>Prompts</li>
                <li>Ideias</li>
                <li>Projetos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreira</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Ajuda</li>
                <li>Contato</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PRD-Prompt. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
