import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { AnimatedContainerProps } from '@types'

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
