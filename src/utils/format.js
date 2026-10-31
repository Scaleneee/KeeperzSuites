const numberFormat = new Intl.NumberFormat('en-MY', { maximumFractionDigits: 0 })

export const formatNumber = (value) => numberFormat.format(value)

const centsFormat = new Intl.NumberFormat('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatRM = (value) => {
  const amount = Math.abs(value)
  const digits = Number.isInteger(amount) ? formatNumber(amount) : centsFormat.format(amount)
  return `${value < 0 ? '− ' : ''}RM ${digits}`
}

export const formatPercent = (value) => `${centsFormat.format(value)}%`
