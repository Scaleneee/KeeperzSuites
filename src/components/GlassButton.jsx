import { motion } from 'framer-motion'

export default function GlassButton({ className = '', children, ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`glass cursor-pointer px-10 py-4 text-xs font-medium tracking-[0.24em] text-white uppercase transition-[background-color,border-color,box-shadow] duration-500 ease-out hover:border-gold-light hover:bg-white/25 hover:shadow-[0_16px_48px_rgba(201,169,110,0.45)] ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
