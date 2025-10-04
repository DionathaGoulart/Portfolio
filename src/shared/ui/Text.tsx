import React, { useState, useEffect } from 'react'
import { TextProps } from '@types'
import '@styles/ui/text.scss'

// ================================
// CONSTANTS
// ================================

const DEFAULT_PROPS = {
  as: 'p' as const,
  size: 'medio' as const,
  align: 'start' as const,
  color: 'text' as const,
  border: 'none' as const,
  columnGap: 'medium' as const,
  truncate: false,
  breakWords: false,
  highlight: false,
  code: false,
  gradient: false,
  disableAnchorOnMobile: true,
  className: ''
}

// ================================
// HOOKS
// ================================

/**
 * Hook para detectar se a tela é de tamanho mobile
 * @returns {boolean} True se a tela for menor que 768px
 */
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Calcula peso do texto baseado no número de caracteres
 * @param {string} text - Texto para calcular peso
 * @returns {number} Número de caracteres no texto
 */
const calculateTextWeight = (text: string): number => text.length

/**
 * Divide conteúdo em seções balanceadas para distribuição de texto
 * @param {string} content - Conteúdo a ser dividido
 * @param {number} sectionCount - Número de seções desejadas
 * @returns {string[]} Array de seções de texto
 */
const splitContentIntoSections = (
  content: string,
  sectionCount: number
): string[] => {
  const cleanContent = content.trim()
  let sections = cleanContent
    .split(/\n\s*\n/)
    .filter((section) => section.trim())

  // If not enough paragraphs, split by sentences
  if (sections.length < sectionCount * 2) {
    sections = cleanContent
      .split(/(?<=[.!?])\s+/)
      .filter((section) => section.trim())
  }

  // If still not enough sections, split by words
  if (sections.length < sectionCount * 2) {
    const words = cleanContent.split(/\s+/)
    const wordsPerSection = Math.max(
      1,
      Math.floor(words.length / (sectionCount * 3))
    )
    sections = []

    for (let i = 0; i < words.length; i += wordsPerSection) {
      const sectionWords = words.slice(i, i + wordsPerSection)
      if (sectionWords.length > 0) {
        sections.push(sectionWords.join(' '))
      }
    }
  }

  return sections
}

/**
 * Distributes text sections across columns using balanced algorithm
 */
const distributeTextAcrossColumns = (
  sections: string[],
  columnCount: number
): string[] => {
  const sectionsWithWeight = sections.map((section, index) => ({
    content: section,
    weight: calculateTextWeight(section),
    originalIndex: index
  }))

  const columns = Array(columnCount)
    .fill(null)
    .map(() => ({
      sections: [] as string[],
      totalWeight: 0
    }))

  sectionsWithWeight
    .sort((a, b) => b.weight - a.weight)
    .forEach((section) => {
      const lightestColumnIndex = columns.reduce(
        (minIndex, currentColumn, currentIndex) =>
          currentColumn.totalWeight < columns[minIndex].totalWeight
            ? currentIndex
            : minIndex,
        0
      )

      columns[lightestColumnIndex].sections.push(section.content)
      columns[lightestColumnIndex].totalWeight += section.weight
    })

  // Redistribute from empty columns if any exist
  const emptyColumns = columns.filter((column) => column.sections.length === 0)

  if (emptyColumns.length > 0) {
    const heaviestColumns = columns
      .map((column, index) => ({ ...column, index }))
      .filter((column) => column.sections.length > 1)
      .sort((a, b) => b.totalWeight - a.totalWeight)

    emptyColumns.forEach((emptyColumn, emptyIndex) => {
      const heaviestColumn = heaviestColumns[emptyIndex]
      if (heaviestColumn && heaviestColumn.sections.length > 1) {
        const sectionToMove = heaviestColumn.sections.pop()
        if (sectionToMove) {
          emptyColumn.sections.push(sectionToMove)
        }
      }
    })
  }

  // Balance columns through iterative improvement
  let hasImproved = true
  let iterationCount = 0
  const maxIterations = 5

  while (hasImproved && iterationCount < maxIterations) {
    hasImproved = false
    iterationCount++

    for (let i = 0; i < columns.length; i++) {
      for (let j = i + 1; j < columns.length; j++) {
        const column1 = columns[i]
        const column2 = columns[j]
        const weightDifference = Math.abs(
          column1.totalWeight - column2.totalWeight
        )

        if (
          weightDifference > 50 &&
          column1.sections.length > 0 &&
          column2.sections.length > 0
        ) {
          const heavierColumn =
            column1.totalWeight > column2.totalWeight ? column1 : column2
          const lighterColumn =
            column1.totalWeight > column2.totalWeight ? column2 : column1

          const smallSectionIndex = heavierColumn.sections.findIndex(
            (section) => calculateTextWeight(section) < weightDifference / 2
          )

          if (smallSectionIndex !== -1) {
            const sectionToMove = heavierColumn.sections.splice(
              smallSectionIndex,
              1
            )[0]
            lighterColumn.sections.push(sectionToMove)
            heavierColumn.totalWeight -= calculateTextWeight(sectionToMove)
            lighterColumn.totalWeight += calculateTextWeight(sectionToMove)
            hasImproved = true
          }
        }
      }
    }
  }

  return columns.map((column) => column.sections.join('\n\n'))
}

