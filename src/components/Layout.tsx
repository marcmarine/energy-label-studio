import { PRODUCT_GROUPS, type TemplateName } from 'energy-label'
import type { ComponentChildren } from 'preact'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import LeftPanel from './LeftPanel'
import PropertiesPanel from './PropertiesPanel'

export default function Layout({ children }: { children: ComponentChildren }) {
  const { template, setTemplate } = useEnergyLabelStore()
  const { path } = useLocation()

  useEffect(() => {
    const product = Object.keys(PRODUCT_GROUPS).find((key) =>
      path.includes(key)
    )

    setTemplate((product as TemplateName) || template)
  }, [path])

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
