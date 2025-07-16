import { createEnergyLabel, type EnergyClass } from 'energy-label'

export default function EnergyLabelArrow({
  energyClass
}: {
  energyClass: EnergyClass
}) {
  const label = createEnergyLabel('arrow', {
    energyClass
  })

  const svgString = label.toString()

  return (
    <div
      class="w-8 [&_svg]:w-full [&_svg]:h-full"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}
