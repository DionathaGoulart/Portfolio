import React from 'react'
import { TextProps } from '../types'

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
  className: ''
}

// ================================
// HELPER FUNCTIONS
// ================================

/**
 * Calculates text weight based on character count
 * @param text - Text content to weigh
 * @returns Weight value based on character count
 */
const calculateTextWeight = (text: string): number => text.length

/**
 * Splits content into balanced sections for text distribution
 * @param content - Text content to split
 * @param sectionCount - Number of sections to create
 * @returns Array of text sections
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
 * @param sections - Array of text sections
 * @param columnCount - Number of columns to distribute to
 * @returns Array of column content strings
 */
const distributeTextAcrossColumns = (
  sections: string[],
  columnCount: number
): string[] => {
  // Calculate weight for each section
  const sectionsWithWeight = sections.map((section, index) => ({
    content: section,
    weight: calculateTextWeight(section),
    originalIndex: index
  }))

  // Initialize columns with empty arrays
  const columns = Array(columnCount)
    .fill(null)
    .map(() => ({
      sections: [] as string[],
      totalWeight: 0
    }))

  // Sort sections by weight (heaviest first) for better distribution
  sectionsWithWeight
    .sort((a, b) => b.weight - a.weight)
    .forEach((section) => {
      // Find column with minimum weight
      const lightestColumnIndex = columns.reduce(
        (minIndex, currentColumn, currentIndex) =>
          currentColumn.totalWeight < columns[minIndex].totalWeight
            ? currentIndex
            : minIndex,
        0
      )

      // Add section to lightest column
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

        // Attempt rebalancing if weight difference is significant
        if (
          weightDifference > 50 &&
          column1.sections.length > 0 &&
          column2.sections.length > 0
        ) {
          const heavierColumn =
            column1.totalWeight > column2.totalWeight ? column1 : column2
          const lighterColumn =
            column1.totalWeight > column2.totalWeight ? column2 : column1

          // Find small section to move
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
 * @param content - React node content to split
 * @param columnCount - Number of columns to create
 * @returns Array of content for each column
 */
const splitTextIntoColumns = (
  content: React.ReactNode,
  columnCount: number
): React.ReactNode[] => {
  if (typeof content !== 'string') {
    // For non-string content, duplicate across all columns
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
 * @param props - Component props with defaults applied
 * @returns Space-separated string of CSS classes
 */
const generateClassNames = (props: Required<TextProps>): string => {
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
    className
  } = props

  const hasColumns = columns && columns > 1

  const classes = [
    // Base class
    'text',
    // Element and basic appearance
    `text--${as}`,
    `text--${size}`,
    `text--${color}`,
    `text--${align}`,
    // Style modifiers
    weight && `text--${weight}`,
    style && `text--${style}`,
    leading && `text--leading-${leading}`,
    // Text behaviors
    truncate && 'text--truncate',
    breakWords && 'text--break-words',
    // Visual modifiers
    highlight && 'text--highlight',
    code && 'text--code',
    gradient && 'text--gradient',
    shadow === true && 'text--shadow',
    shadow === 'strong' && 'text--shadow-strong',
    // Decorative borders
    border !== 'none' && `text--border-${border}`,
    // Responsiveness
    responsive && `text--responsive-${responsive}`,
    // Column layout
    hasColumns && 'text--column-layout',
    hasColumns && `text--columns-${columns}`,
    hasColumns && `text--gap-${columnGap}`,
    // Custom classes
    className
  ]

  return classes.filter(Boolean).join(' ')
}

// ================================
// COMPONENTS
// ================================

/**
 * Text component with support for multiple layouts, styles, and column distribution
 *
 * @param props - Text component props
 * @returns JSX element
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Text size="grande" color="primary">
 *   Content here
 * </Text>
 *
 * // Multi-column layout
 * <Text columns={2} columnGap="large" align="center">
 *   Long content that will be distributed across columns
 * </Text>
 *
 * // With visual effects
 * <Text gradient shadow="strong" border="center">
 *   Stylized text content
 * </Text>
 * ```
 */
export const Text: React.FC<TextProps> = (inputProps) => {
  const props = { ...DEFAULT_PROPS, ...inputProps } as Required<TextProps>
  const { children, as: Element, columns, id } = props

  const hasColumns = columns && columns > 1
  const cssClasses = generateClassNames(props)

  // ================================
  // COLUMN LAYOUT RENDER
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
  // STANDARD RENDER
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
 * Paragraph text component
 *
 * @param props - Text props without 'as' property
 * @returns Paragraph element
 */
export const P: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="p" {...props} />
)

/**
 * Span text component
 *
 * @param props - Text props without 'as' property
 * @returns Span element
 */
export const Span: React.FC<Omit<TextProps, 'as'>> = (props) => (
  <Text as="span" {...props} />
)
