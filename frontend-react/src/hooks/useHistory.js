import { useState } from 'react'

function useHistory() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const currentUser = localStorage.getItem('currentUser')

  const historyKey = currentUser
    ? `measurementHistory_${currentUser}`
    : null

  const [history, setHistory] = useState(() => {
    if (!isLoggedIn || !historyKey) return []
    return JSON.parse(localStorage.getItem(historyKey)) || []
  })

  const saveHistory = (record) => {
    if (!isLoggedIn || !historyKey) return

    const updatedHistory = [record, ...history]
    setHistory(updatedHistory)
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory))
  }

  const refresh = () => {
    if (!isLoggedIn || !historyKey) {
      setHistory([])
      return
    }

    const savedHistory =
      JSON.parse(localStorage.getItem(historyKey)) || []
    setHistory(savedHistory)
  }

  const clearVisibleHistory = () => {
    setHistory([])
  }

  const clearStoredHistory = () => {
    if (!historyKey) return
    setHistory([])
    localStorage.removeItem(historyKey)
  }

  return {
    history,
    saveHistory,
    refresh,
    clearVisibleHistory,
    clearStoredHistory,
  }
}

export default useHistory