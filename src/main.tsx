import '@fontsource-variable/geist'
import '@fontsource-variable/plus-jakarta-sans'
import { render } from 'preact'
import { App } from './app'
import './index.css'
import { initializeSettings } from './lib/utils'

initializeSettings()

render(<App />, document.getElementById('app') as HTMLElement)
