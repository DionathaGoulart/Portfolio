// ================================
// SKILL SECTION TYPES
// ================================

import { Skill } from '../../shared/ui/Skill.types'

/**
 * Configuração de categoria de habilidades
 */
export interface SkillCategory {
  /** Chave única da categoria */
  key: string
  /** Lista de habilidades da categoria */
  skills: Skill[]
  /** Delay de animação para a categoria */
  delay: number
}
