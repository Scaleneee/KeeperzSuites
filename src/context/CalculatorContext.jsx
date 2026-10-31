import { createContext, useContext, useMemo, useState } from 'react'

const CalculatorContext = createContext(null)

const OPERATOR_PERCENT = 20
const OWNER_PERCENT = 80
const UTILITY_PERCENT = 15
const MAINTENANCE_FEE = 455

export function CalculatorProvider({ children }) {
  const [monthlyInstallment, setMonthlyInstallment] = useState(null)
  const [purchasePrice, setPurchasePrice] = useState(null)
  const [nightlyRental, setNightlyRental] = useState(300)
  const [occupancyDays, setOccupancyDays] = useState(20)

  const value = useMemo(() => {
    const grossRevenue = nightlyRental * occupancyDays
    const ownerShare = (grossRevenue * OWNER_PERCENT) / 100
    const utilities = (grossRevenue * UTILITY_PERCENT) / 100
    const incomeAfterUtilities = ownerShare - utilities
    // Left null until the inputs exist, so a blank field never reads as RM 0.
    const monthlyCashflow =
      monthlyInstallment === null ? null : incomeAfterUtilities - MAINTENANCE_FEE - monthlyInstallment
    const annualRoi = purchasePrice ? ((incomeAfterUtilities * 12) / purchasePrice) * 100 : null

    return {
      monthlyInstallment,
      setMonthlyInstallment,
      purchasePrice,
      setPurchasePrice,
      nightlyRental,
      setNightlyRental,
      occupancyDays,
      setOccupancyDays,
      grossRevenue,
      operatorShare: (grossRevenue * OPERATOR_PERCENT) / 100,
      ownerShare,
      utilities,
      maintenanceFee: MAINTENANCE_FEE,
      monthlyCashflow,
      annualRoi,
    }
  }, [monthlyInstallment, purchasePrice, nightlyRental, occupancyDays])

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>
}

export function useCalculator() {
  return useContext(CalculatorContext)
}
