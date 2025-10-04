// ================================
// IMAGE UTILITY FUNCTIONS
// ================================

/**
 * Utilitário simples para processamento de caminhos de imagem
 * Atualmente retorna o caminho da imagem como está, mas pode ser estendido
 * para processamento de imagens, integração com CDN ou transformações de caminho
 *
 * @param {string} img - Caminho da imagem a ser processado
 * @returns {string} Caminho da imagem processado
 *
 * @example
 * ```typescript
 * const imagePath = getImage('/assets/logo.png')
 * // Retorna: '/assets/logo.png'
 * ```
 */
export const getImage = (img: string): string => img
