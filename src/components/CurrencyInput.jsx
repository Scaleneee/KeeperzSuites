import { useState } from 'react'
import { formatNumber } from '../utils/format.js'

const MAX_DIGITS = 12

export default function CurrencyInput({ id, label, value, onChange }) {
  const [focused, setFocused] = useState(false)

  const handleChange = (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, MAX_DIGITS)
    onChange(digits === '' ? null : Number(digits))
  }

  let displayValue = ''
  if (value !== null) displayValue = focused ? String(value) : formatNumber(value)

  return (
    <div>
      <label htmlFor={id} className="label-caps block">
        {label}
      </label>
      <div className="mt-3 flex items-baseline gap-2 border-b border-white/40 pb-2 transition-colors duration-500 ease-out focus-within:border-gold-light">
        <span className="text-base text-white/80">RM</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="w-full min-w-0 bg-transparent text-lg font-medium tabular-nums outline-none"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  )
}
