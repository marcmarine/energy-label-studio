import Layout from './components/Layout'
import { lazy, LocationProvider, Router, Route } from 'preact-iso'
import Canvas from './components/Canvas'

export function App() {
  const Settings = lazy(() => import('./components/Settings'))

  return (
    <LocationProvider>
      <Layout>
        <Router>
          <Route path="/" component={Canvas} />
          <Route path="/settings" component={Settings} />
          <Route path="/:id" component={Canvas} />
        </Router>
      </Layout>
    </LocationProvider>
  )
}
