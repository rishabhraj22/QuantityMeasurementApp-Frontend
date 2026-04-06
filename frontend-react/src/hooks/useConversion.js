import { useContext, useState } from 'react'
import { MeasurementContext } from '../context/MeasurementState'
import {
  performConversion,
  performComparison,
  performArithmetic,
  formatResult,
} from '../utils/conversion'

function useConversion(saveHistory) {
  const { state, dispatch } = useContext(MeasurementContext)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculate = async () => {
    try {
      setIsCalculating(true)
      dispatch({ type: 'SET_ERROR', payload: null })

      const {
        selectedType,
        selectedAction,
        fromValue,
        toValue,
        fromUnit,
        toUnit,
        operator,
      } = state

      if (!fromValue || isNaN(fromValue) || Number(fromValue) <= 0) {
        dispatch({ type: 'SET_ERROR', payload: 'Enter a valid positive number' })
        return
      }

      if (!fromUnit || !toUnit) {
        dispatch({ type: 'SET_ERROR', payload: 'Please select both units' })
        return
      }

      let resultText = ''
      let expression = ''

      if (selectedAction === 'Conversion') {
        const result = performConversion(selectedType, fromValue, fromUnit, toUnit)
        resultText = formatResult(result, toUnit)
        expression = `${fromValue} ${fromUnit} → ${toUnit}`
      }

      if (selectedAction === 'Comparison') {
        resultText = performComparison(selectedType, fromValue, fromUnit, toUnit)
        expression = `${fromValue} ${fromUnit} compared with ${toUnit}`
      }

      if (selectedAction === 'Arithmetic') {
        if (!toValue || isNaN(toValue)) {
          dispatch({ type: 'SET_ERROR', payload: 'Enter second value for arithmetic' })
          return
        }

        const result = performArithmetic(
          selectedType,
          fromValue,
          toValue,
          fromUnit,
          toUnit,
          operator
        )

        resultText = formatResult(result, fromUnit)
        expression = `${fromValue} ${fromUnit} ${operator} ${toValue} ${toUnit}`
      }

      dispatch({ type: 'SET_RESULT', payload: resultText })

      if (saveHistory) {
        saveHistory({
          type: selectedType,
          action: selectedAction,
          expression,
          result: resultText,
          timestamp: new Date().toLocaleString(),
        })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      setIsCalculating(false)
    }
  }

  return { calculate, isCalculating }
}

export default useConversion