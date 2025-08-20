
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt é obrigatório' }, { status: 400 })
    }

    // Se não tiver a API key, usar prompt básico
    if (!process.env.ABACUSAI_API_KEY) {
      return NextResponse.json({ 
        generatedPrompt: `${prompt}

---
💡 INSTRUÇÕES TÉCNICAS ADICIONAIS:

1. Use React com TypeScript para maximum type safety
2. Implement responsive design with Tailwind CSS
3. Use Next.js App Router for optimal performance
4. Add proper loading states and error handling
5. Implement accessibility best practices (ARIA labels, keyboard navigation)
6. Use modern CSS Grid and Flexbox for layouts
7. Add hover effects and smooth transitions
8. Optimize images with Next.js Image component
9. Implement proper SEO with metadata
10. Add form validation and user feedback

TECNOLOGIAS RECOMENDADAS:
- Framework: Next.js 14+ com App Router
- Styling: Tailwind CSS
- Components: Shadcn/ui (opcional)
- State: Zustand ou useState
- Forms: React Hook Form + Zod
- Icons: Lucide React
- Animations: Framer Motion (se necessário)

Este prompt foi gerado pelo PRD-Prompt.com.br ✨`
      })
    }

    // Usar a API do AbacusAI para gerar um prompt melhorado
    const response = await fetch('https://api.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em desenvolvimento web e criação de prompts técnicos. Sua tarefa é melhorar e expandir prompts para desenvolvimento de aplicações web modernas, adicionando detalhes técnicos específicos, melhores práticas e instruções claras.'
          },
          {
            role: 'user',
            content: `Por favor, melhore e expanda este prompt para desenvolvimento web, adicionando mais detalhes técnicos, melhores práticas e instruções específicas para criar um projeto moderno e profissional:

"${prompt}"

Adicione seções sobre:
- Tecnologias específicas recomendadas
- Estrutura de pastas
- Boas práticas de código
- Acessibilidade
- SEO
- Performance
- Responsividade
- Testes (se aplicável)

Formate a resposta de forma clara e organizada.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Falha na API do AbacusAI')
    }

    const data = await response.json()
    const generatedPrompt = data.choices?.[0]?.message?.content || prompt

    return NextResponse.json({ generatedPrompt })
    
  } catch (error) {
    console.error('Erro ao gerar prompt:', error)
    
    // Fallback: retornar o prompt básico com melhorias
    const { prompt } = await request.json()
    
    return NextResponse.json({ 
      generatedPrompt: `${prompt}

---
💡 INSTRUÇÕES TÉCNICAS DETALHADAS:

## 🏗️ ARQUITETURA E ESTRUTURA
- Use Next.js 14+ com App Router para performance otimizada
- Implemente TypeScript para type safety
- Organize código com padrão de componentes reutilizáveis
- Use Tailwind CSS para styling consistente

## 🎨 DESIGN E UX
- Design responsivo para mobile, tablet e desktop
- Paleta de cores harmônica e acessível
- Tipografia clara e hierárquica
- Micro-interações e feedback visual
- Loading states para melhor UX

## ⚡ PERFORMANCE E SEO
- Otimização de imagens com Next.js Image
- Lazy loading para conteúdo pesado
- Metadata apropriado para SEO
- Core Web Vitals otimizados
- Lighthouse score > 90

## 🔧 FUNCIONALIDADES
- Validação de formulários com feedback em tempo real
- Estados de erro elegantes
- Navegação intuitiva
- Funcionalidades offline (se aplicável)

## 📱 RESPONSIVIDADE
- Mobile-first approach
- Breakpoints consistentes
- Touch-friendly para dispositivos móveis
- Teste em múltiplos dispositivos

## ♿ ACESSIBILIDADE
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Screen reader compatibility
- Foco visual claro
- Textos alternativos

TECNOLOGIAS RECOMENDADAS:
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- React Hook Form + Zod
- Lucide React icons
- Framer Motion (animações)

Este prompt otimizado foi gerado pelo PRD-Prompt.com.br ✨
Desenvolva com excelência! 🚀`
    })
  }
}
