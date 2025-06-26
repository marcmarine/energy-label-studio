import type { ComponentChildren } from 'preact'
import LeftPanel from './LeftPanel'
import PropertiesPanel from './PropertiesPanel'

export default function Layout({ children }: { children: ComponentChildren }) {
  return (
    <div class="grid size-full max-h-screen overflow-hidden grid-cols-[auto_1fr_auto] p-[var(--layout-gap)] gap-[var(--layout-gap)]">
      <LeftPanel />
      <div class="flex justify-center items-center overflow-hidden rounded-[var(--layout-border-radius)] h-[calc(100vh-(var(--layout-gap)*2))]">
        {children}
      </div>
      <PropertiesPanel />
    </div>
  )
}
