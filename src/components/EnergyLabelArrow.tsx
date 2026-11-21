import { type EnergyClass, renderClassArrow } from 'energy-label'
import type { ArrowOrientation } from '../lib/useSettingsStore'
import { cx } from '../lib/utils'

export default function EnergyLabelArrow({
  energyClass,
  labelOrientation = 'RIGHT',
  className = 'w-8'
}: {
  energyClass: EnergyClass
  labelOrientation?: ArrowOrientation
  className?: string
}) {
  const svgString = renderClassArrow(energyClass, { labelOrientation })

  return (
    <div
      class={cx('[&_svg]:w-full [&_svg]:h-full', className)}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}
