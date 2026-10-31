import { motion } from 'framer-motion'
import GlassButton from '../components/GlassButton.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PhotoBackdrop from '../components/PhotoBackdrop.jsx'
import { useCalculator } from '../context/CalculatorContext.jsx'
import { formatPercent, formatRM } from '../utils/format.js'

const NOT_ENTERED = 'Not entered'

function Reveal({ delay, className, children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Deduction({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-sm text-white/85">{label}</dt>
      <dd className="text-sm font-medium tabular-nums">{value}</dd>
    </div>
  )
}

export default function ProfitSharingPage({ onNavigate }) {
  const {
    monthlyInstallment,
    purchasePrice,
    grossRevenue,
    operatorShare,
    ownerShare,
    utilities,
    maintenanceFee,
    monthlyCashflow,
    annualRoi,
  } = useCalculator()

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 py-10 sm:py-12">
      <PhotoBackdrop />

      <div className="relative w-full max-w-3xl">
        <h1 className="text-center font-serif text-4xl font-medium tracking-wide sm:text-5xl">Your Profit</h1>

        <Reveal delay={0.2} className="mx-auto mt-8 max-w-sm px-1.5 sm:px-3">
          <GlassCard className="p-5 text-center">
            <p className="label-caps">Gross Rental Revenue</p>
            <p className="mt-2 text-3xl font-light tracking-tight tabular-nums sm:text-4xl">{formatRM(grossRevenue)}</p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.5} className="relative h-10">
          <div aria-hidden="true">
            <span className="absolute top-0 left-1/2 h-5 w-px bg-gold" />
            <span className="absolute top-5 right-1/4 left-1/4 h-px bg-gold" />
            <span className="absolute top-5 left-1/4 h-5 w-px bg-gold" />
            <span className="absolute top-5 right-1/4 h-5 w-px bg-gold" />
          </div>
        </Reveal>

        {/* Cells are padded rather than gapped, so the branches land on their centres. */}
        <div className="grid grid-cols-2">
          <Reveal delay={0.7} className="px-1.5 sm:px-3">
            <GlassCard className="h-full px-2 py-5 text-center">
              <p className="label-caps">Operator (20%)</p>
              <p className="mt-2 text-xl font-light tracking-tight tabular-nums sm:text-2xl">{formatRM(operatorShare)}</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.7} className="px-1.5 sm:px-3">
            <GlassCard className="h-full px-2 py-5 text-center">
              <p className="label-caps">Owner (80%)</p>
              <p className="mt-2 text-xl font-light tracking-tight tabular-nums sm:text-2xl">{formatRM(ownerShare)}</p>
            </GlassCard>
          </Reveal>

          <Reveal delay={1} className="col-span-2 sm:col-span-1 sm:col-start-2">
            <span aria-hidden="true" className="ml-[75%] block h-5 w-px bg-gold sm:ml-[50%]" />
            <div className="px-1.5 sm:px-3">
              <GlassCard className="p-5">
                <dl>
                  <div className="space-y-2.5">
                    <Deduction label="Utilities (15%)" value={formatRM(-utilities)} />
                    <Deduction label="Maintenance Fees" value={formatRM(-maintenanceFee)} />
                    <Deduction
                      label="Monthly Installment"
                      value={monthlyInstallment === null ? NOT_ENTERED : formatRM(-monthlyInstallment)}
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/25 pt-4">
                    <dt className="label-caps">Monthly Cashflow</dt>
                    <dd
                      className={`text-xl font-medium tabular-nums ${monthlyCashflow < 0 ? 'text-[#f6c1b2]' : 'text-gold-light'}`}
                    >
                      {monthlyCashflow === null ? '—' : formatRM(monthlyCashflow)}
                    </dd>
                  </div>
                </dl>
              </GlassCard>
            </div>
          </Reveal>
        </div>

        <Reveal delay={1.3} className="mt-6 px-1.5 sm:px-3">
          <GlassCard className="p-6 text-center">
            <h2 className="label-caps">Return on Investment (ROI)</h2>
            {annualRoi === null ? (
              <p className="mt-3 text-sm">Enter your Property Purchase Price on the previous page to see your ROI.</p>
            ) : (
              <>
                <p className="mt-3 text-sm font-medium tabular-nums">
                  <span className="inline-block">
                    ({formatRM(ownerShare)} − {formatRM(utilities)} − {formatRM(maintenanceFee)}) × 12
                  </span>{' '}
                  <span className="inline-block">÷ {formatRM(purchasePrice)} × 100%</span>
                </p>
                <p
                  className={`mt-3 text-4xl font-light tracking-tight tabular-nums ${annualRoi < 0 ? 'text-[#f6c1b2]' : 'text-gold-light'}`}
                >
                  = {formatPercent(annualRoi)}
                  <span className="ml-2 text-sm tracking-normal text-white/85">per year</span>
                </p>
              </>
            )}
          </GlassCard>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <GlassButton onClick={() => onNavigate('calculator')}>Back</GlassButton>
        </div>
      </div>
    </main>
  )
}
