import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'

export default function Canvas() {
  const { renderTo } = useEnergyLabelStore()

  return <div ref={element => element && renderTo(element)} class="canvas bg-checkered size-full" />
}
