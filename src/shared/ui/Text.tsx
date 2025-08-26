import React from 'react'
import { TextProps } from '../types'

export const Text: React.FC<TextProps> = ({
  // Conteúdo
  children,
  // Estrutura
  as = 'p',
  // Aparência
  size = 'medio',
  align = 'start',
  color = 'text',
  weight,
  // Modificadores de estilo
  style,
  leading,
  // Comportamentos
  truncate = false,
  breakWords = false,
  // Modificadores visuais
  highlight = false,
  code = false,
  gradient = false,
  shadow,
  border = 'none',
  // Responsividade
  responsive,
  // Layout de colunas (API simplificada)
  columns,
  columnGap = 'medium',
  // HTML attributes
  className = '',
  id
}) => {
  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  const Element = as
  const hasColumns = columns && columns > 1

  // ============================================================================
  // CLASSES CSS
  // ============================================================================
  const classes = [
    // Classe base
    'text',
    // Elemento e aparência básica
    `text--${as}`,
    `text--${size}`,
    `text--${color}`,
    `text--${align}`,
    // Modificadores de aparência
    weight && `text--${weight}`,
    style && `text--${style}`,
    leading && `text--leading-${leading}`,
    // Comportamentos de texto
    truncate && 'text--truncate',
    breakWords && 'text--break-words',
    // Modificadores visuais
    highlight && 'text--highlight',
    code && 'text--code',
    gradient && 'text--gradient',
    shadow === true && 'text--shadow',
    shadow === 'strong' && 'text--shadow-strong',
    // Border decorativa
    border !== 'none' && `text--border-${border}`,
    // Responsividade
    responsive && `text--responsive-${responsive}`,
    // Layout de colunas
    hasColumns && 'text--column-layout',
    hasColumns && `text--columns-${columns}`,
    hasColumns && `text--gap-${columnGap}`,
    // Classes customizadas
    className
  ]
    .filter(Boolean)
    .join(' ')

  // ============================================================================
  // UTILITÁRIOS PARA DIVIDIR CONTEÚDO DE FORMA EQUILIBRADA
  // ============================================================================
  const splitTextIntoColumns = (
    content: React.ReactNode,
    numColumns: number
  ) => {
    if (typeof content !== 'string') {
      // Para conteúdo não-string, duplica igualmente
      return Array(numColumns)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>{content}</React.Fragment>
        ))
    }

    // Remove quebras de linha extras e divide por parágrafos
    const cleanContent = content.trim()
    let sections = cleanContent.split(/\n\s*\n/).filter((s) => s.trim())

    // Se não há parágrafos suficientes, divide por sentenças
    if (sections.length < numColumns * 2) {
      sections = cleanContent.split(/(?<=[.!?])\s+/).filter((s) => s.trim())
    }

    // Se ainda não há seções suficientes, divide por palavras
    if (sections.length < numColumns * 2) {
      const words = cleanContent.split(/\s+/)
      const wordsPerSection = Math.max(
        1,
        Math.floor(words.length / (numColumns * 3))
      )
      sections = []
      for (let i = 0; i < words.length; i += wordsPerSection) {
        const sectionWords = words.slice(i, i + wordsPerSection)
        if (sectionWords.length > 0) {
          sections.push(sectionWords.join(' '))
        }
      }
    }

    // ============================================================================
    // ALGORITMO DE DISTRIBUIÇÃO EQUILIBRADA
    // ============================================================================

    // Calcula o "peso" de cada seção (baseado no número de caracteres)
    const sectionsWithWeight = sections.map((section, index) => ({
      content: section,
      weight: section.length,
      originalIndex: index
    }))

    // Inicializa as colunas
    const columns = Array(numColumns)
      .fill(null)
      .map(() => ({
        sections: [] as string[],
        totalWeight: 0
      }))

    // Distribui as seções usando algoritmo de "bin packing" simplificado
    // Ordena seções por peso (maior primeiro) para melhor distribuição
    sectionsWithWeight
      .sort((a, b) => b.weight - a.weight)
      .forEach((section) => {
        // Encontra a coluna com menor peso total
        const lightestColumn = columns.reduce(
          (min, current, index) =>
            current.totalWeight < columns[min].totalWeight ? index : min,
          0
        )

        // Adiciona a seção à coluna mais leve
        columns[lightestColumn].sections.push(section.content)
        columns[lightestColumn].totalWeight += section.weight
      })

    // Se alguma coluna ficou vazia, redistribui
    const emptyColumns = columns.filter((col) => col.sections.length === 0)
    if (emptyColumns.length > 0) {
      // Pega seções das colunas mais pesadas e redistribui
      const heaviestColumns = columns
        .map((col, index) => ({ ...col, index }))
        .filter((col) => col.sections.length > 1)
        .sort((a, b) => b.totalWeight - a.totalWeight)

      emptyColumns.forEach((emptyCol, emptyIndex) => {
        if (
          heaviestColumns[emptyIndex] &&
          heaviestColumns[emptyIndex].sections.length > 1
        ) {
          const sectionToMove = heaviestColumns[emptyIndex].sections.pop()
          if (sectionToMove) {
            emptyCol.sections.push(sectionToMove)
          }
        }
      })
    }

    // ============================================================================
    // BALANCEAMENTO FINAL
    // ============================================================================

    // Tenta balancear ainda mais movendo seções pequenas entre colunas
    let improved = true
    let iterations = 0
    const maxIterations = 5

    while (improved && iterations < maxIterations) {
      improved = false
      iterations++

      for (let i = 0; i < columns.length; i++) {
        for (let j = i + 1; j < columns.length; j++) {
          const col1 = columns[i]
          const col2 = columns[j]
          const weightDiff = Math.abs(col1.totalWeight - col2.totalWeight)

          // Se a diferença é significativa, tenta rebalancear
          if (
            weightDiff > 50 &&
            col1.sections.length > 0 &&
            col2.sections.length > 0
          ) {
            const heavierCol = col1.totalWeight > col2.totalWeight ? col1 : col2
            const lighterCol = col1.totalWeight > col2.totalWeight ? col2 : col1

            // Procura uma seção pequena da coluna mais pesada para mover
            const smallSectionIndex = heavierCol.sections.findIndex(
              (section) => section.length < weightDiff / 2
            )

            if (smallSectionIndex !== -1) {
              const sectionToMove = heavierCol.sections.splice(
                smallSectionIndex,
                1
              )[0]
              lighterCol.sections.push(sectionToMove)
              heavierCol.totalWeight -= sectionToMove.length
              lighterCol.totalWeight += sectionToMove.length
              improved = true
            }
          }
        }
      }
    }

    // Retorna o conteúdo das colunas, juntando as seções
    return columns.map((column) => column.sections.join('\n\n'))
  }

  // ============================================================================
  // RENDER COM LAYOUT DE COLUNAS
  // ============================================================================
  if (hasColumns) {
    const columnContents = splitTextIntoColumns(children, columns)

    return (
      <div className={classes}>
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

  // ============================================================================
  // RENDER PADRÃO
  // ============================================================================
  return (
    <Element className={classes} id={id}>
      {children}
    </Element>
  )
}

// ============================================================================
// COMPONENTES ESPECÍFICOS
// ============================================================================
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
