import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GlassButton from '../components/GlassButton.jsx'
import backgroundImage from '../assets/keeperz-background.jpg'
import buildingImage from '../assets/keeperz-building.png'
import calculatorBackground from '../assets/blurred_background.jpg'

const EASE_OUT = [0.16, 1, 0.3, 1]

// Both images share one canvas size and crop, so the building sits exactly in
// its place in the scene at any viewport.
const SCENE_IMAGE = 'absolute inset-0 h-full w-full object-cover object-[38%_100%]'

const loadImage = (src) => {
  const image = new Image()
  image.src = src
  return image.decode()
}

export default function LandingPage({ onNavigate }) {
  const [ready, setReady] = useState(false)

  // Hold the entrance until the art is ready, so it isn't missed on slow networks.
  useEffect(() => {
    let cancelled = false
    loadImage(calculatorBackground).catch(() => {})
    Promise.allSettled([loadImage(backgroundImage), loadImage(buildingImage)]).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const state = ready ? 'shown' : 'hidden'

  return (
    <main className="relative h-dvh min-h-[34rem] overflow-hidden">
      <img src={backgroundImage} alt="" className={SCENE_IMAGE} />
      <motion.img
        src={buildingImage}
        alt="The Keeperz Suites towers on the waterfront at sunset"
        className={SCENE_IMAGE}
        initial="hidden"
        animate={state}
        variants={{ hidden: { y: '100%' }, shown: { y: 0 } }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      />
      <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-[#2a1d14]/65 via-[#2a1d14]/35 to-transparent" />

      <div className="relative flex h-full flex-col items-center justify-between px-4 pt-[9dvh] pb-[8dvh] text-center">
        <div>
          <motion.h1
            className="font-serif text-[clamp(3rem,9vw,6.5rem)] leading-none font-medium tracking-wide [text-shadow:0_2px_24px_rgba(40,25,15,0.55)]"
            initial="hidden"
            animate={state}
            variants={{ hidden: { y: '-60vh' }, shown: { y: 0 } }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT }}
          >
            Keeperz Suites
          </motion.h1>
          <motion.p
            className="label-caps mt-5 text-white! [text-shadow:0_1px_12px_rgba(40,25,15,0.7)]"
            initial="hidden"
            animate={state}
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: 0.9, delay: 1.5, ease: 'easeOut' }}
          >
            Airbnb Investment Property
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, delay: 1.9, ease: 'easeOut' }}
        >
          <GlassButton onClick={() => onNavigate('calculator')}>Start Your Investment</GlassButton>
        </motion.div>
      </div>
    </main>
  )
}
