const numberFormat = new Intl.NumberFormat('en-MY', { maximumFractionDigits: 0 })

export const formatNumber = (value) => numberFormat.format(value)

export const formatRM = (value) => `RM ${formatNumber(value)}`
