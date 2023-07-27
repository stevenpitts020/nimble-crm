import React from 'react'
import { Layout } from 'antd'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

/* Context API */
import AuthProvider from '../store/AuthProvider'
import { authService, config } from '../services'

import MainContainer from './MainContainer'

const queryCache = new QueryCache()

const App: React.FC = (props: any) => {
  const existingToken = authService.getAccessToken()
  const { env } = config

  return (
    <Layout data-testid="main-app" style={{ minHeight: '100vh' }}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        {env === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        <AuthProvider existingToken={existingToken}>
          <Router>
            <MainContainer />
          </Router>
        </AuthProvider>
      </ReactQueryCacheProvider>
    </Layout>
  )
}

export default App
