import React, { useState, useEffect } from 'react'
import { analytics } from '@features/Analytics'
import { AnimatedContainer, Title, P, NavFilter, ProjectGrid, Modal } from '@shared'
import {
  Project,
  FilterOption,
  ProjectsSectionProps,
  ProjectsFilterProps,
  ProjectsGridProps
} from '@types'
import defaultRaw from '@assets/images/projects/default.png'
import shortRaw from '@assets/images/projects/short.jpeg'
import signatureRaw from '@assets/images/projects/signature.jpeg'
import darkLinksRaw from '@assets/images/projects/dark-links.jpeg'
import darkPortfolioRaw from '@assets/images/projects/dark-portfolio.jpeg'
import containnerPortfolioRaw from '@assets/images/projects/containner-portfolio.jpeg'
import CatalogoRaw from '@assets/images/projects/catalogo.jpeg'
import ManualRaw from '@assets/images/projects/manual.jpeg'
import AmpareRaw from '@assets/images/projects/ampare.jpeg'
import HelldiversRaw from '@assets/images/projects/helldivers.jpeg'
import XRCardRaw from '@assets/images/projects/xrcard.jpeg'

// ================================
// Constants
// ================================

/**
 * Optimized project images with WebP conversion
 */
const PROJECT_IMAGES = {
  default: `${defaultRaw}?as=webp&width=300`,
  short: `${shortRaw}?as=webp&width=300`,
  signature: `${signatureRaw}?as=webp&width=300`,
  darkLinks: `${darkLinksRaw}?as=webp&width=300`,
  darkPortfolio: `${darkPortfolioRaw}?as=webp&width=300`,
  containnerPortfolio: `${containnerPortfolioRaw}?as=webp&width=300`,
  Catalogo: `${CatalogoRaw}?as=webp&width=300`,
  Manual: `${ManualRaw}?as=webp&width=300`,
  Ampare: `${AmpareRaw}?as=webp&width=300`,
  Helldivers: `${HelldiversRaw}?as=webp&width=300`,
  XRCard: `${XRCardRaw}?as=webp&width=300`
} as const

/**
 * Available filter options for project categorization
 */
const FILTER_OPTIONS: FilterOption[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'progress', label: 'Em Progresso' }
]

/**
 * Complete projects database with full information
 * Structured for easy filtering and display
 * Projects are ordered by value/impression (most impressive first)
 */
