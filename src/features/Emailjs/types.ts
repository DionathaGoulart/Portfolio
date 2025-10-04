// ================================
// EMAILJS TYPES & INTERFACES
// ================================

/**
 * Configuração do serviço EmailJS
 *
 * @interface EmailJSConfig
 * @property {string} SERVICE_ID - ID do serviço EmailJS
 * @property {string} TEMPLATE_ID - ID do template de email
 * @property {string} PUBLIC_KEY - Chave pública do EmailJS
 */
export interface EmailJSConfig {
  SERVICE_ID: string
  TEMPLATE_ID: string
  PUBLIC_KEY: string
}

/**
 * Dados do formulário de contato para EmailJS
 *
 * @interface ContactFormData
 * @property {string} from_name - Nome do remetente
 * @property {string} from_email - Email do remetente
 * @property {string} subject - Assunto da mensagem
 * @property {string} message - Conteúdo da mensagem
 */
export interface ContactFormData {
  from_name: string
  from_email: string
  subject: string
  message: string
}

/**
 * Resposta do EmailJS após envio
 *
 * @interface EmailJSResponse
 * @property {number} status - Status HTTP da resposta
 * @property {string} text - Texto da resposta
 */
export interface EmailJSResponse {
  status: number
  text: string
}

/**
 * Opções de configuração do EmailJS
 *
 * @interface EmailJSOptions
 * @property {string} publicKey - Chave pública do EmailJS
 * @property {string} serviceId - ID do serviço
 * @property {string} templateId - ID do template
 */
export interface EmailJSOptions {
  publicKey: string
  serviceId: string
  templateId: string
}
