import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { MeasurementProvider } from './context/MeasurementContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MeasurementProvider>
      <App />
    </MeasurementProvider>
  </React.StrictMode>,
)