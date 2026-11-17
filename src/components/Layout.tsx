import { PRODUCT_GROUPS } from 'energy-label'
import type { ComponentChildren } from 'preact'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'preact-iso'
import { parseSharedData, SHARE_PARAM } from '../lib/share'
import type { ProductName } from '../lib/types'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'
import LeftPanel from './LeftPanel'
import PropertiesPanel from './PropertiesPanel'
import SearchPanel from './SearchPanel'

export default function Layout({ children }: { children: ComponentChildren }) {
  const setTemplate = useEnergyLabelStore((state) => state.setTemplate)
  const replaceData = useEnergyLabelStore((state) => state.replaceData)
  const { path, query, route } = useLocation()

  useEffect(() => {
    const product = Object.keys(PRODUCT_GROUPS).find((key) =>
      path.includes(key)
    )
    // Read the current template without subscribing, so label edits don't
    // re-render the whole layout
    const template =
      (product as ProductName) || useEnergyLabelStore.getState().template

    const sharedValue = query[SHARE_PARAM]
    if (!sharedValue) {
      setTemplate(template)
      return
    }

    // A shared link replaces this template's data. The param is then dropped
    // so reloading doesn't overwrite later edits
    const sharedData = parseSharedData(template, sharedValue)
    if (sharedData) replaceData(template, sharedData)
    else setTemplate(template)

    const params = new URLSearchParams(window.location.search)
    params.delete(SHARE_PARAM)
    const search = params.toString()
    route(`${path}${search ? `?${search}` : ''}`, true)
  }, [path])

  return (
    <div class="grid size-full max-h-screen overflow-hidden grid-cols-[auto_1fr_auto] p-[var(--layout-gap)] gap-[var(--layout-gap)]">
      <LeftPanel />
      <div class="relative flex justify-center items-center overflow-hidden rounded-[var(--layout-border-radius)] h-[calc(100vh-(var(--layout-gap)*2))] border">
        {children}
      </div>
      <div class="relative">
        <SearchPanel />
        <PropertiesPanel />
      </div>
    </div>
  )
}
