// src/components/AnimatedContainer/AnimatedContainer.tsx
import React, { useEffect, ReactNode } from 'react'
import AOS, { easingOptions } from 'aos'
import 'aos/dist/aos.css'

// Novo tipo customizado para as animações
type AosAnimationTypes =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-up-right'
  | 'fade-up-left'
  | 'fade-down-right'
  | 'fade-down-left'
  | 'flip-up'
  | 'flip-down'
  | 'flip-left'
  | 'flip-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-in-up'
  | 'zoom-in-down'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-out'
  | 'zoom-out-up'
  | 'zoom-out-down'
  | 'zoom-out-left'
  | 'zoom-out-right'

// Definição das props para o componente, agora com o novo tipo
interface AnimatedContainerProps {
  children: ReactNode
  animationType?: AosAnimationTypes // AQUI ESTÁ A MUDANÇA
  duration?: number
  delay?: number
  easing?: easingOptions
  offset?: number
  className?: string
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animationType = 'fade-up',
  duration = 1000,
  delay = 0,
  easing = 'ease-in-out',
  offset = 120
}) => {
  // ... resto do código (o mesmo que antes)
  useEffect(() => {
    AOS.init({
      once: true,
      duration: duration,
      delay: delay,
      easing: easing,
      offset: offset
    })
  }, [duration, delay, easing, offset])

  return (
    <div
      data-aos={animationType}
      data-aos-duration={duration}
      data-aos-delay={delay}
      data-aos-easing={easing}
      data-aos-offset={offset}
    >
      {children}
    </div>
  )
}