/**
 * Splits content into balanced columns for multi-column layout
 */
const splitTextIntoColumns = (
  content: React.ReactNode,
  columnCount: number
): React.ReactNode[] => {
  if (typeof content !== 'string') {
    return Array(columnCount)
      .fill(null)
      .map((_, index) => <React.Fragment key={index}>{content}</React.Fragment>)
  }

  const sections = splitContentIntoSections(content, columnCount)
  const columnContents = distributeTextAcrossColumns(sections, columnCount)

  return columnContents
}

/**
 * Generates CSS classes based on component props
 */
const generateClassNames = (
  props: Required<TextProps>,
  shouldUseAnchor: boolean = true
): string => {
  const {
    as,
    size,
    color,
    align,
    weight,
    style,
    leading,
    truncate,
    breakWords,
    highlight,
    code,
    gradient,
    shadow,
    border,
    responsive,
    columns,
    columnGap,
    anchor,
    className
  } = props

  const hasColumns = columns && columns > 1

  const classes = [
    'text',
    `text--${as}`,
    `text--${size}`,
    `text--${color}`,
    `text--${align}`,
    weight && `text--${weight}`,
    style && `text--${style}`,
    leading && `text--leading-${leading}`,
    truncate && 'text--truncate',
    breakWords && 'text--break-words',
    highlight && 'text--highlight',
    code && 'text--code',
    gradient && 'text--gradient',
    shadow === true && 'text--shadow',
    shadow === 'strong' && 'text--shadow-strong',
    border !== 'none' && `text--border-${border}`,
    shouldUseAnchor && anchor && `text--anchor-${anchor}`,
    responsive && `text--responsive-${responsive}`,
    hasColumns && 'text--column-layout',
    hasColumns && `text--columns-${columns}`,
    hasColumns && `text--gap-${columnGap}`,
    className
  ]

  return classes.filter(Boolean).join(' ')
}

// ================================
// MAIN TEXT COMPONENT
// ================================

/**
 * Componente de texto versátil com suporte a múltiplos layouts, estilos e distribuição em colunas
 * Inclui algoritmo inteligente de balanceamento de texto para layouts multi-coluna
 *
 * @param {TextProps} props - Propriedades de configuração do texto
 * @returns {JSX.Element} Componente de texto renderizado
 *
 * @example
 * ```tsx
 * <Text size="grande" color="primary" columns={2}>
 *   Conteúdo de texto em múltiplas colunas
 * </Text>
 * ```
 */
export const Text: React.FC<TextProps> = (inputProps) => {
  // ================================
  // DERIVED VALUES
  // ================================

  const props = { ...DEFAULT_PROPS, ...inputProps } as Required<TextProps>
  const {
    children,
    as: Element,
    columns,
    anchor,
    disableAnchorOnMobile,
    id
  } = props

  const isMobile = useIsMobile()
  const shouldUseAnchor = anchor && !(disableAnchorOnMobile && isMobile)
  const hasColumns = columns && columns > 1
  const cssClasses = generateClassNames(props, shouldUseAnchor)

  // ================================
  // EARLY RETURNS - ANCHORED TEXT
  // ================================

  if (shouldUseAnchor && !hasColumns) {
    return (
      <>
        <div className={`${cssClasses} text--anchored`}>
          <Element className="text__anchored-content" id={id}>
            {children}
          </Element>
        </div>
        <div className="text-clearfix" />
      </>
    )
  }

  // ================================
  // EARLY RETURNS - COLUMN LAYOUT
  // ================================

  if (hasColumns) {
    const columnContents = splitTextIntoColumns(children, columns)

    return (
      <div className={cssClasses}>
        <div className="text__columns">
          {columnContents.map((content, index) => (
            <div key={index} className="text__column">
              <Element className="text__column-content">{content}</Element>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ================================
  // RENDER - STANDARD
  // ================================

  return (
    <Element className={cssClasses} id={id}>
      {children}
    </Element>
  )
}

// ================================
// SPECIFIC COMPONENTS
// ================================

/**
 * Componente de parágrafo - atalho para elemento <p>
 *
 * @param {Omit<TextProps, 'as'>} props - Propriedades de texto sem a propriedade 'as'
 * @returns {JSX.Element} Elemento de parágrafo renderizado
 */
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

/**
 * Componente de span - atalho para elemento <span>
 *
 * @param {Omit<TextProps, 'as'>} props - Propriedades de texto sem a propriedade 'as'
 * @returns {JSX.Element} Elemento de span renderizado
 */
export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
