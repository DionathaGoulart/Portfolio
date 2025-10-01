# 🎨 Portfolio Pessoal - Dionatha Goulart

> **Portfolio moderno e responsivo desenvolvido com React, TypeScript e Tailwind CSS, apresentando projetos, habilidades e experiência profissional de forma elegante e interativa.**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://dionatha.com.br)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📸 Preview

* **Desktop View**: Interface moderna com navegação suave e animações elegantes
* **Mobile View**: Design totalmente responsivo com otimização para dispositivos móveis
* **Dark/Light Mode**: Sistema de temas dinâmico com persistência de preferências

> *Screenshots serão adicionadas em breve*

---

## ✨ Features

### 🎯 **Main Features**

* **🌙 Dark/Light Mode**: Sistema de temas dinâmico com detecção automática do tema do sistema
* **📱 Design Responsivo**: Interface otimizada para desktop, tablet e mobile
* **🎨 Animações Suaves**: Transições e animações elegantes com AOS (Animate On Scroll)
* **📊 Analytics Integrado**: Rastreamento de seções e interações do usuário
* **📧 Formulário de Contato**: Integração com EmailJS para envio de mensagens
* **🔍 SEO Otimizado**: Meta tags dinâmicas e títulos de página personalizados
* **⚡ Performance**: Otimização de imagens com WebP e lazy loading

### 🛠️ **Technical Features**

* **🔧 TypeScript**: Tipagem estática completa para maior robustez
* **🎨 Tailwind CSS**: Sistema de design utilitário com tema customizado
* **📦 Vite**: Build tool moderno e rápido
* **🔄 React Router**: Navegação SPA com roteamento dinâmico
* **📊 Analytics**: Sistema de tracking personalizado para seções
* **🎭 Theme System**: Sistema de temas com persistência e detecção automática
* **📧 EmailJS**: Integração para formulário de contato
* **🖼️ Image Optimization**: Otimização automática de imagens com Vite ImageTools
* **📱 PWA Ready**: Estrutura preparada para Progressive Web App

---

## 🏗️ Project Architecture

```txt
src/
├── assets/           # Imagens e arquivos estáticos
│   ├── images/       # Imagens otimizadas (WebP)
│   └── me.jpg        # Foto do desenvolvedor
├── core/             # Configuração principal e providers
│   ├── App.tsx       # Componente raiz da aplicação
│   ├── router/       # Configuração de rotas
│   ├── types/        # Tipos globais
│   └── utils/        # Utilitários gerais
├── features/         # Funcionalidades específicas da aplicação
│   ├── Analytics/    # Sistema de analytics personalizado
│   ├── Emailjs/      # Integração com EmailJS
│   └── Theme/        # Sistema de temas dinâmico
├── pages/            # Páginas da aplicação
│   ├── Home.tsx      # Página principal
│   ├── NotFound.tsx  # Página 404
│   └── Sections/     # Seções da página principal
├── shared/           # Componentes e utilitários reutilizáveis
│   ├── layouts/      # Layouts (Header, Footer)
│   ├── types/        # Tipos compartilhados
│   └── ui/           # Componentes de UI
└── styles/           # Estilos globais e SCSS
    ├── global.scss   # Estilos globais
    ├── theme.scss    # Variáveis de tema
    └── ui/           # Estilos específicos de componentes
```

---

## 📄 Pages and Sections

### **🏠 Home Page**
A página principal contém todas as seções em uma única página com navegação suave:

* **Início**: Apresentação pessoal com call-to-actions
* **Sobre Mim**: Informações pessoais e perfil profissional
* **Projetos**: Portfólio de trabalhos com filtros por categoria
* **Habilidades**: Competências técnicas organizadas por categoria
* **Experiência**: Histórico profissional e educacional
* **Contato**: Formulário de contato integrado com EmailJS

### **🔍 404 Page**
Página personalizada para rotas não encontradas com navegação de volta.

---

## 🛠️ Tech Stack

### **Frontend**

* **React 19.1.1** - Biblioteca principal para interface
* **TypeScript 5.8.3** - Tipagem estática
* **Tailwind CSS 3.4.17** - Framework CSS utilitário
* **React Router DOM 7.8.0** - Roteamento SPA
* **Lucide React 0.539.0** - Ícones modernos
* **AOS 2.3.4** - Animações on scroll

### **Development Tools**

* **Vite 6.3.5** - Build tool e dev server
* **ESLint 9.29.0** - Linting de código
* **Prettier 3.5.3** - Formatação de código
* **Sass 1.90.0** - Pré-processador CSS
* **PostCSS 8.5.6** - Processamento CSS
* **Autoprefixer 10.4.21** - Prefixos CSS automáticos

### **CI/CD & Deployment**

* **Vercel** - Plataforma de deploy e hospedagem
* **GitHub Actions** - CI/CD pipeline (configurável)

