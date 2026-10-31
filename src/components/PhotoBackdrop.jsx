import blurredBackground from '../assets/blurred_background.jpg'

export default function PhotoBackdrop() {
  return (
    <div className="fixed inset-0">
      <img src={blurredBackground} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#2a1d14]/45" />
    </div>
  )
}
