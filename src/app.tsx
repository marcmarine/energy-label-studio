import { LocationProvider, lazy, Route, Router } from 'preact-iso'
import Canvas from './components/Canvas'
import Layout from './components/Layout'

export function App() {
  const Settings = lazy(() => import('./components/Settings'))

  return (
    <LocationProvider>
      <Layout>
        <Router>
          <Route path="/settings" component={Settings} />
          <Route path="/:id*" component={Canvas} />
        </Router>
      </Layout>
    </LocationProvider>
  )
}
