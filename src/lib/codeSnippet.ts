import type { TemplatesData } from 'energy-label'
import { REGULATIONS } from './constants'
import type { ProductName } from './types'

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

export const INSTALL_COMMANDS: { label: PackageManager; command: string }[] = [
  { label: 'npm', command: 'npm i energy-label' },
  { label: 'pnpm', command: 'pnpm add energy-label' },
  { label: 'yarn', command: 'yarn add energy-label' },
  { label: 'bun', command: 'bun add energy-label' }
]

export type CodeVariant = 'React' | 'TypeScript'

export const CODE_VARIANTS: { label: CodeVariant; language: string }[] = [
  { label: 'React', language: 'tsx' },
  { label: 'TypeScript', language: 'typescript' }
]

function formatValue(value: unknown) {
  return typeof value === 'string'
    ? `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
    : String(value)
}

// Code that reproduces the current label with the energy-label library
export function getLabelSnippet(
  variant: CodeVariant,
  template: ProductName,
  data: Partial<TemplatesData[ProductName]>
) {
  const values = data as Record<string, unknown>
  // Same order as the form; the flag only when it differs from the default
  const keys = [
    ...REGULATIONS[template].inputs.map(({ key }) => key),
    ...(values.flagOrigin === 'UK' ? ['flagOrigin'] : [])
  ]
  const fields = keys
    .filter((key) => values[key] != null && values[key] !== '')
    .map((key) => `  ${key}: ${formatValue(values[key])}`)
  const options = fields.length ? `, {\n${fields.join(',\n')}\n}` : ''
  const label = `const label = createEnergyLabel('${template}'${options})`

  if (variant === 'TypeScript') {
    return `import { createEnergyLabel } from 'energy-label'

${label}

const svg = label.toString()`
  }

  const energyClass = values.energyClass
  const alt = `Energy label${energyClass ? `, class ${energyClass}` : ''}`

  return `import { createEnergyLabel, toDataURL } from 'energy-label'

${label}

export function EnergyLabel() {
  return (
    <img
      src={toDataURL(label.toString())}
      alt="${alt}"
    />
  )
}`
}