const PROJECTS_DATA: Project[] = [
  {
    id: '0',
    title: 'XR Card',
    subtitle: 'Landing Page',
    description:
      'Redesign completo do frontend da plataforma XR Card',
    image: PROJECT_IMAGES.XRCard,
    tags: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'Design System',
      'Responsive Design'
    ],
    categories: ['frontend'],
    githubUrl: '',
    demoUrl: 'https://www.xrcard.com.br',
    private: true,
    details: {
      purpose:
        'Redesign completo do frontend da plataforma XR Card',
      why:
        'Fui contratado para reformular todo o design frontend do site existente. O objetivo era modernizar a interface, tornando-a mais intuitiva, responsiva e alinhada com as melhores práticas de UX/UI, melhorando a experiência do usuário e facilitando o processo de assinatura dos planos.',
      challenges:
        'Desafios incluíram manter a consistência visual em todas as seções do site, garantir performance otimizada em dispositivos móveis, criar um design system escalável que pudesse ser facilmente mantido, e garantir que o novo design transmitisse confiança e profissionalismo para os usuários.',
      results:
        'Interface moderna e responsiva que melhora significativamente a experiência do usuário, com foco em conversão e usabilidade. O redesign mantém todas as funcionalidades originais enquanto oferece uma experiência visual mais atrativa e profissional.'
    }
  },
  {
    id: '1',
    title: 'Helldivers 2',
    subtitle: 'Community Tool',
    description:
      'Sistema completo para gerenciamento de armaduras, sets e passivas do Helldivers 2. Frontend Next.js com API REST Django e autenticação OAuth.',
    image: PROJECT_IMAGES.Helldivers,
    tags: [
      'Next.js',
      'Django',
      'Python',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'JWT',
      'OAuth'
    ],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/Helldivers',
    demoUrl: 'https://gooddivers.dionatha.com.br',
    details: {
      purpose:
        'Criar uma aplicação web completa para jogadores de Helldivers 2 gerenciarem suas armaduras, sets e passivas do jogo. O sistema oferece armory completo, busca e filtros avançados, sistema de relacionamentos (favoritos, coleção pessoal e wishlist), gestão de usuários com autenticação Google OAuth, e suporte multilíngue.',
      why:
        'Foi criado para resolver uma dificuldade pessoal que sempre tive no jogo: encontrar os capacetes e capas pertencentes a cada armadura. No jogo não existe um vínculo visual entre os itens do set - ao equipar uma armadura, não aparece sugestão para equipar o resto do set, sendo necessário procurar manualmente qual capacete e capa pertencem àquela armadura. O objetivo do site foi facilitar isso mostrando os sets completos de forma organizada e visual.',
      challenges:
        'A maior dificuldade foi construir um backend usando plataformas gratuitas, que por serem gratuitas são lentas e deixavam o site lento devido à resposta lenta das APIs. Para resolver isso, implementei uso de localStorage e outras estratégias de cache para facilitar o carregamento das informações e melhorar a performance. Outros desafios incluíram integração entre frontend Next.js 16 e backend Django 5.2.7, implementação de autenticação JWT com cookies HttpOnly para segurança, sistema de cache inteligente para performance, suporte multilíngue (PT-BR e EN), documentação automática da API com OpenAPI/Swagger, e deploy em plataformas diferentes (Netlify para frontend e Fly.io para backend).',
      results:
        'Sistema funcional e completo que permite aos jogadores gerenciar e comparar equipamentos de forma eficiente, com interface responsiva, autenticação segura, cache otimizado (redução de até 95% das requisições HTTP), e documentação automática da API. O projeto está em produção com deploy automatizado via GitHub Actions.'
    }
  },
  {
    id: '2',
    title: 'Ampare',
    subtitle: 'Legal Page',
    description:
      'Sistema para criação de contratos através de formulário online. Clientes preenchem dados e informações, gerando automaticamente um PDF de contrato com assinatura digital para verificação e aprovação.',
    image: PROJECT_IMAGES.Ampare,
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PDF-lib'],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/GoodFreelas/PDF-From',
    demoUrl: 'https://ampare.org.br/termos',
    private: true,
    details: {
      purpose:
        'Criar uma forma fácil e automatizada para a Ampare gerar contratos com seus clientes. O sistema permite que os clientes preencham um formulário online com seus dados e informações, gerando automaticamente um documento PDF de contrato com a assinatura digital dos clientes para verificação e aprovação.',
      why:
        'Foi desenvolvido porque a Ampare precisava de uma solução para criar contratos de forma facilitada com seus clientes. O processo manual era demorado e propenso a erros, então foi criado este sistema que automatiza todo o fluxo desde o preenchimento dos dados até a geração do contrato em PDF.',
      challenges:
        'Implementação de formulário multi-step complexo para coletar todos os dados necessários, geração dinâmica de PDFs com os dados preenchidos no formulário, integração de assinatura digital válida, sistema de envio automático de emails com o contrato gerado, e criação de um fluxo de verificação e aprovação dos contratos.',
      results:
        'Sistema funcional que permite à Ampare criar contratos de forma rápida e eficiente, reduzindo significativamente o tempo de processamento e eliminando erros manuais. Os clientes podem preencher o formulário online e receber automaticamente o contrato em PDF pronto para assinatura e aprovação.'
    }
  },
  {
    id: '3',
    title: 'Detcheler',
    subtitle: 'Digital Catalog',
    description:
      'Catálogo moderno de produtos com sincronização automática do Tiny ERP, carrinho de compras, busca inteligente e integração WhatsApp para envio de pedidos.',
    image: PROJECT_IMAGES.Catalogo,
    tags: [
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Express',
      'Zustand',
      'React Query',
      'Tailwind CSS'
    ],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/GoodFreelas/Catalog',
    demoUrl: 'https://detcheler.com.br',
    details: {
      purpose:
        'Criar um catálogo completo de produtos com sincronização automática do Tiny ERP, permitindo que clientes visualizem produtos, adicionem ao carrinho e enviem pedidos diretamente via WhatsApp Business.',
      why:
        'Desenvolvido para integrar o catálogo de produtos com o sistema de gestão Tiny ERP, automatizando a sincronização de produtos e facilitando o processo de compra através de uma interface moderna e responsiva com integração direta ao WhatsApp.',
      challenges:
        'Integração com API do Tiny ERP com rate limiting para evitar spam, sincronização automática em tempo real de produtos, implementação de carrinho de compras com persistência usando Zustand, sistema de busca inteligente com debounce e histórico, cache inteligente com React Query para performance, e integração com WhatsApp Business API para envio automático de pedidos formatados.',
      results:
        'Catálogo funcional e completo que sincroniza automaticamente com o Tiny ERP, oferecendo experiência de compra fluida com carrinho persistente, busca avançada, paginação otimizada e envio direto de pedidos via WhatsApp. Sistema com performance otimizada através de lazy loading, code splitting e cache inteligente.'
    }
  },
  {
    id: '4',
    title: 'Assinatura',
    subtitle: 'Web Tool',
    description:
      'Plataforma para gestão e assinatura digital de documentos contratuais com editor de templates, canvas de assinatura, geração de PDF e envio automático por email.',
    image: PROJECT_IMAGES.signature,
    tags: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'jsPDF',
      'Nodemailer'
    ],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/signature-React',
    demoUrl: 'https://termos.dionatha.com.br',
    details: {
      purpose:
        'Criar uma plataforma para gestão e assinatura digital de documentos contratuais, permitindo criação de contratos personalizados com templates, campos dinâmicos, assinatura digital via canvas, geração automática de PDF e envio por email para cliente e administrador.',
      why:
        'Foi desenvolvido para modernizar e agilizar o processo de assinatura de contratos, eliminando a necessidade de impressão e assinatura física. O sistema permite criar contratos personalizados, gerar links únicos para cada cliente, capturar assinaturas digitais e processar tudo automaticamente.',
      challenges:
        'Implementação de editor de contratos com templates personalizáveis e campos dinâmicos, criação de canvas de assinatura digital com validação e armazenamento seguro, geração de PDFs no frontend com jsPDF integrando a assinatura, implementação de sistema de envio automático de emails com templates Handlebars usando Nodemailer, criação de dashboard administrativo para gestão de contratos, e implementação de links únicos e QR codes para acesso mobile.',
      results:
        'Plataforma funcional que permite criar, gerenciar e assinar contratos digitalmente de forma rápida e segura. O sistema oferece interface responsiva, armazenamento local com localStorage, geração automática de PDFs, envio de emails automatizado e painel administrativo completo para acompanhamento de todos os contratos.'
    }
  },
  {
    id: '5',
    title: 'Encurtador',
    subtitle: 'Web Tool',
    description:
      'Plataforma moderna de encurtamento de URLs com interface intuitiva, analytics em tempo real e dashboard completo para gerenciamento de links.',
    image: PROJECT_IMAGES.short,
    tags: [
      'Angular',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Bootstrap 5',
      'Mongoose',
      'ShortID'
    ],
    categories: ['frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/link-shortener--Angular',
    demoUrl: 'https://linkspace.dionatha.com.br',
    details: {
      purpose:
        'Criar uma plataforma completa de encurtamento de URLs (LinkSpace) com interface moderna, analytics em tempo real, dashboard para gerenciamento de links, validação automática de URLs e funcionalidade de cópia rápida. O sistema permite transformar links longos em URLs curtas e memoráveis, acompanhar estatísticas de cliques e gerenciar todos os links encurtados.',
      why:
        'Desenvolvido para praticar e demonstrar habilidades com Angular 19 e criação de APIs RESTful com Node.js e Express. O projeto resolve um problema comum de compartilhamento de links, oferecendo uma solução moderna com analytics em tempo real e interface intuitiva.',
      challenges:
        'Implementação de algoritmo de encurtamento usando ShortID para geração de IDs únicos, criação de API RESTful com Express e MongoDB usando Mongoose, desenvolvimento de dashboard com analytics em tempo real para acompanhar cliques e estatísticas, implementação de validação automática de URLs válidas, criação de interface moderna e responsiva com Angular 19 e Bootstrap 5, e implementação de funcionalidade de cópia rápida usando Angular CDK Clipboard.',
      results:
        'Plataforma funcional e completa (LinkSpace) que permite encurtar links de forma eficiente, com dashboard moderno para gerenciamento de todos os links, analytics em tempo real para acompanhar estatísticas de cliques, interface totalmente responsiva otimizada para todos os dispositivos, validação automática de URLs e funcionalidade de cópia rápida. Sistema com arquitetura modular, TypeScript completo e deploy automatizado com CI/CD.'
    }
  },
  {
    id: '6',
    title: 'Darkning',
    subtitle: 'Portfolio',
    description:
      'Portfolio profissional moderno com design minimalista, galeria masonry, tema claro/escuro, internacionalização e performance otimizada.',
    image: PROJECT_IMAGES.darkPortfolio,
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'EmailJS',
      'Google Analytics',
      'Cloudinary'
    ],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Dark-Portifolio',
    demoUrl: 'https://dark.art.br',
    details: {
      purpose:
        'Criar um portfolio profissional moderno com design minimalista e performance otimizada, incluindo galeria de imagens com masonry grid, alternância de tema claro/escuro com persistência, formulário de contato integrado com EmailJS, suporte multilíngue (PT-BR e EN), e analytics integrado com Google Analytics.',
      why:
        'Desenvolvido para criar um portfolio profissional que combine design minimalista com funcionalidades modernas. O objetivo era ter uma interface limpa focada no conteúdo, com galeria de imagens performática usando masonry grid, sistema de temas com persistência, internacionalização completa, e integração com serviços externos para formulário de contato e analytics.',
      challenges:
        'Implementação de masonry grid para galeria de imagens com lazy loading e otimização de performance, criação de sistema de temas claro/escuro com persistência no localStorage, integração com EmailJS para envio de emails do formulário de contato, implementação de internacionalização (i18n) com suporte a múltiplos idiomas, otimização de imagens usando Cloudinary para transformações dinâmicas, code splitting e lazy loading para melhor performance, integração com Google Analytics 4 para tracking de eventos, e deploy automatizado com CI/CD usando GitHub Actions e Vercel.',
      results:
        'Portfolio profissional completo e moderno com design minimalista que destaca o conteúdo de forma elegante. Sistema com excelente performance (Lighthouse Score 95+), galeria de imagens otimizada com masonry grid e zoom modal, alternância suave de temas com persistência, formulário de contato funcional integrado com EmailJS, suporte multilíngue completo, analytics integrado para métricas de engajamento, e deploy automatizado com CI/CD. Interface totalmente responsiva e otimizada para todos os dispositivos.'
    }
  },
  {
    id: '7',
    title: 'Containner',
    subtitle: 'Portfolio',
    description:
      'Portfolio profissional com projetos de branding Vextro® e Korri®, gerador de padrões interativo e comparação visual antes/depois.',
    image: PROJECT_IMAGES.containnerPortfolio,
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Google Analytics',
      'React Compare Slider'
    ],
    categories: ['frontend'],
    githubUrl: 'https://github.com/containner-archived/Containner',
    demoUrl: 'https://containner.netlify.app',
    details: {
      purpose:
        'Criar um portfolio profissional especializado em branding e identidade visual, exibindo projetos completos de branding (Vextro® e Korri®), incluindo gerador de padrões geométricos interativo, sistema de comparação visual antes/depois usando slider, suporte multilíngue (PT-BR e EN), e analytics integrado com Google Analytics.',
      why:
        'Desenvolvido para apresentar projetos de branding de forma profissional e interativa. O portfolio inclui dois projetos principais: Vextro® (marketing contra o mercado) com identidade visual baseada em ruptura e inquietação, e Korri® (roupas esportivas) com branding voltado para jovens da periferia. Além disso, inclui um gerador de padrões geométricos interativo para criação de elementos visuais.',
      challenges:
        'Implementação de slider de comparação visual antes/depois usando React Compare Slider, criação de gerador de padrões geométricos interativo com edição em tempo real e exportação SVG, desenvolvimento de páginas específicas para cada projeto de branding com aplicações visuais, implementação de internacionalização (i18n) com suporte a múltiplos idiomas, otimização de performance com lazy loading de imagens e code splitting, integração com Google Analytics para tracking de eventos, e deploy automatizado com CI/CD usando GitHub Actions, Netlify e Vercel.',
      results:
        'Portfolio profissional completo especializado em branding com excelente performance (Lighthouse Score 95+). Sistema com galeria completa dos projetos Vextro® e Korri®, gerador de padrões interativo com criação, edição e exportação, slider de comparação visual para antes/depois, suporte multilíngue completo, analytics integrado para métricas de engajamento, e deploy automatizado com CI/CD. Interface totalmente responsiva e otimizada para todos os dispositivos, destacando os projetos de branding de forma elegante e profissional.'
    }
  },
  {
    id: '8',
    title: 'Dark Links',
    subtitle: 'Social Hub Page',
    description:
      'Linktree profissional para artista digital com tema escuro, analytics integrado, suporte multilíngue e design minimalista.',
    image: PROJECT_IMAGES.darkLinks,
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Google Analytics',
      'EmailJS'
    ],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Dark-Links',
    demoUrl: 'https://links.dark.art.br',
    details: {
      purpose:
        'Criar um linktree profissional para artista digital com design minimalista e tema escuro nativo, incluindo perfil personalizável (foto, nome e bio), links organizados para portfólio, lojas e redes sociais, sistema de temas adaptativo, analytics integrado com Google Analytics 4 para rastreamento de cliques, e suporte multilíngue (PT-BR e EN) com detecção automática de idioma.',
      why:
        'Desenvolvido para oferecer uma alternativa profissional ao Linktree padrão, focada em artistas digitais que precisam de uma página de links elegante e minimalista. O objetivo era criar uma interface limpa com tema escuro nativo, organização clara de links (YouTube, Instagram, Email, portfólio, lojas e doações), e funcionalidades avançadas como analytics e internacionalização.',
      challenges:
        'Implementação de sistema de temas escuro nativo com transições suaves, criação de interface minimalista focada no conteúdo, organização clara de links sociais e botões de ação, integração com Google Analytics 4 para rastreamento de todos os cliques, implementação de internacionalização (i18n) com suporte a múltiplos idiomas e detecção automática, otimização de performance com Vite e otimizações avançadas, acessibilidade seguindo padrões WCAG, e deploy automatizado com CI/CD usando GitHub Actions e Vercel.',
      results:
        'Linktree profissional completo com excelente performance (Performance Score > 90, Accessibility Score > 95). Sistema com design minimalista e tema escuro nativo, perfil personalizável, links organizados para portfólio e redes sociais, analytics integrado para rastreamento de cliques e métricas de engajamento, suporte multilíngue completo com detecção automática, acessibilidade seguindo padrões WCAG, e deploy automatizado com CI/CD. Interface totalmente responsiva e otimizada para todos os dispositivos, oferecendo uma experiência profissional para artistas digitais.'
    }
  },
  {
    id: '9',
    title: 'Manual de Marca',
    subtitle: 'Documentation Site',
    description:
      'Manual de identidade visual interativo da agência Vextro© com navegação fluida, animações avançadas e tipografia customizada.',
    image: PROJECT_IMAGES.Manual,
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Intersection Observer'
    ],
    categories: ['frontend'],
    githubUrl: 'https://github.com/DionathaGoulart/Manual',
    demoUrl: 'https://manual-vextro.vercel.app',
    details: {
      purpose:
        'Criar um manual de identidade visual interativo da agência Vextro© com navegação fluida e intuitiva, incluindo sistema de animações avançadas customizadas, sidebar com scroll automático e detecção de seções, tipografia customizada com features avançadas (ligatures, stylistic sets), e organização completa do manual em 9 seções principais (Introdução, Estratégia, Verbal, Logotipo, Cores, Tipografia, Apoio Gráfico, Fotografia e Inspirações).',
      why:
        'Desenvolvido para transformar o manual de identidade visual tradicional em uma experiência interativa e moderna. O objetivo era criar uma interface que facilitasse o entendimento e aplicação das diretrizes da marca Vextro©, com navegação intuitiva, animações suaves e organização clara de todas as informações sobre a identidade visual da agência.',
      challenges:
        'Implementação de sistema de animações avançadas customizadas com TailwindCSS e Intersection Observer para detecção de scroll, criação de sidebar com navegação inteligente e scroll automático com detecção de seções ativas, organização complexa de 9 seções principais com múltiplas subseções, implementação de tipografia customizada com features avançadas (ligatures, stylistic sets), criação de sistema de componentes UI reutilizáveis padronizados, otimização de performance com lazy loading e memoização, e arquitetura modular escalável com separação de responsabilidades.',
      results:
        'Manual de identidade visual interativo completo e profissional com navegação fluida e intuitiva. Sistema com animações avançadas customizadas, sidebar inteligente com scroll automático e detecção de seções, tipografia customizada com features avançadas, organização completa em 9 seções principais cobrindo todos os aspectos da identidade visual da Vextro© (Introdução, Estratégia, Verbal, Logotipo, Cores, Tipografia, Apoio Gráfico, Fotografia e Inspirações), sistema de componentes UI reutilizáveis, e performance otimizada. Interface totalmente responsiva e otimizada para todos os dispositivos, oferecendo uma experiência moderna e profissional para consulta das diretrizes de identidade visual.'
    }
  },
  {
    id: '10',
    title: 'Adoção de Pets',
    subtitle: 'Web Site',
    description:
      'Plataforma para adoção responsável de animais com sistema de matching inteligente.',
    image: PROJECT_IMAGES.default,
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    categories: ['progress', 'frontend', 'backend', 'fullstack'],
    githubUrl: 'https://github.com/DionathaGoulart/Pets',
    demoUrl: '',
    details: {
      purpose:
        'Criar uma plataforma que facilite a adoção responsável de animais, conectando pessoas que querem adotar com animais que precisam de um lar.',
      why:
        'Desenvolvido para ajudar animais abandonados a encontrarem lares amorosos, facilitando o processo de adoção e promovendo a responsabilidade na adoção.',
      challenges:
        'Implementar sistema de matching inteligente, criar fluxo de adoção seguro, e garantir que os animais sejam colocados em lares adequados.',
      results:
        'Plataforma em desenvolvimento que visa facilitar adoções responsáveis e ajudar animais a encontrarem lares.'
    }
  },
  {
    id: '11',
    title: 'Chat',
    subtitle: 'Web Site',
    description:
      'Aplicação de chat em tempo real com mensagens encriptadas. Next.js com Supabase para segurança e performance.',
    image: PROJECT_IMAGES.default,
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    categories: ['progress', 'frontend', 'backend', 'fullstack'],
    githubUrl: '',
    demoUrl: '',
    details: {
      purpose:
        'Criar uma aplicação de chat em tempo real com foco em segurança e privacidade, utilizando criptografia para proteger as mensagens.',
      why:
        'Desenvolvido para praticar e demonstrar habilidades com aplicações em tempo real, segurança de dados, e integração com Supabase.',
      challenges:
        'Implementar chat em tempo real, garantir segurança e privacidade das mensagens, e criar interface intuitiva para comunicação.',
      results:
        'Aplicação em desenvolvimento que visa oferecer comunicação segura e em tempo real entre usuários.'
    }
  }
]

