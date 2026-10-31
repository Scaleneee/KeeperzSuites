import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import LandingPage from './pages/LandingPage.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'
import PrimeLocationPage from './pages/PrimeLocationPage.jsx'
import ProfitSharingPage from './pages/ProfitSharingPage.jsx'

const PAGES = {
  landing: LandingPage,
  calculator: CalculatorPage,
  profitSharing: ProfitSharingPage,
  primeLocation: PrimeLocationPage,
}

export default function App() {
  const [page, setPage] = useState('landing')
  const Page = PAGES[page]

  return (
    // reducedMotion="user" drops transforms for those who ask, keeping fades.
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Page onNavigate={setPage} />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
