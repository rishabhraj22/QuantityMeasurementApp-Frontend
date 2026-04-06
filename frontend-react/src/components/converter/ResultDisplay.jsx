import { useContext, useEffect, useRef, useState } from 'react'
import { MeasurementContext } from '../../context/MeasurementState'

function ResultDisplay() {
  const { state } = useContext(MeasurementContext)
  const previousResult = useRef(null)
  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    if (state.result && previousResult.current !== state.result) {
      previousResult.current = state.result

      const timer1 = setTimeout(() => {
        setHighlight(true)
      }, 0)

      const timer2 = setTimeout(() => {
        setHighlight(false)
      }, 1200)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [state.result])

  return (
    <div className={`result-box ${highlight ? 'highlight' : ''}`}>
      <h3>Result</h3>
      <p>{state.result || '—'}</p>
    </div>
  )
}

export default ResultDisplay