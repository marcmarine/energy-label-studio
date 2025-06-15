import { useEffect } from 'preact/hooks'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import Canvas from './Canvas'
import LeftPanel from './LeftPanel'
import PropertiesPanel from './PropertiesPanel'

export default function Layout() {
  const { setTemplate } = useEnergyLabelStore()

  useEffect(() => {
    setTemplate('smartphones')
  }, [])

  return (
    <div class="grid size-full h-screen overflow-hidden grid-cols-[auto_1fr_auto] p-[var(--app-layout-gap)] gap-[var(--app-layout-gap)] bg-checkered">
      <LeftPanel />
      <Canvas />
      <PropertiesPanel />
    </div>
  )
}
