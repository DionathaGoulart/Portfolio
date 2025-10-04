import { EmailJSConfig } from './types'

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Helper function to access Vite environment variables
 * @param key - Environment variable key
 * @returns Environment variable value or empty string
 */
const getEnvVar = (key: string): string => {
  return (import.meta as { env?: Record<string, string> }).env?.[key] || ''
}

// ================================
// CONFIGURATION
// ================================

/**
 * EmailJS service configuration
 * Contains all necessary credentials for EmailJS integration
 */
export const emailjsConfig: EmailJSConfig = {
  SERVICE_ID: getEnvVar('VITE_EMAILJS_SERVICE_ID') || 'YOUR_SERVICE_ID',
  TEMPLATE_ID: getEnvVar('VITE_EMAILJS_TEMPLATE_ID') || 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: getEnvVar('VITE_EMAILJS_PUBLIC_KEY') || 'YOUR_PUBLIC_KEY'
}

// ================================
// VALIDATION FUNCTIONS
// ================================

/**
 * Validates if EmailJS is properly configured
 * Checks if all required environment variables are set and not default values
 * @returns true if EmailJS is properly configured, false otherwise
 */
export const isEmailJSConfigured = (): boolean => {
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = emailjsConfig

  return Boolean(
    SERVICE_ID &&
      TEMPLATE_ID &&
      PUBLIC_KEY &&
      SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  )
}

// ================================
// TEMPLATE DOCUMENTATION
// ================================

/**
 * EmailJS Template Configuration:
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
