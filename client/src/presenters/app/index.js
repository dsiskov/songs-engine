import React from 'react'
import Router from 'presenters/app/Router'
import { BrowserRouter, Switch } from 'react-router-dom'
import routes from 'configuration/routes'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Router routes={routes} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
