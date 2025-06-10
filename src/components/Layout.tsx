import Canvas from './Canvas'
import LeftPanel from './LeftPanel'
import PropertiesPanel from './PropertiesPanel'

export default function Layout() {
  return (
    <div class="grid size-full grid-cols-[auto_1fr_auto]">
      <LeftPanel />
      <Canvas />
      <PropertiesPanel />
    </div>
  )
}
