import { appendTo } from 'energy-label'
import { useEffect, useRef } from 'preact/hooks'
import { useEnergyLabelStore } from '../lib/useEnergyLabelStore'

export default function Canvas() {
  const svg = useEnergyLabelStore((state) => state.svg)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && svg) appendTo(ref.current, svg)
  }, [svg])

  return <div ref={ref} class="canvas bg-checkered size-full" />
}
