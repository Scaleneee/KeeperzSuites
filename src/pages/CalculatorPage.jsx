import AnimatedNumber from '../components/AnimatedNumber.jsx'
import CurrencyInput from '../components/CurrencyInput.jsx'
import GlassButton from '../components/GlassButton.jsx'
import GlassCard from '../components/GlassCard.jsx'
import SliderInput from '../components/SliderInput.jsx'
import Tooltip from '../components/Tooltip.jsx'
import { useCalculator } from '../context/CalculatorContext.jsx'
import { formatRM } from '../utils/format.js'
import PhotoBackdrop from '../components/PhotoBackdrop.jsx'

const formatNightly = (value) => `${formatRM(value)} / night`
const formatDays = (value) => `${value} ${value === 1 ? 'day' : 'days'}`

export default function CalculatorPage({ onNavigate }) {
  const {
    monthlyInstallment,
    setMonthlyInstallment,
    purchasePrice,
    setPurchasePrice,
    nightlyRental,
    setNightlyRental,
    occupancyDays,
    setOccupancyDays,
    grossRevenue,
  } = useCalculator()

  return (
    <main className="relative flex min-h-dvh flex-col items-center px-4 py-10 sm:py-14">
      <PhotoBackdrop />

      <div className="relative flex w-full max-w-xl flex-col items-center">
        <h1 className="font-serif text-4xl font-medium tracking-wide sm:text-5xl">Your Investment</h1>

        <GlassCard className="mt-8 w-full space-y-9 p-6 sm:mt-10 sm:p-11">
          <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
            <CurrencyInput
              id="monthly-installment"
              label="Monthly Installment"
              value={monthlyInstallment}
              onChange={setMonthlyInstallment}
            />
            <CurrencyInput
              id="purchase-price"
              label="Property Purchase Price"
              value={purchasePrice}
              onChange={setPurchasePrice}
            />
          </div>

          <SliderInput
            id="nightly-rental"
            label="Nightly Rental"
            value={nightlyRental}
            min={150}
            max={600}
            step={10}
            onChange={setNightlyRental}
            formatValue={formatNightly}
            formatBound={formatRM}
          />
          <SliderInput
            id="occupancy-rate"
            label="Occupancy Rate"
            value={occupancyDays}
            min={1}
            max={30}
            step={1}
            onChange={setOccupancyDays}
            formatValue={formatDays}
            formatBound={formatDays}
          />

          <div className="border-t border-white/25 pt-8 text-center">
            <Tooltip content="Nightly Rental × Occupancy Rate">Gross Rental Revenue</Tooltip>
            <p className="mt-3 text-5xl font-light tracking-tight tabular-nums sm:text-6xl">
              <AnimatedNumber value={grossRevenue} format={formatRM} />
            </p>
          </div>
        </GlassCard>

        <div className="mt-8 flex flex-col-reverse items-center gap-4 sm:mt-10 sm:flex-row">
          <GlassButton onClick={() => onNavigate('landing')}>Back</GlassButton>
          <GlassButton onClick={() => onNavigate('profitSharing')}>Go to Profit Sharing</GlassButton>
        </div>
      </div>
    </main>
  )
}
