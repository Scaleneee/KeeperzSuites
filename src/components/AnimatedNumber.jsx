import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

export default function AnimatedNumber({ value, format }) {
  const reducedMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState(value)
  const displayedRef = useRef(value)

  useEffect(() => {
    if (reducedMotion) {
      displayedRef.current = value
      setDisplayed(value)
      return undefined
    }
    const controls = animate(displayedRef.current, value, {
      duration: 0.5,
      ease: 'easeOut',
      onUpdate: (latest) => {
        displayedRef.current = latest
        setDisplayed(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [value, reducedMotion])

  return (
    <>
      <span aria-hidden="true">{format(displayed)}</span>
      <span className="sr-only" aria-live="polite">
        {format(value)}
      </span>
    </>
  )
}
