import { useReducer } from 'react'
import { MeasurementContext } from './MeasurementState'

const initialState = {
  selectedType: 'Length',
  selectedAction: 'Conversion',
  units: [],
  fromUnit: '',
  toUnit: '',
  fromValue: '',
  toValue: '',
  operator: '+',
  result: null,
  isLoading: false,
  error: null,
  history: [],
}

function measurementReducer(state, action) {
  switch (action.type) {
    case 'SET_TYPE':
      return {
        ...state,
        selectedType: action.payload,
        units: [],
        fromUnit: '',
        toUnit: '',
        fromValue: '',
        toValue: '',
        result: null,
        error: null,
      }

    case 'SET_ACTION':
      return {
        ...state,
        selectedAction: action.payload,
        result: null,
      }

    case 'SET_UNITS':
      return {
        ...state,
        units: action.payload,
        fromUnit: action.payload[0]?.symbol || '',
        toUnit: action.payload[1]?.symbol || action.payload[0]?.symbol || '',
      }

    case 'SET_FROM_UNIT':
      return { ...state, fromUnit: action.payload }

    case 'SET_TO_UNIT':
      return { ...state, toUnit: action.payload }

    case 'SET_FROM_VALUE':
      return { ...state, fromValue: action.payload }

    case 'SET_TO_VALUE':
      return { ...state, toValue: action.payload }

    case 'SET_OPERATOR':
      return { ...state, operator: action.payload }

    case 'SET_RESULT':
      return { ...state, result: action.payload }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'ADD_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history],
      }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      }

    case 'RESET':
      return {
        ...state,
        fromValue: '',
        toValue: '',
        fromUnit: '',
        toUnit: '',
        operator: '+',
        result: null,
        error: null,
      }

    default:
      return state
  }
}

export function MeasurementProvider({ children }) {
  const [state, dispatch] = useReducer(measurementReducer, initialState)

  return (
    <MeasurementContext.Provider value={{ state, dispatch }}>
      {children}
    </MeasurementContext.Provider>
  )
}