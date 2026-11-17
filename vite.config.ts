import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
// Relative path because the package exports don't expose package.json
import energyLabelPackage from './node_modules/energy-label/package.json' with {
  type: 'json'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  define: {
    __ENERGY_LABEL_VERSION__: JSON.stringify(energyLabelPackage.version)
  }
})