/**
 * Animation and timing configuration
 */
const ANIMATION_CONFIG = {
  initialLoadTimeout: 2000
} as const

// ================================
// Helper Functions
// ================================

/**
 * Finds a project by ID
 */
const findProjectById = (projectId: string): Project | undefined => {
  return PROJECTS_DATA.find((project) => project.id === projectId)
}

/**
 * Determines CSS class for grid animation based on state
 */
const getGridAnimationClass = (isInitialLoad: boolean): string => {
  return isInitialLoad
    ? 'project-grid--initial-load'
    : 'project-grid--filter-change'
}

/**
 * Handles external link navigation with safety checks
 */
const navigateToUrl = (url: string | undefined): void => {
  if (url && url !== '#') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

// ================================
// Custom Hooks
// ================================

/**
 * Filters projects based on active category
 * Supports projects with multiple categories
 */
const useFilteredProjects = (activeFilter: string): Project[] => {
  return activeFilter === 'todos'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((project) =>
        project.categories.includes(
          activeFilter as Project['categories'][number]
        )
      )
}

/**
 * Manages project interaction handlers with analytics
 */
const useProjectHandlers = () => {
  const handleGithubClick = (projectId: string): void => {
    analytics.trackButtonClick(`github_project_${projectId}`)
    const project = findProjectById(projectId)
    navigateToUrl(project?.githubUrl)
  }

  const handleDemoClick = (projectId: string): void => {
    analytics.trackButtonClick(`demo_project_${projectId}`)
    const project = findProjectById(projectId)

    if (project) {
      const isInProgress = project.categories.includes('progress')
      if (!isInProgress) {
        navigateToUrl(project.demoUrl)
      }
    }
  }

  return {
    handleGithubClick,
    handleDemoClick
  }
}

// ================================
// Helper Components
// ================================

/**
 * Projects section header
 */
const ProjectsHeader: React.FC = () => (
  <header className="space-y-6">
    <AnimatedContainer animationType="fade-right">
      <Title id="projetos-título" level="h2" border="bottom-start">
        Meus{' '}
        <Title level="h2" element="span" color="primary">
          Projetos
        </Title>
      </Title>
    </AnimatedContainer>

    <AnimatedContainer animationType="zoom-in-left">
      <P size="grande" className="leading-relaxed md:max-w-md lg:max-w-2xl">
        Projetos desenvolvidos durante minha jornada de aprendizado e trabalhos
        freelance, mostrando domínio prático em diferentes tecnologias e
        cenários.
      </P>
    </AnimatedContainer>
  </header>
)

/**
 * Project filter navigation
 */
const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
  activeFilter,
  onFilterChange
}) => (
  <nav aria-label="Filtros de projetos por categoria" role="navigation">
    <AnimatedContainer>
      <NavFilter
        className="mt-12"
        options={FILTER_OPTIONS}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        aria-label="Selecionar categoria de projetos"
      />
    </AnimatedContainer>
  </nav>
)

