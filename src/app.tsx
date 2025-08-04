import { LocationProvider, lazy, Route, Router } from 'preact-iso'
import Layout from './components/Layout'
import Main from './components/Main'

export function App() {
  const Settings = lazy(() => import('./components/Settings'))

  return (
    <LocationProvider>
      <Layout>
        <Router>
          <Route path="/settings" component={Settings} />
          <Route path="/:id*" component={Main} />
        </Router>
      </Layout>
    </LocationProvider>
  )
}
