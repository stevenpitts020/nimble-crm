import React, { Component } from 'react'
import * as Sentry from '@sentry/react'
import { log } from '../services'

interface IErrorBoundaryProps {
  onError: (message?: string) => void
}

interface ErrorState {
  hasError: boolean
}

/**
 * A ErrorBoundary class to catch errors and handle them. Now is only catching 401 errors.
 */
class ErrorBoundary extends Component<IErrorBoundaryProps, ErrorState> {
  public static getDerivedStateFromError(error: any) {
    log.info('error?', error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch(error: any, errorInfo: any) {
    // we can use Sentry, Honeybadger or other tooling to log errors
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      Sentry.captureException(error)
    })
  }

  public componentDidUpdate(
    prevProps: IErrorBoundaryProps,
    prevState: ErrorState
  ) {
    if (prevState.hasError !== this.state.hasError && this.state.hasError) {
      // Call function passed on the prop onError and pass a message
      this.props.onError('Your session has expired!')
    }
  }

  public render() {
    return <>{this.props.children}</>
  }
}

export default ErrorBoundary
