
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create test user (required for testing)
  const hashedPassword = await bcryptjs.hash('johndoe123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPassword,
    },
  })
  
  console.log('✅ Test user created/updated')

  // Create color palettes for Super Prompt
  const colorPalettes = [
    {
      name: 'Azul Confiança',
      colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'],
      category: 'business'
    },
    {
      name: 'Escuro Moderno',
      colors: ['#111827', '#374151', '#6b7280', '#9ca3af'],
      category: 'modern'
    },
    {
      name: 'Tons Terra',
      colors: ['#92400e', '#d97706', '#f59e0b', '#fbbf24'],
      category: 'warm'
    },
    {
      name: 'Verde Sustentável',
      colors: ['#065f46', '#059669', '#10b981', '#34d399'],
      category: 'nature'
    },
    {
      name: 'Roxo Criativo',
      colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa'],
      category: 'creative'
    },
    {
      name: 'Preto & Dourado',
      colors: ['#000000', '#1f1f1f', '#d4af37', '#ffd700'],
      category: 'luxury'
    },
    {
      name: 'Brisa do Oceano',
      colors: ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9'],
      category: 'fresh'
    },
    {
      name: 'Pastéis Quentes',
      colors: ['#fecaca', '#fed7aa', '#fde68a', '#d9f99d'],
      category: 'soft'
    },
    {
      name: 'Verde Sálvia',
      colors: ['#6b7280', '#9ca3af', '#a7f3d0', '#6ee7b7'],
      category: 'natural'
    },
    {
      name: 'Rosa Empoeirado',
      colors: ['#be185d', '#e11d48', '#f43f5e', '#fb7185'],
      category: 'vibrant'
    }
  ]

  for (const palette of colorPalettes) {
    await prisma.colorPalette.upsert({
      where: { name: palette.name },
      update: {},
      create: palette,
    })
  }
  
  console.log('✅ Color palettes seeded')

  // Create sample ideas for the catalog
  const sampleIdeas = [
    {
      title: 'Computer Vision System',
      category: 'Inteligência Artificial',
      level: 'Médio',
      description: 'Sistema que facilita desenvolvimento de aplicações visão computacional.',
      tags: ['IA', 'Visão Computacional', 'Machine Learning']
    },
    {
      title: 'Natural Language Processing API',
      category: 'Inteligência Artificial',
      level: 'Médio',
      description: 'API que oferece capacidades NLP avançadas para desenvolvedores.',
      tags: ['IA', 'NLP', 'API', 'Processamento de Linguagem']
    },
    {
      title: 'AutoML Platform',
      category: 'Inteligência Artificial',
      level: 'Médio',
      description: 'Sistema que automatiza criação de modelos machine learning.',
      tags: ['IA', 'AutoML', 'Machine Learning', 'Automação']
    },
    {
      title: 'Neural Network Designer',
      category: 'Inteligência Artificial',
      level: 'Médio',
      description: 'Sistema que facilita design de arquiteturas redes neurais.',
      tags: ['IA', 'Redes Neurais', 'Deep Learning', 'Design']
    },
    {
      title: 'AI Model Marketplace',
      category: 'Inteligência Artificial',
      level: 'Baixo',
      description: 'Plataforma que facilita comércio de modelos IA treinados.',
      tags: ['IA', 'Marketplace', 'Modelos', 'Comércio']
    },
    {
      title: 'Deep Learning Framework',
      category: 'Inteligência Artificial',
      level: 'Avançado',
      description: 'Framework que simplifica desenvolvimento deep learning.',
      tags: ['IA', 'Deep Learning', 'Framework', 'Desenvolvimento']
    },
    {
      title: 'AI Ethics Monitor',
      category: 'Inteligência Artificial',
      level: 'Baixo',
      description: 'Sistema que monitora vieses e ética em sistemas IA.',
      tags: ['IA', 'Ética', 'Monitoramento', 'Vieses']
    },
    {
      title: 'Conversational AI Platform',
      category: 'Inteligência Artificial',
      level: 'Baixo',
      description: 'Sistema que facilita criação de chatbots inteligentes.',
      tags: ['IA', 'Chatbots', 'Conversational AI', 'Plataforma']
    },
    {
      title: 'AI Training Data Manager',
      category: 'Inteligência Artificial',
      level: 'Baixo',
      description: 'Sistema que gerencia datasets para treinamento IA.',
      tags: ['IA', 'Datasets', 'Treinamento', 'Gestão de Dados']
    },
    {
      title: 'App de Delivery de Comida',
      category: 'Food & Beverage',
      level: 'Médio',
      description: 'Plataforma de entrega de comida com rastreamento em tempo real e pagamento integrado.',
      tags: ['Delivery', 'Food', 'Mobile App', 'Pagamentos']
    },
    {
      title: 'Sistema de Gestão de Tarefas',
      category: 'Produtividade',
      level: 'Baixo',
      description: 'Aplicativo para organização de tarefas pessoais e em equipe com lembretes inteligentes.',
      tags: ['Produtividade', 'Gestão', 'Tarefas', 'Colaboração']
    },
    {
      title: 'App de Meditação e Wellness',
      category: 'Saúde & Bem-estar',
      level: 'Baixo',
      description: 'Aplicativo de meditação guiada com programas personalizados e acompanhamento de progresso.',
      tags: ['Meditação', 'Wellness', 'Saúde Mental', 'Mindfulness']
    },
    {
      title: 'Plataforma de E-learning',
      category: 'Educação',
      level: 'Médio',
      description: 'Sistema de aprendizagem online com cursos interativos e certificações.',
      tags: ['Educação', 'E-learning', 'Cursos Online', 'Certificação']
    },
    {
      title: 'App de Investimentos',
      category: 'Fintech',
      level: 'Avançado',
      description: 'Plataforma de investimentos com análise de risco e recomendações personalizadas.',
      tags: ['Fintech', 'Investimentos', 'Análise de Risco', 'Finanças']
    },
    {
      title: 'Sistema de Agendamento',
      category: 'Negócios',
      level: 'Baixo',
      description: 'Plataforma para agendamento de consultas e serviços com integração de calendário.',
      tags: ['Agendamento', 'Consultas', 'Calendário', 'Serviços']
    },
    {
      title: 'App de Monitoramento Fitness',
      category: 'Saúde & Bem-estar',
      level: 'Médio',
      description: 'Aplicativo para acompanhamento de atividades físicas com integração a wearables.',
      tags: ['Fitness', 'Saúde', 'Wearables', 'Atividade Física']
    },
    {
      title: 'Plataforma de Freelancers',
      category: 'Marketplace',
      level: 'Médio',
      description: 'Marketplace para conectar freelancers e clientes com sistema de pagamento seguro.',
      tags: ['Freelancers', 'Marketplace', 'Trabalho Remoto', 'Pagamentos']
    },
    {
      title: 'App de Controle de Estoque',
      category: 'Negócios',
      level: 'Médio',
      description: 'Sistema para controle de estoque com alertas automáticos e relatórios analíticos.',
      tags: ['Estoque', 'Inventário', 'Relatórios', 'Alertas']
    },
    {
      title: 'Rede Social para Pets',
      category: 'Social',
      level: 'Baixo',
      description: 'Rede social dedicada a donos de pets com funcionalidades de compartilhamento e cuidados.',
      tags: ['Pets', 'Rede Social', 'Compartilhamento', 'Cuidados']
    }
  ]

  for (const idea of sampleIdeas) {
    await prisma.idea.upsert({
      where: { title: idea.title },
      update: {},
      create: idea,
    })
  }
  
  console.log(`✅ ${sampleIdeas.length} ideas seeded`)

  // Create sample projects for showcase
  const sampleProjects = [
    {
      title: 'CRIATIVE',
      description: 'Feito no TRAE no MODO SOLO VC pode utilizar em outra ferramentas para criar projetos similares com design criativo e inovador.',
      platform: 'TRAE',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop',
      projectUrl: '#',
      promptUsed: 'Crie um design criativo e moderno para uma plataforma de inovação com paleta de cores vibrante e elementos interativos...',
      tags: ['Criativo', 'Design', 'Inovação'],
      featured: true
    },
    {
      title: 'LUXURY GOLD',
      description: 'E-commerce de tênis premium com design luxuoso em dourado. Use no TRAE de preferência para melhores resultados.',
      platform: 'Supabase + TRAE',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop',
      projectUrl: '#',
      promptUsed: 'Desenvolva um e-commerce premium para tênis com tema dourado luxuoso, incluindo carrinho, checkout e área do cliente...',
      tags: ['E-commerce', 'Luxury', 'Tênis'],
      featured: true
    },
    {
      title: 'Chronos',
      description: 'Projeto totalmente desenvolvido no TRAE modo SOLO. Para usar em outras ferramentas, copie o prompt e ajuste conforme necessário.',
      platform: 'TRAE',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
      projectUrl: '#',
      promptUsed: 'Crie uma aplicação de gestão de tempo com design escuro moderno, incluindo cronômetro, tarefas e relatórios de produtividade...',
      tags: ['Tempo', 'Produtividade', 'Dashboard'],
      featured: false
    },
    {
      title: 'ImobCRM',
      description: 'Projeto totalmente desenvolvido no TRAE modo SOLO. Sistema CRM especializado para o mercado imobiliário.',
      platform: 'TRAE',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop',
      projectUrl: '#',
      promptUsed: 'Desenvolva um CRM para imobiliárias com gestão de leads, propriedades, calendário de visitas e relatórios de vendas...',
      tags: ['CRM', 'Imobiliário', 'Vendas'],
      featured: false
    },
    {
      title: 'Premium Imóveis',
      description: 'Projeto feito totalmente com TRAE modo SOLO com apenas um Prompt. Site institucional para imobiliária de luxo.',
      platform: 'TRAE',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&h=300&fit=crop',
      projectUrl: '#',
      promptUsed: 'Crie um site institucional premium para imobiliária de alto padrão com galeria de imóveis, busca avançada e contato...',
      tags: ['Imobiliário', 'Premium', 'Website'],
      featured: true
    }
  ]

  for (const project of sampleProjects) {
    await prisma.project.upsert({
      where: { title: project.title },
      update: {},
      create: project,
    })
  }
  
  console.log(`✅ ${sampleProjects.length} projects seeded`)

  console.log('🎉 Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
