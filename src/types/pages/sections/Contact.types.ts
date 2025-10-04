// ================================
// CONTACT SECTION TYPES
// ================================

import { FormData } from '../sections'

/**
 * Campos do formulário de contato
 */
export type FormField = keyof FormData

/**
 * Erros de validação do formulário
 */
export type FormErrors = Partial<Record<FormField, string>>

/**
 * Status de envio do formulário
 */
export type SubmitStatus = 'idle' | 'success' | 'error'
