import { createContext, useContext, useMemo, useState } from 'react'

const CalculatorContext = createContext(null)

export function CalculatorProvider({ children }) {
  const [monthlyInstallment, setMonthlyInstallment] = useState(null)
  const [purchasePrice, setPurchasePrice] = useState(null)
  const [nightlyRental, setNightlyRental] = useState(300)
  const [occupancyDays, setOccupancyDays] = useState(20)

  const value = useMemo(
    () => ({
      monthlyInstallment,
      setMonthlyInstallment,
      purchasePrice,
      setPurchasePrice,
      nightlyRental,
      setNightlyRental,
      occupancyDays,
      setOccupancyDays,
      grossRevenue: nightlyRental * occupancyDays,
    }),
    [monthlyInstallment, purchasePrice, nightlyRental, occupancyDays],
  )

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>
}

export function useCalculator() {
  return useContext(CalculatorContext)
}
