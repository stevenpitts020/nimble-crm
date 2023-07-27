import { useState } from 'react'
import { AxiosError } from 'axios'

const useErrorHandler = () => {
  const [, throwError] = useState()

  return (error: AxiosError, handler: () => void) => {
    if (error?.response?.status !== 401) {
      handler()
    } else {
      throwError(() => {
        throw error
      })
    }
  }
}

export default useErrorHandler
