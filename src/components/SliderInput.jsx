export default function SliderInput({ id, label, value, min, max, step, onChange, formatValue, formatBound }) {
  const fill = (value - min) / (max - min)

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="label-caps">
          {label}
        </label>
        <span className="text-base font-medium tabular-nums">{formatValue(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="slider mt-3"
        style={{ '--fill': fill }}
        value={value}
        min={min}
        max={max}
        step={step}
        aria-valuetext={formatValue(value)}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="mt-1 flex justify-between text-xs text-white/75 tabular-nums">
        <span>{formatBound(min)}</span>
        <span>{formatBound(max)}</span>
      </div>
    </div>
  )
}
