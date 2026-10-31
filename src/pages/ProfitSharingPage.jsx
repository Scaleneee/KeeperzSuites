import GlassButton from '../components/GlassButton.jsx'
import GlassCard from '../components/GlassCard.jsx'
import PhotoBackdrop from '../components/PhotoBackdrop.jsx'

export default function ProfitSharingPage({ onNavigate }) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <PhotoBackdrop />

      <GlassCard className="relative w-full max-w-md p-8 text-center sm:p-12">
        <h1 className="font-serif text-4xl font-medium tracking-wide">Profit Sharing</h1>
        <p className="label-caps mt-4">Coming soon</p>
        <GlassButton className="mt-10" onClick={() => onNavigate('calculator')}>
          Back
        </GlassButton>
      </GlassCard>
    </main>
  )
}