/**
 * Projects grid display
 */
const ProjectsGrid: React.FC<ProjectsGridProps & { onCardClick?: (projectId: string) => void }> = ({
  projects,
  animationKey,
  isInitialLoad,
  onGithubClick,
  onDemoClick,
  onCardClick,
  activeFilter
}) => {
  const gridClassName = getGridAnimationClass(isInitialLoad)
  const filterLabel =
    FILTER_OPTIONS.find((opt) => opt.value === activeFilter)?.label || 'Todos'

  return (
    <main
      aria-live="polite"
      aria-label={`${projects.length} projetos encontrados na categoria ${filterLabel}`}
    >
      <AnimatedContainer>
        <div key={animationKey} className={gridClassName}>
          <ProjectGrid
            projects={projects}
            onGithubClick={onGithubClick}
            onDemoClick={onDemoClick}
            onCardClick={onCardClick}
            emptyMessage="Nenhum projeto encontrado para esta categoria."
          />
        </div>
      </AnimatedContainer>
    </main>
  )
}

// ================================
// Main Component
// ================================

/**
 * Projects section with filter system and responsive grid
 * Includes analytics tracking and state-based animations
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  id = 'meus-projetos'
}) => {
  // State management
  const [activeFilter, setActiveFilter] = useState<string>('todos')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [animationKey, setAnimationKey] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Data and handlers
  const filteredProjects = useFilteredProjects(activeFilter)
  const { handleGithubClick, handleDemoClick } = useProjectHandlers()

  // Effects
  useEffect(() => {
    if (!isInitialLoad) return

    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, ANIMATION_CONFIG.initialLoadTimeout)

    return () => clearTimeout(timer)
  }, [isInitialLoad])

  // Handlers
  const handleFilterChange = (filter: string): void => {
    setActiveFilter(filter)
    setAnimationKey((prev) => prev + 1)
    analytics.trackButtonClick(`filter_projects_${filter}`)
  }

  const handleCardClick = (projectId: string): void => {
    const project = findProjectById(projectId)
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
      analytics.trackButtonClick(`view_project_details_${projectId}`)
    }
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <section id={id} aria-labelledby="lista-projetos" role="region">
      <ProjectsHeader />

      <ProjectsFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <ProjectsGrid
        projects={filteredProjects}
        animationKey={animationKey}
        isInitialLoad={isInitialLoad}
        onGithubClick={handleGithubClick}
        onDemoClick={handleDemoClick}
        onCardClick={handleCardClick}
        activeFilter={activeFilter}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </section>
  )
}

// ================================
// Exports
// ================================

export default ProjectsSection