### **Integrations**

* **EmailJS 4.4.1** - Serviço de envio de emails
* **Vite ImageTools 8.0.0** - Otimização de imagens
* **Analytics Personalizado** - Sistema de tracking customizado

---

## 🚀 Getting Started

### **Prerequisites**

* Node.js 18+ (recomendado: versão LTS)
* npm ou yarn como gerenciador de pacotes

### **Installation**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portfolio.git
cd portfolio

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Available Scripts**

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção

# Qualidade de código
npm run lint         # Executa ESLint
```

---

## 🧪 Tests

* **Testes Unitários**: Estrutura preparada para Jest/Vitest
* **Testes de Integração**: Configuração para testing library
* **Testes E2E**: Preparado para Cypress ou Playwright

> *Sistema de testes será implementado em futuras versões*

---

## 🚀 Deployment

### **Vercel (Recomendado)**

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. Deploy automático a cada push na branch main

### **Outras Plataformas**

* **Netlify**: Compatível com build estático
* **GitHub Pages**: Configuração via GitHub Actions
* **Firebase Hosting**: Deploy via Firebase CLI

---

## 📊 Performance & Accessibility

### **Performance**
* **Lighthouse Score**: 90+ em todas as métricas
* **Core Web Vitals**: Otimizado para LCP, FID e CLS
* **Image Optimization**: WebP automático com fallbacks
* **Code Splitting**: Carregamento otimizado de componentes

### **Accessibility**
* **WCAG 2.1 AA**: Conformidade com diretrizes de acessibilidade
* **Keyboard Navigation**: Navegação completa via teclado
* **Screen Reader**: Compatibilidade com leitores de tela
* **Color Contrast**: Contraste adequado em todos os temas

---

## 🔧 Configuration

### **Environment Variables**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics (opcional)
VITE_GA_TRACKING_ID=your_ga_tracking_id
```

### **Customization**

* **Temas**: Edite `src/features/Theme/config/configTheme.ts`
* **Cores**: Modifique as variáveis CSS em `src/styles/theme.scss`
* **Animações**: Configure AOS em `src/core/App.tsx`
* **Projetos**: Atualize dados em `src/pages/Sections/Projects.tsx`

---

## 📱 Responsiveness

### **Breakpoints Suportados**

* **Mobile**: 320px - 768px
* **Tablet**: 768px - 1024px
* **Desktop**: 1024px+
* **Large Desktop**: 1440px+

### **Otimizações Mobile**

* Touch-friendly interface
* Gestos de navegação otimizados
* Performance otimizada para conexões lentas
* Imagens responsivas com lazy loading

---

## 🌍 Internationalization

* **Idioma Atual**: Português (Brasil)
* **Estrutura**: Preparada para múltiplos idiomas
* **Implementação**: Sistema de i18n pode ser facilmente adicionado

---

## 📈 Analytics

### **Sistema Personalizado**

* **Section Tracking**: Rastreamento automático de seções visíveis
* **Title Updates**: Atualização dinâmica de títulos de página
* **User Interactions**: Tracking de cliques e navegação
* **Performance Metrics**: Monitoramento de performance

### **Integração Externa**

* **Google Analytics**: Configuração opcional via variáveis de ambiente
* **UTM Tracking**: Suporte a parâmetros UTM para campanhas

---

## 🤝 Contribution

### **Como Contribuir**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Padrões de Código**

* **TypeScript**: Tipagem obrigatória
* **ESLint**: Seguir regras configuradas
* **Prettier**: Formatação automática
* **Commits**: Usar conventional commits
* **Componentes**: Funcionais com hooks
* **Estilos**: Tailwind CSS + SCSS quando necessário

---

## 📄 License

Este projeto está licenciado sob uma **Licença Proprietária** - veja o arquivo [LICENSE](LICENSE) para detalhes.

### **Restrições**

* ❌ Uso comercial proibido
* ❌ Modificação não permitida
* ❌ Distribuição não autorizada
* ✅ Visualização para fins educacionais
* ✅ Estudo do código para aprendizado pessoal

---

## 📞 Contact

**Dionatha Goulart** - Desenvolvedor Full Stack

* 📧 **Email**: [dionatha.work@gmail.com](mailto:dionatha.work@gmail.com)
* 🌐 **Website**: [dionatha.com.br](https://dionatha.com.br)
* 💼 **LinkedIn**: [Dionatha Goulart](https://linkedin.com/in/dionatha-goulart)
* 🐙 **GitHub**: [@dionatha-goulart](https://github.com/dionatha-goulart)
* 📱 **Portfolio**: [dionatha.com.br](https://dionatha.com.br)

---

> *Feito com ❤️ e ☕ por [Dionatha Goulart]. Se gostou, considere dar uma ⭐!*
