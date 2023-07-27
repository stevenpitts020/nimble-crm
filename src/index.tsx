import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { worker } from './utils/msw/browser'
import './theme/index.sass'

import App from './containers/App'
import { config, log } from './services/'
// other integrations
import TagManager from 'react-gtm-module'
import { Integrations } from '@sentry/tracing'
import { init } from '@sentry/browser'
import Repo from './services/Repo'

const {
  sentryDSN,
  releaseVersion,
  gtmID,
  gtmAuth,
  gtmPreview,
  env,
  context,
  mockAPI,
} = config

if (mockAPI) {
  worker.start()
}
if (!gtmID) {
  log.error(
    'Environment variables for the Google Tag Manager tag are not set, GTM won`t be loaded',
    'index.tsx'
  )
} else {
  if (!gtmAuth && !gtmPreview) {
    TagManager.initialize({
      gtmId: gtmID,
    })
    log.info('GTM initializing with ID ', 'index.tsx')
  } else {
    TagManager.initialize({
      gtmId: gtmID,
      auth: gtmAuth,
      preview: gtmPreview,
    })
    log.info('GTM initializing with ID, auth and preview ', 'index.tsx')
  }
}

if (!sentryDSN) {
  log.error('Environment variables missing for Error reporting', 'index.tsx')
} else {
  init({
    environment: context,
    dsn: sentryDSN,
    release: releaseVersion,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.2,
  })
  log.info({ sentryDSN, releaseVersion, context }, 'init sentry')
}

// Setup Debug
if (env !== 'production') {
  Repo.setItem('debug', 'nimble:*')
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
