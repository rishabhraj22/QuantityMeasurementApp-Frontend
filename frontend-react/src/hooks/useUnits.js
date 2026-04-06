import { useContext, useEffect } from 'react'
import { MeasurementContext } from '../context/MeasurementState'
import { fetchUnitsByType } from '../services/api'

function useUnits() {
  const { state, dispatch } = useContext(MeasurementContext)

  useEffect(() => {
    let isMounted = true

    const loadUnits = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      try {
        const data = await fetchUnitsByType(state.selectedType)

        if (isMounted) {
          dispatch({ type: 'SET_UNITS', payload: data })
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'SET_ERROR', payload: error.message })
        }
      } finally {
        if (isMounted) {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      }
    }

    loadUnits()

    return () => {
      isMounted = false
    }
  }, [state.selectedType, dispatch])

  return {
    units: state.units,
    isLoading: state.isLoading,
    error: state.error,
  }
}

export default useUnits