import { SectionConfig } from '../core/layout'

// ================================
// HOME PAGE TYPES
// ================================

/**
 * Props para o componente HomePage
 *
 * @interface HomePageProps
 * @property {function} setSections - Função para definir seções da página
 * @property {function} setPageTitle - Função para definir título da página
 */
export interface HomePageProps {
  setSections: (sections: SectionConfig[]) => void
  setPageTitle: (title: string) => void
}
