import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Opens on click, and closes on a second click, an outside click, or Escape.
export default function Tooltip({ content, children }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const tooltipId = useId()

  useEffect(() => {
    if (!open) return undefined
    const handlePointerDown = (event) => {
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className="label-caps inline-flex cursor-pointer items-center gap-2 transition-colors duration-500 ease-out hover:text-gold-light"
        aria-expanded={open}
        aria-controls={open ? tooltipId : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {children}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor">
          <circle cx="8" cy="8" r="7" />
          <path d="M8 7.25V11.5" strokeLinecap="round" />
          <circle cx="8" cy="4.75" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={tooltipId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-[16rem] -translate-x-1/2 rounded-2xl border border-white/30 bg-[#2b241e]/65 px-4 py-2.5 text-sm text-white shadow-xl"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
