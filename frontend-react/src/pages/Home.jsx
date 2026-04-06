import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MeasurementContext } from '../context/MeasurementState'
import useUnits from '../hooks/useUnits'
import useConversion from '../hooks/useConversion'
import useHistory from '../hooks/useHistory'
import ResultDisplay from '../components/converter/ResultDisplay'
import HistoryList from '../components/history/HistoryList'
import '../styles/Home.css'

function Home() {
  const { state, dispatch } = useContext(MeasurementContext)
  const navigate = useNavigate()

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const currentUserEmail = localStorage.getItem('currentUser')
  const users = JSON.parse(localStorage.getItem('users')) || []
  const currentUser = users.find((user) => user.email === currentUserEmail)

  const {
    history,
    saveHistory,
    clearVisibleHistory,
    clearStoredHistory,
  } = useHistory()

  const { calculate, isCalculating } = useConversion(
    isLoggedIn ? saveHistory : null
  )
  const { isLoading, error } = useUnits()

  const measurementTypes = ['Length', 'Weight', 'Temperature', 'Volume']
  const actionTypes = ['Comparison', 'Conversion', 'Arithmetic']
  const operators = ['+', '-', '*', '/']

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    clearVisibleHistory()
    navigate('/')
    window.location.reload()
  }

  const handleLoginSignup = () => {
    navigate('/login')
  }

  const handleClearHistory = () => {
    const confirmClear = window.confirm(
      'Are you sure you want to clear your history?'
    )

    if (confirmClear) {
      clearStoredHistory()
    }
  }

  const isFormIncomplete =
    !state.fromValue ||
    !state.fromUnit ||
    !state.toUnit ||
    (state.selectedAction === 'Arithmetic' && !state.toValue)

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        {isLoggedIn && currentUser ? (
          <>
            <div>Welcome, {currentUser.fullName}</div>
            <small className="header-email">{currentUser.email}</small>
          </>
        ) : (
          'Welcome To Quantity Measurement'
        )}
      </div>

      <div className="card">
        {/* STATUS BANNER */}
        <div className={`status-banner ${isLoggedIn ? 'logged-in' : 'guest-mode'}`}>
          {isLoggedIn
            ? 'Logged In: Your calculation history is being saved'
            : 'Guest Mode: Login to save your calculation history'}
        </div>

        {/* TOP ACTIONS */}
        <div className="top-actions">
          {isLoggedIn ? (
            <>
              <button className="clear-history-btn" onClick={handleClearHistory}>
                Clear History
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={handleLoginSignup}>
              Login / Signup
            </button>
          )}
        </div>

        {/* TYPE SELECTION */}
        <div className="section">
          <p className="label">CHOOSE TYPE</p>
          <div className="type-grid">
            {measurementTypes.map((type) => (
              <div
                key={type}
                className={`type-card ${
                  state.selectedType === type
                    ? `active ${type.toLowerCase()}-active`
                    : ''
                }`}
                onClick={() => dispatch({ type: 'SET_TYPE', payload: type })}
              >
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION SELECTION */}
        <div className="section">
          <p className="label">CHOOSE ACTION</p>
          <div className="action-tabs">
            {actionTypes.map((action) => (
              <button
                key={action}
                className={state.selectedAction === action ? 'active' : ''}
                onClick={() => dispatch({ type: 'SET_ACTION', payload: action })}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING / ERROR */}
        {isLoading && <p className="loading">Loading units...</p>}
        {error && <p className="error">{error}</p>}

        {/* INPUT SECTION */}
        <div className="input-section">
          {/* FROM / VALUE 1 */}
          <div className="input-card">
            <label>
              {state.selectedAction === 'Arithmetic' ? 'VALUE 1' : 'FROM'}
            </label>
            <input
              type="number"
              placeholder="Enter value"
              value={state.fromValue}
              onChange={(e) =>
                dispatch({ type: 'SET_FROM_VALUE', payload: e.target.value })
              }
            />
            <select
              value={state.fromUnit}
              onChange={(e) =>
                dispatch({ type: 'SET_FROM_UNIT', payload: e.target.value })
              }
            >
              <option value="">Select Unit</option>
              {state.units.map((unit) => (
                <option key={unit.id} value={unit.symbol}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* OPERATOR for Arithmetic */}
          {state.selectedAction === 'Arithmetic' && (
            <div className="operator-box">
              <select
                value={state.operator}
                onChange={(e) =>
                  dispatch({ type: 'SET_OPERATOR', payload: e.target.value })
                }
              >
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* TO / VALUE 2 */}
          <div className="input-card">
            <label>
              {state.selectedAction === 'Arithmetic' ? 'VALUE 2' : 'TO'}
            </label>

            {state.selectedAction === 'Arithmetic' ? (
              <input
                type="number"
                placeholder="Enter second value"
                value={state.toValue}
                onChange={(e) =>
                  dispatch({ type: 'SET_TO_VALUE', payload: e.target.value })
                }
              />
            ) : (
              <input
                type="number"
                placeholder="Result will appear"
                value={state.result || ''}
                readOnly
              />
            )}

            <select
              value={state.toUnit}
              onChange={(e) =>
                dispatch({ type: 'SET_TO_UNIT', payload: e.target.value })
              }
            >
              <option value="">Select Unit</option>
              {state.units.map((unit) => (
                <option key={unit.id} value={unit.symbol}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="btn-group">
          <button
            className="calculate"
            onClick={calculate}
            disabled={isFormIncomplete || isCalculating}
          >
            {isCalculating ? 'Calculating...' : 'Calculate'}
          </button>

          <button
            className="reset"
            onClick={() => dispatch({ type: 'RESET' })}
          >
            Reset
          </button>
        </div>

        {/* RESULT */}
        <ResultDisplay />

        {/* HISTORY - ONLY FOR LOGGED IN USERS */}
        {isLoggedIn && <HistoryList history={history} />}
      </div>
    </div>
  )
}

export default Home