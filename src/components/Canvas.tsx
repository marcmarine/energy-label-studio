import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'

export default function Canvas() {
  const { renderTo } = useEnergyLabelStore()

  return <div ref={element => element && renderTo(element)} class="flex justify-center items-center overflow-hidden rounded-[var(--app-layout-border-radius)]" />
}
