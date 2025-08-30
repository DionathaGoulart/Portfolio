import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { analytics } from '@/features/Analytics/utils/analytics'
import { Button } from '@/shared/ui/Button'
import { P } from '@/shared/ui/Text'
import { Title } from '@/shared/ui/Title'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { FormField } from '@/shared/ui/FormField'
import { ContactCard } from '@/shared/ui/ContactCard'
import { emailjsConfig, isEmailJSConfigured } from '@features/Emailjs'

interface ContactSectionProps {
  id?: string
}

// Tipos para o formulário
interface FormData {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

interface FormErrors {
  nome?: string
  email?: string
  assunto?: string
  mensagem?: string
}

const ContactSection: React.FC<ContactSectionProps> = ({ id = '' }) => {
  // ============================================================================
  // ESTADO DO FORMULÁRIO
  // ============================================================================
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  // ============================================================================
  // HANDLERS
  // ============================================================================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validar nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validar assunto
    if (!formData.assunto.trim()) {
      newErrors.assunto = 'Assunto é obrigatório'
    }

    // Validar mensagem
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória'
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      // TRACKING: Rastrear tentativa de envio do formulário
      analytics.trackButtonClick('contact_form_submit')

      // Verificar se EmailJS está configurado
      if (!isEmailJSConfigured()) {
        throw new Error('EmailJS não está configurado')
      }

      // Enviar email via EmailJS
      await emailjs.send(
        emailjsConfig.SERVICE_ID,
        emailjsConfig.TEMPLATE_ID,
        {
          from_name: formData.nome,
          from_email: formData.email,
          to_email: 'dionatha.work@gmail.com',
          subject: formData.assunto,
          message: formData.mensagem
        },
        emailjsConfig.PUBLIC_KEY
      )

      // Sucesso
      setSubmitStatus('success')
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      })

      // TRACKING: Rastrear sucesso do envio
      analytics.trackButtonClick('contact_form_success')
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      setSubmitStatus('error')

      // TRACKING: Rastrear erro no envio
      analytics.trackButtonClick('contact_form_error')
    } finally {
      setIsLoading(false)
    }
  }

  // ============================================================================
  // HANDLERS DE CONTATO - ATUALIZADOS
  // ============================================================================
  const handleEmailClick = () => {
    analytics.trackButtonClick('contact_email')
    window.location.href = 'mailto:dionatha.work@gmail.com'
  }

  const handleWhatsAppClick = () => {
    analytics.trackButtonClick('contact_whatsapp')
    // Número sem caracteres especiais (código do país + DDD + número)
    const phoneNumber = '5551999999999' // Ajuste para seu número real
    const message = encodeURIComponent(
      'Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.'
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleGithubClick = () => {
    analytics.trackButtonClick('contact_github')
    window.open('https://github.com/dionatha', '_blank')
  }

  const handleLinkedinClick = () => {
    analytics.trackButtonClick('contact_linkedin')
    window.open('https://linkedin.com/in/dionatha', '_blank')
  }

  const handleInstagramClick = () => {
    analytics.trackButtonClick('contact_instagram')
    window.open('https://instagram.com/dionatha', '_blank')
  }

  const handleTwitterClick = () => {
    analytics.trackButtonClick('contact_twitter')
    window.open('https://twitter.com/dionatha', '_blank')
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <Title level="h1" color="primary" className="mb-4">
            Vamos Conversar
          </Title>
          <P size="grande" className="max-w-2xl mx-auto">
            Tem um projeto em mente? Quer discutir uma oportunidade? Estou
            sempre aberto para novas parcerias e desafios.
          </P>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Formulário de contato */}
          <div>
            <Title level="h2" className="mb-4">
              Envie uma Mensagem
            </Title>
            <P className="mb-8">
              Preencha o formulário abaixo e entrarei em contato o mais breve
              possível.
            </P>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField label="Nome" required error={errors.nome}>
                <Input
                  name="nome"
                  value={formData.nome}
                  placeholder="Seu nome completo"
                  onChange={handleInputChange}
                  error={Boolean(errors.nome)}
                  required
                />
              </FormField>

              <FormField label="Email" required error={errors.email}>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="seu.email@exemplo.com"
                  onChange={handleInputChange}
                  error={Boolean(errors.email)}
                  required
                />
              </FormField>

              <FormField label="Assunto" required error={errors.assunto}>
                <Input
                  name="assunto"
                  value={formData.assunto}
                  placeholder="Sobre o que você gostaria de conversar?"
                  onChange={handleInputChange}
                  error={Boolean(errors.assunto)}
                  required
                />
              </FormField>

              <FormField label="Mensagem" required error={errors.mensagem}>
                <Textarea
                  name="mensagem"
                  value={formData.mensagem}
                  placeholder="Conte-me mais sobre seu projeto ou ideia..."
                  rows={5}
                  onChange={handleInputChange}
                  error={Boolean(errors.mensagem)}
                  required
                />
              </FormField>

              {submitStatus === 'success' && (
                <div className="p-4 bg-theme-success/10 border border-theme-success rounded-lg">
                  <P color="success">
                    Mensagem enviada com sucesso! Entrarei em contato em breve.
                  </P>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-theme-error/10 border border-theme-error rounded-lg">
                  <P color="error">
                    Ocorreu um erro ao enviar a mensagem. Tente novamente ou
                    entre em contato diretamente pelo email.
                  </P>
                </div>
              )}

              <Button
                type="submit"
                variant="solid"
                size="grande"
                loading={isLoading}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>

          {/* Informações de contato */}
          <div>
            <Title level="h2" className="mb-4">
              Informações de Contato
            </Title>
            <P className="mb-8">
              Prefere outro meio de contato? Aqui estão todas as formas de
              entrar em contato comigo.
            </P>

            {/* Contatos diretos */}
            <div className="space-y-4 mb-12">
              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Email"
                value="dionatha.work@gmail.com"
                onClick={handleEmailClick}
              />

              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.287" />
                  </svg>
                }
                title="WhatsApp"
                value="+55 (51) 99999-9999"
                onClick={handleWhatsAppClick}
              />

              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                title="Localização"
                value="Porto Alegre, RS - Brasil"
              />
            </div>

            {/* Redes sociais */}
            <Title level="h3" className="mb-6">
              Redes Sociais
            </Title>
            <div className="grid grid-cols-2 gap-4">
              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
                title="GitHub"
                value="github.com/dionatha"
                href="https://github.com/GoodGD-Dev"
              />

              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                title="LinkedIn"
                value="linkedin.com/in/dionatha"
                href="https://www.linkedin.com/in/dionathagoulart/"
              />

              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.085.339-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                }
                title="Instagram"
                value="@dionatha"
                href="https://instagram.com/dionatha"
              />

              <ContactCard
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                }
                title="Twitter"
                value="@dionatha"
                href="https://twitter.com/dionatha"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
