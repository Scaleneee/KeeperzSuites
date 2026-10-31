import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GlassButton from '../components/GlassButton.jsx'
import PhotoBackdrop from '../components/PhotoBackdrop.jsx'
import artGallery from '../assets/art-center.jpeg'
import conventionCenter from '../assets/convention-center.jpeg'
import lrtStation from '../assets/lrt-station.jpeg'
import shoppingMall from '../assets/shopping-mall.jpeg'

const CHOICES = [
  { label: 'Shopping Mall', image: shoppingMall },
  { label: 'Convention Center', image: conventionCenter },
  { label: 'LRT Station', image: lrtStation },
  // Portrait photo: keep the building in frame.
  { label: 'Art Gallery', image: artGallery, position: 'object-[50%_27%]' },
]
const CORRECT_CHOICE = 'All of the above'

const TILE =
  'glass relative block w-full cursor-pointer transition-[background-color,border-color,box-shadow] duration-500 ease-out hover:bg-white/25'

function Mark({ correct }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`absolute -top-4 left-1/2 z-10 -ml-[1.125rem] flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-lg ${correct ? 'bg-[#22a35a]' : 'bg-[#dc2f3c]'}`}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {correct ? <path d="M3 8.5 6.5 12 13 4.5" /> : <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />}
      </svg>
      <span className="sr-only">{correct ? 'Correct' : 'Incorrect'}</span>
    </motion.span>
  )
}

export default function PrimeLocationPage({ onNavigate }) {
  const [selected, setSelected] = useState(null)

  const tileProps = (label) => ({
    type: 'button',
    'aria-pressed': selected === label,
    onClick: () => setSelected(label),
    whileHover: { y: -3 },
    transition: { duration: 0.5, ease: 'easeOut' },
  })

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 py-10 sm:py-12">
      <PhotoBackdrop />

      <div className="relative w-full max-w-2xl">
        <h1 className="text-center font-serif text-3xl leading-tight font-medium tracking-wide sm:text-4xl">
          ✨ WHAT MAKES THE LIGHT CITY A PRIME LOCATION?
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
          {CHOICES.map(({ label, image, position = 'object-center' }) => (
            <motion.button
              key={label}
              {...tileProps(label)}
              className={`${TILE} ${selected === label ? 'border-[#dc2f3c]!' : ''}`}
            >
              <AnimatePresence>{selected === label && <Mark correct={false} />}</AnimatePresence>
              <img
                src={image}
                alt=""
                className={`aspect-[16/10] w-full rounded-t-[23px] object-cover ${position}`}
              />
              <span className="block px-2 py-3 text-center text-sm font-medium sm:text-base">{label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          {...tileProps(CORRECT_CHOICE)}
          className={`${TILE} mt-5 px-4 py-6 text-center text-sm font-medium sm:text-base ${selected === CORRECT_CHOICE ? 'border-[#22a35a]!' : ''}`}
        >
          <AnimatePresence>{selected === CORRECT_CHOICE && <Mark correct />}</AnimatePresence>
          {CORRECT_CHOICE}
        </motion.button>

        <div className="mt-8 flex justify-center">
          <GlassButton onClick={() => onNavigate('landing')}>Back</GlassButton>
        </div>
      </div>
    </main>
  )
}
