// ============================================================================
// EMAILJS CONFIGURATION
// ============================================================================

// Função helper para acessar variáveis de ambiente do Vite
const getEnvVar = (key: string): string => {
  return (import.meta as any).env?.[key] || ''
}

export const emailjsConfig = {
  // Credenciais do EmailJS
  SERVICE_ID: getEnvVar('VITE_EMAILJS_SERVICE_ID') || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: getEnvVar('VITE_EMAILJS_TEMPLATE_ID') || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: getEnvVar('VITE_EMAILJS_PUBLIC_KEY') || 'YOUR_PUBLIC_KEY'
}

/**
 * Template EmailJS:
 *
 * Subject: Nova mensagem de contato - {{subject}}
 *
 * Body:
 * Você recebeu uma nova mensagem através do formulário de contato do seu site.
 *
 * Nome: {{from_name}}
 * Email: {{from_email}}
 * Assunto: {{subject}}
 *
 * Mensagem:
 * {{message}}
 *
 * ---
 * Esta mensagem foi enviada através do formulário de contato do seu portfólio.
 */

// Validação das configurações
export const isEmailJSConfigured = (): boolean => {
  return Boolean(
    emailjsConfig.SERVICE_ID &&
      emailjsConfig.TEMPLATE_ID &&
      emailjsConfig.PUBLIC_KEY &&
      emailjsConfig.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      emailjsConfig.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      emailjsConfig.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  )
}
