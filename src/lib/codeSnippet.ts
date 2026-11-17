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
  const object = `{\n${fields.join(',\n')}\n}`

  if (variant === 'TypeScript') {
    const options = fields.length ? `, ${object}` : ''

    return `import { createEnergyLabel } from 'energy-label'

const label = createEnergyLabel('${template}'${options})

const svg = label.toString()`
  }

  // The data lives in a constant so the alt text can read from it; `as const`
  // keeps literal types like 'B' assignable to the label's options
  const label = fields.length
    ? `const data = ${object} as const

const label = createEnergyLabel('${template}', data)`
    : `const label = createEnergyLabel('${template}')`
  const alt =
    values.energyClass != null && values.energyClass !== ''
      ? // biome-ignore lint/suspicious/noTemplateCurlyInString: it's the snippet's own template literal
        '{`Energy label, class ${data.energyClass}`}'
      : '"Energy label"'

  return `import { createEnergyLabel, toDataURL } from 'energy-label'

${label}

export function EnergyLabel() {
  return (
    <img
      src={toDataURL(label.toString())}
      alt=${alt}
    />
  )
}`
}
