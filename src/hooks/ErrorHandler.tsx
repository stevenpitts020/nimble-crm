import React from 'react'

const useErrorHandler = (initialState: string | null) => {
  const [error, setError] = React.useState(initialState)

  const showError = (errorMessage: string | null) => {
    setError(errorMessage)
    window.setTimeout(() => {
      setError(null)
    }, 10000)
  }
  return { error, showError }
}
export default useErrorHandler
