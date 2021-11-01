import Router from 'presenters/Router'
import { BrowserRouter, Switch } from 'react-router-dom'
import routes from 'configuration/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router routes={routes} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
