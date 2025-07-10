import { appendTo, createEnergyLabel } from 'energy-label'
import { useEffect, useRef } from 'preact/hooks'

export default function EnergyLabelArrow({
  energyClass,
  orientation = 'LEFT'
}: {
  energyClass: string
  orientation?: 'LEFT' | 'RIGHT'
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      if (!containerRef.current) return
      containerRef.current.innerHTML = ''

      try {
        const label = createEnergyLabel('arrow', {
          energyClass,
          labelOrientation: orientation
        })

        const svgString = await label.toString()
        appendTo(containerRef.current, svgString)
      } catch (error) {
        console.error('Error generando energy label:', error)
      }
    })()
  }, [energyClass])

  return <div ref={containerRef} class="w-8 [&_svg]:w-full [&_svg]:h-full" />
}
